import { MarkdownView, TFile, moment } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { CustomField } from "../../settings";
import { calculateReadingTime } from "../../utils/reading-time";
import { formatDate } from "../../utils/date-formatter";

import { BREADCRUMB_CLASS, MetadataHeaderOptions } from "./types";
import { createBreadcrumbEl } from "./breadcrumb";
import { createMetadataHeaderEl, removeExistingHeader, createTabsBarEl } from "./dom-builder";

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
	if (!formattedDate && !formattedLastUpdated && !hasCustomFields && !settings.showBreadcrumb && !settings.formatTitleAsDate) {
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

	// Apply configurable font sizes via CSS variables
	contentEl.style.setProperty('--running-head-title-size', `${settings.titleFontSize}em`);
	contentEl.style.setProperty('--running-head-badge-size', `${settings.badgeFontSize}rem`);

	// --- Custom Title Processing ---
	let customTitleText: string | null = null;
	if (settings.formatTitleAsDate) {
		customTitleText = file.basename.trim();
		const DATE_FORMATS = [
			"YYYY-MM-DD",
			"YYYY-MM-DD HHmm",
			"YYYY-MM-DD HH:mm",
			"YYYY-MM-DD HH:mm:ss",
			"YYYYMMDD",
			"YYYYMMDDHHmm",
			"YYYYMMDDHHmmss",
			"YYYYMMDD HHmm",
			"YYYYMMDD HH:mm",
			"DD-MM-YYYY",
			"DD-MM-YYYY HH:mm",
			"DD-MM-YYYY HHmm",
			"DD.MM.YYYY",
			"YYYY.MM.DD",
			"YYYY/MM/DD",
			"DD/MM/YYYY"
		];
		let parsedDate = moment(customTitleText, DATE_FORMATS, true);

		if (!parsedDate.isValid()) {
			const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
			const dateObj = isoDateOnly.test(customTitleText)
				? new Date(customTitleText + "T00:00:00")
				: new Date(customTitleText);
			
			if (!isNaN(dateObj.getTime())) {
				parsedDate = moment(dateObj);
			}
		}

		if (parsedDate.isValid()) {
			if (settings.customDateFormat) {
				customTitleText = parsedDate.format(settings.customDateFormat);
			} else {
				const matchedFormat = parsedDate.creationData()?.format;
				
				// Force includesTime if it has hours or minutes
				const hasTime = parsedDate.hours() > 0 || parsedDate.minutes() > 0;
				
				let includesTime = false;
				if (typeof matchedFormat === "string") {
					includesTime = matchedFormat.includes("HH") || matchedFormat.includes("mm") || matchedFormat.includes("hh");
				} else if (Array.isArray(matchedFormat) && matchedFormat.length > 0) {
					const firstFormat = typeof matchedFormat[0] === "string" ? matchedFormat[0] : "";
					includesTime = firstFormat.includes("HH") || firstFormat.includes("mm") || firstFormat.includes("hh");
				} else {
					includesTime = hasTime;
				}
				
				customTitleText = parsedDate.locale(settings.dateLocale).format(includesTime || hasTime ? "LLL" : "LL");
			}
		}
	}

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
		...dateOptions,
		formattedDate: null,
		readingTime: null,
		formattedLastUpdated: null,
		showReadingTime: false,
		showLastUpdated: false,
		customFields: aboveFields,
	};

	// --- Build "below" wrapper (custom fields only) ---
	const belowOptions: MetadataHeaderOptions = {
		...dateOptions,
		formattedDate: null,
		readingTime: null,
		formattedLastUpdated: null,
		showReadingTime: false,
		showLastUpdated: false,
		customFields: belowFields,
	};

	// Check if each section has any content to render
	const hasDateContent = !!(formattedDate || (formattedLastUpdated && settings.showLastUpdated));
	const hasAboveContent = aboveFields.length > 0;
	const hasBelowContent = belowFields.length > 0;

	// ==============================================================================
	// DOM MUTATION PHASE
	// Synchronous atomic replacement: remove old headers and breadcrumbs,
	// then insert new ones in the exact same frame.
	// ==============================================================================
	removeExistingHeader(contentEl);
	contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => el.remove());
	contentEl.querySelectorAll(".running-head-top-row").forEach((el) => el.remove());
	contentEl.querySelectorAll(".running-head-tabs-container").forEach((el) => el.remove());

	// Resolve the anchor element
	let inlineTitle = contentEl.querySelector<HTMLElement>(".inline-title");
	if (!inlineTitle) {
		const cmContent = contentEl.querySelector<HTMLElement>(".cm-content");
		if (cmContent) {
			const dummy = contentEl.ownerDocument.createElement("div");
			dummy.classList.add("running-head-dummy-anchor");
			cmContent.insertAdjacentElement("beforebegin", dummy);
			inlineTitle = dummy;
		} else {
			const previewSizer = contentEl.querySelector<HTMLElement>(".markdown-preview-sizer");
			if (previewSizer && previewSizer.firstElementChild) {
				const dummy = contentEl.ownerDocument.createElement("div");
				dummy.classList.add("running-head-dummy-anchor");
				previewSizer.firstElementChild.insertAdjacentElement("beforebegin", dummy);
				inlineTitle = dummy;
			}
		}
	}

	if (!inlineTitle) {
		// Ultimate fallback if nothing can be used as anchor
		const previewView = contentEl.querySelector(".markdown-preview-view") ??
			contentEl.querySelector(".markdown-source-view") ??
			contentEl;

		const tempFallback = contentEl.ownerDocument.createElement("div");
		// Use all scoped fields for the ultimate fallback
		const fallbackOptions: MetadataHeaderOptions = {
			...dateOptions,
			customFields: [...aboveFields, ...belowFields]
		};
		const fallbackEl = createMetadataHeaderEl(tempFallback, fallbackOptions);
		previewView.prepend(fallbackEl);
		return;
	}

	let insertionAnchor: Element = inlineTitle;
	if (inlineTitle.parentElement?.classList.contains("mod-header")) {
		insertionAnchor = inlineTitle.parentElement;
	}

	let injectedTitleAnchor: Element = insertionAnchor;

	if (customTitleText) {
		contentEl.classList.add("running-head-has-custom-title");
		const customTitleEl = contentEl.ownerDocument.createElement("div");
		customTitleEl.classList.add("inline-title", "running-head-custom-title");
		customTitleEl.textContent = customTitleText;
		insertionAnchor.insertAdjacentElement("beforebegin", customTitleEl);
		injectedTitleAnchor = customTitleEl;
		
		// Hide the native title if it exists, since we are replacing it
		if (inlineTitle.classList.contains("inline-title") && !inlineTitle.classList.contains("running-head-dummy-anchor")) {
			inlineTitle.classList.add("running-head-hidden");
		}
	} else {
		contentEl.classList.remove("running-head-has-custom-title");
	}

	const isWikiStyle = settings.layoutStyle === "wiki";
	const showBreadcrumb = settings.showBreadcrumb;

	let topAnchor: Element | null = null;
	let bottomAnchor: Element = injectedTitleAnchor;

	if (isWikiStyle) {
		// Wiki Style: Date+Badge Above Title, Breadcrumb Below Title
		if (hasDateContent) {
			const tempDate = contentEl.ownerDocument.createElement("div");
			const dateEl = createMetadataHeaderEl(tempDate, dateOptions);
			injectedTitleAnchor.insertAdjacentElement("beforebegin", dateEl);
			topAnchor = dateEl;
		}

		if (showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
			if (breadcrumbEl) {
				injectedTitleAnchor.insertAdjacentElement("afterend", breadcrumbEl);
				bottomAnchor = breadcrumbEl;
			}
		}
	} else {
		// Blog Style: Breadcrumb Above Title, Date+Badge Below Title
		if (showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
			if (breadcrumbEl) {
				injectedTitleAnchor.insertAdjacentElement("beforebegin", breadcrumbEl);
				topAnchor = breadcrumbEl;
			}
		}

		if (hasDateContent) {
			const tempDate = contentEl.ownerDocument.createElement("div");
			const dateEl = createMetadataHeaderEl(tempDate, dateOptions);
			injectedTitleAnchor.insertAdjacentElement("afterend", dateEl);
			bottomAnchor = dateEl;
		}
	}

	// Custom fields "above" — ABOVE the topmost element (or the title)
	if (hasAboveContent) {
		const tempAbove = contentEl.ownerDocument.createElement("div");
		const aboveEl = createMetadataHeaderEl(tempAbove, aboveOptions);
		const anchor = topAnchor ?? injectedTitleAnchor;
		anchor.insertAdjacentElement("beforebegin", aboveEl);
	}

	let tabsAnchor = bottomAnchor;
	// Custom fields "below" — BELOW the bottommost element (or the title)
	if (hasBelowContent) {
		const tempBelow = contentEl.ownerDocument.createElement("div");
		const belowEl = createMetadataHeaderEl(tempBelow, belowOptions);
		bottomAnchor.insertAdjacentElement("afterend", belowEl);
		tabsAnchor = belowEl;
	}

	// Render tabs bar below custom fields
	if (settings.tabsProperties && settings.tabsProperties.length > 0) {
		const tabsEl = createTabsBarEl(contentEl, settings.tabsProperties, frontmatter, plugin.app, file.path, settings.tabStyle);
		if (tabsEl) {
			tabsAnchor.insertAdjacentElement("afterend", tabsEl);
		}
	}

	// Add sibling classes for layout-aware CSS styling
	const parent = injectedTitleAnchor.parentElement;
	if (parent) {
		const children = Array.from(parent.children);
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			const next = children[i + 1];
			if (!child || !next) continue;

			if (next === injectedTitleAnchor) {
				child.classList.add("is-above-title");
			}
			if (child === injectedTitleAnchor) {
				next.classList.add("is-below-title");
			}

			if (child.classList.contains("running-head-metadata-header") && next.classList.contains("running-head-breadcrumb")) {
				child.classList.add("with-breadcrumb-sibling");
			}
		}
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
			view.contentEl.querySelectorAll(".running-head-tabs-container").forEach((el) => el.remove());
		}
	});
}

