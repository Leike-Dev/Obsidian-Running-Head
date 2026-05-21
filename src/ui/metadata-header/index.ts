import { MarkdownView, TFile } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { CustomField } from "../../settings";
import { calculateReadingTime } from "../../utils/reading-time";
import { formatDate } from "../../utils/date-formatter";

import { BREADCRUMB_CLASS, MetadataHeaderOptions } from "./types";
import { createBreadcrumbEl } from "./breadcrumb";
import { createMetadataHeaderEl, removeExistingHeader } from "./dom-builder";

/**
 * Inject (or refresh) the metadata header into the active markdown view.
 *
 * The exact layout depends on the configured `layoutStyle`:
 * - **Wiki Style**: Places the date/badge row above the title, and the breadcrumb below.
 * - **Blog Style**: Places the breadcrumb above the title, and the date/badge row below.
 * Custom fields are appended either at the very top or the very bottom depending on their position setting.
 *
 * This function is idempotent — it removes the previous header before
 * creating a new one.
 *
 * @param plugin - Reference to the plugin instance (for settings + app access).
 */
export async function injectMetadataHeader(plugin: RunningHeadPlugin): Promise<void> {
	const leaves = plugin.app.workspace.getLeavesOfType("markdown");
	const promises = leaves.map((leaf) => {
		if (leaf.view instanceof MarkdownView) {
			return injectMetadataHeaderForView(plugin, leaf.view);
		}
		return Promise.resolve();
	});
	await Promise.all(promises);
}

async function injectMetadataHeaderForView(plugin: RunningHeadPlugin, view: MarkdownView): Promise<void> {
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

		const tempFallback = contentEl.ownerDocument.createElement("div");
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

	// --- Date/badge options (can be above or below the title depending on layout) ---
	const dateOptions: MetadataHeaderOptions = {
		formattedDate,
		readingTime,
		formattedLastUpdated,
		showReadingTime: settings.showReadingTime,
		showLastUpdated: settings.showLastUpdated,
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
	const hasDateContent = !!(formattedDate || (formattedLastUpdated && settings.showLastUpdated));
	const hasAboveContent = aboveFields.length > 0;
	const hasBelowContent = belowFields.length > 0;

	// Synchronous atomic replacement: remove old headers and breadcrumbs,
	// then insert new ones in the exact same frame.
	removeExistingHeader(contentEl);
	contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => el.remove());
	contentEl.querySelectorAll(".running-head-top-row").forEach((el) => el.remove());

	const isWikiStyle = settings.layoutStyle === "wiki";
	const showBreadcrumb = settings.showBreadcrumb;

	let topAnchor: Element | null = null;
	let bottomAnchor: Element = inlineTitle;

	if (isWikiStyle) {
		// Wiki Style: Date+Badge Above Title, Breadcrumb Below Title
		if (hasDateContent) {
			const tempDate = contentEl.ownerDocument.createElement("div");
			const dateEl = createMetadataHeaderEl(tempDate, dateOptions);
			inlineTitle.insertAdjacentElement("beforebegin", dateEl);
			topAnchor = dateEl;
		}

		if (showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
			if (breadcrumbEl) {
				inlineTitle.insertAdjacentElement("afterend", breadcrumbEl);
				bottomAnchor = breadcrumbEl;
			}
		}
	} else {
		// Blog Style: Breadcrumb Above Title, Date+Badge Below Title
		if (showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
			if (breadcrumbEl) {
				inlineTitle.insertAdjacentElement("beforebegin", breadcrumbEl);
				topAnchor = breadcrumbEl;
			}
		}

		if (hasDateContent) {
			const tempDate = contentEl.ownerDocument.createElement("div");
			const dateEl = createMetadataHeaderEl(tempDate, dateOptions);
			inlineTitle.insertAdjacentElement("afterend", dateEl);
			bottomAnchor = dateEl;
		}
	}

	// Custom fields "above" — ABOVE the topmost element (or the title)
	if (hasAboveContent) {
		const tempAbove = contentEl.ownerDocument.createElement("div");
		const aboveEl = createMetadataHeaderEl(tempAbove, aboveOptions);
		const anchor = topAnchor ?? inlineTitle;
		anchor.insertAdjacentElement("beforebegin", aboveEl);
	}

	// Custom fields "below" — BELOW the bottommost element (or the title)
	if (hasBelowContent) {
		const tempBelow = contentEl.ownerDocument.createElement("div");
		const belowEl = createMetadataHeaderEl(tempBelow, belowOptions);
		bottomAnchor.insertAdjacentElement("afterend", belowEl);
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

