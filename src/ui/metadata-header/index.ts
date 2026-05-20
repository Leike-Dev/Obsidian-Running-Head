import { MarkdownView, TFile } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { CustomField } from "../../settings";
import { calculateReadingTime } from "../../utils/reading-time";
import { formatDate } from "../../utils/date-formatter";
import { t } from "../../lang/helpers";
import { HEADER_CLASS, BREADCRUMB_CLASS, MetadataHeaderOptions } from "./types";
import { createBreadcrumbEl } from "./breadcrumb";
import { createMetadataHeaderEl, removeExistingHeader } from "./dom-builder";

/**
 * Inject (or refresh) the metadata header into the active markdown view.
 *
 * This function is idempotent — it removes the previous header before
 * creating a new one.
 *
 * @param plugin - Reference to the plugin instance (for settings + app access).
 */
export async function injectMetadataHeader(plugin: RunningHeadPlugin): Promise<void> {
	const view = plugin.app.workspace.getActiveViewOfType(MarkdownView);
	if (!view) {
		return;
	}

	const file = view.file;
	if (!file || !(file instanceof TFile)) {
		return;
	}

	const contentEl = view.contentEl;
	// Do NOT remove the existing header yet! Wait until after all async operations
	// to prevent layout shifts and CodeMirror measurement bugs.

	// --- Read frontmatter ---
	const cache = plugin.app.metadataCache.getFileCache(file);
	const frontmatter = cache?.frontmatter;
	const settings = plugin.settings;

	const rawDate = frontmatter?.[settings.dateField] as unknown;
	const rawUpdated = frontmatter?.[settings.lastUpdatedField] as unknown;

	const formattedDate = formatDate(rawDate, settings.dateLocale, settings.useShortDate, settings.customDateFormat);
	const formattedLastUpdated = formatDate(rawUpdated, settings.dateLocale, settings.useShortDate, settings.customDateFormat);

	// If there's nothing to show, bail out
	// Apply folder-exclusion filtering: fields with an excludedFolder are hidden
	// when the note is inside that folder (case-sensitive).
	const notePath = file.path;
	const isInScope = (cf: CustomField): boolean => {
		if (!cf.excludedFolder) return true;

		const excludedList = cf.excludedFolder.split(",").map(f => f.trim()).filter(f => f.length > 0);
		for (const folder of excludedList) {
			const excluded = folder.endsWith("/") ? folder : folder + "/";
			if (notePath.startsWith(excluded)) {
				return false;
			}
		}
		return true;
	};

	const hasCustomFields = settings.customFields.some((cf) => isInScope(cf));
	if (!formattedDate && !formattedLastUpdated && !hasCustomFields && !settings.showBreadcrumb) {
		return;
	}

	// --- Calculate reading time ---
	let readingTime: number | null = null;
	if (settings.showReadingTime) {
		const content = await plugin.app.vault.cachedRead(file);
		// Check if the DOM is still valid after the async read (user might have switched notes)
		if (!contentEl.isConnected) {
			return;
		}
		readingTime = calculateReadingTime(content, settings.wordsPerMinute);
	}

	// --- Find the inline title ---
	const inlineTitle = contentEl.querySelector<HTMLElement>(".inline-title");
	if (!inlineTitle) {
		// Fallback: single wrapper prepended to the content area
		const previewView = contentEl.querySelector(".markdown-preview-view") ??
			contentEl.querySelector(".markdown-source-view") ??
			contentEl;

		const tempFallback = activeDocument.createElement("div");
		const fallbackEl = createMetadataHeaderEl(tempFallback, {
			formattedDate,
			readingTime,
			formattedLastUpdated,
			showReadingTime: settings.showReadingTime,
			showLastUpdated: settings.showLastUpdated,
			badgeFontSize: settings.badgeFontSize,
			customFields: settings.customFields,
			frontmatter,
			app: plugin.app,
			sourcePath: file.path,
			dateLocale: settings.dateLocale,
			badgeColor: settings.lastUpdatedBadgeColor,
		});
		removeExistingHeader(contentEl);
		previewView.prepend(fallbackEl);
		return;
	}

	// Apply configurable font sizes via CSS variables
	contentEl.style.setProperty('--running-head-title-size', `${settings.titleFontSize}em`);
	contentEl.style.setProperty('--running-head-badge-size', `${settings.badgeFontSize}rem`);

	// --- Date/badge options (always below the title) ---
	const dateOptions: MetadataHeaderOptions = {
		formattedDate,
		readingTime,
		formattedLastUpdated,
		showReadingTime: settings.showReadingTime,
		showLastUpdated: settings.showLastUpdated && settings.layoutStyle === "blog",
		badgeFontSize: settings.badgeFontSize,
		customFields: [],
		frontmatter,
		app: plugin.app,
		sourcePath: file.path,
		dateLocale: settings.dateLocale,
		badgeColor: settings.lastUpdatedBadgeColor,
	};

	// Split custom fields by their individual position, applying folder-scope filter
	const aboveFields = settings.customFields.filter((cf) => cf.position === "above" && isInScope(cf));
	const belowFields = settings.customFields.filter((cf) => cf.position === "below" && isInScope(cf));

	// --- Build "above" wrapper (custom fields only) ---
	const aboveOptions: MetadataHeaderOptions = {
		formattedDate: null,
		readingTime: null,
		formattedLastUpdated: null,
		showReadingTime: false,
		showLastUpdated: false,
		badgeFontSize: settings.badgeFontSize,
		customFields: aboveFields,
		frontmatter,
		app: plugin.app,
		sourcePath: file.path,
		dateLocale: settings.dateLocale,
		badgeColor: settings.lastUpdatedBadgeColor,
	};

	// --- Build "below" wrapper (custom fields only) ---
	const belowOptions: MetadataHeaderOptions = {
		formattedDate: null,
		readingTime: null,
		formattedLastUpdated: null,
		showReadingTime: false,
		showLastUpdated: false,
		badgeFontSize: settings.badgeFontSize,
		customFields: belowFields,
		frontmatter,
		app: plugin.app,
		sourcePath: file.path,
		dateLocale: settings.dateLocale,
		badgeColor: settings.lastUpdatedBadgeColor,
	};

	// Check if each section has any content to render
	const willShowDateBelow = formattedDate || (formattedLastUpdated && settings.showLastUpdated && settings.layoutStyle === "blog");
	const hasDateContent = willShowDateBelow;
	const hasAboveContent = aboveFields.length > 0;
	const hasBelowContent = belowFields.length > 0;

	// Synchronous atomic replacement: remove old headers and breadcrumbs,
	// then insert new ones in the exact same frame.
	removeExistingHeader(contentEl);
	contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => el.remove());
	contentEl.querySelectorAll(".running-head-top-row").forEach((el) => el.remove());

	// 1. Top Row (Wiki Style) or Breadcrumb (Blog Style) — DIRECTLY above the title
	const isWikiStyle = settings.layoutStyle === "wiki";
	const showWikiBadge = isWikiStyle && settings.showLastUpdated && formattedLastUpdated;
	const showBreadcrumb = settings.showBreadcrumb;

	let topRowAnchor: Element | null = null;

	if (isWikiStyle && (showBreadcrumb || showWikiBadge)) {
		const topRow = activeDocument.createElement("div");
		topRow.classList.add("running-head-top-row");

		if (showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
			if (breadcrumbEl) topRow.appendChild(breadcrumbEl);
		}

		if (showWikiBadge) {
			const badge = activeDocument.createElement("div");
			badge.classList.add("running-head-metadata-badge");
			badge.textContent = `${t('last_updated', settings.dateLocale)}: ${formattedLastUpdated}`;
			topRow.appendChild(badge);
		}

		if (topRow.hasChildNodes()) {
			inlineTitle.insertAdjacentElement("beforebegin", topRow);
			topRowAnchor = topRow;
		}
	} else if (showBreadcrumb) {
		const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
		if (breadcrumbEl) {
			inlineTitle.insertAdjacentElement("beforebegin", breadcrumbEl);
			topRowAnchor = breadcrumbEl;
		}
	}

	// 2. Custom fields "above" — ABOVE the breadcrumb/top-row (or the title)
	if (hasAboveContent) {
		const tempAbove = activeDocument.createElement("div");
		const aboveEl = createMetadataHeaderEl(tempAbove, aboveOptions);
		const aboveAnchor = topRowAnchor ?? inlineTitle;
		aboveAnchor.insertAdjacentElement("beforebegin", aboveEl);
	}

	// 3. Date/badge — DIRECTLY below the title (always)
	if (hasDateContent) {
		const tempDate = activeDocument.createElement("div");
		const dateEl = createMetadataHeaderEl(tempDate, dateOptions);
		inlineTitle.insertAdjacentElement("afterend", dateEl);
	}

	// 4. Custom fields "below" — BELOW the date/badge (or the title)
	if (hasBelowContent) {
		const tempBelow = activeDocument.createElement("div");
		const belowEl = createMetadataHeaderEl(tempBelow, belowOptions);
		// Find the date wrapper (if it exists) to insert below it
		const dateWrapper = inlineTitle.nextElementSibling;
		const belowAnchor = (dateWrapper && dateWrapper.classList.contains(HEADER_CLASS))
			? dateWrapper
			: inlineTitle;
		belowAnchor.insertAdjacentElement("afterend", belowEl);
	}
}

/**
 * Remove all metadata headers and breadcrumbs from every open markdown view.
 * Used during plugin unload for clean teardown.
 */
export function removeAllMetadataHeaders(plugin: RunningHeadPlugin): void {
	plugin.app.workspace.iterateAllLeaves((leaf) => {
		const view = leaf.view;
		if (view instanceof MarkdownView) {
			removeExistingHeader(view.contentEl);
			view.contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => el.remove());
			view.contentEl.querySelectorAll(".running-head-top-row").forEach((el) => el.remove());
		}
	});
}

