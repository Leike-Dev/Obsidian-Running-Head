import type { App } from "obsidian";
import { BREADCRUMB_CLASS, MetadataHeaderOptions } from "./types";
import { createBreadcrumbEl } from "./breadcrumb";
import { createMetadataHeaderEl, removeExistingHeader, createTabsBarEl } from "./dom-builder";
import type { TabGroup, TabStyle } from "../../settings";

/**
 * Remove all plugin-injected elements (headers, breadcrumbs, tabs, dummy anchors)
 * from a single view container.
 */
export function removeAllInjectedElements(contentEl: HTMLElement): void {
	removeExistingHeader(contentEl);
	contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => el.remove());
	contentEl.querySelectorAll(".running-head-top-row").forEach((el) => el.remove());
	contentEl.querySelectorAll(".running-head-tabs-container").forEach((el) => el.remove());
}

/**
 * Context required for injecting metadata elements into a markdown view.
 */
export interface InjectionContext {
	contentEl: HTMLElement;
	filePath: string;
	app: App;
	customTitleText: string | null;
	layoutStyle: "wiki" | "blog";
	showBreadcrumb: boolean;
	breadcrumbHighlightLast: boolean;
	/** Active tab group resolved from frontmatter (or null if none) */
	activeTabGroup: TabGroup | null;
	/** Visual style for the tabs navigation bar */
	tabStyle: TabStyle;
	dateOptions: MetadataHeaderOptions;
	aboveOptions: MetadataHeaderOptions;
	belowOptions: MetadataHeaderOptions;
	hasDateContent: boolean;
	hasAboveContent: boolean;
	hasBelowContent: boolean;
	frontmatter: Record<string, unknown> | undefined;
}

/**
 * Perform the synchronous DOM mutation phase: remove old headers, locate the
 * anchor element, and insert new metadata elements in the correct layout order.
 *
 * This function is idempotent — it removes previous injections before creating
 * new ones in a single synchronous frame to avoid layout shifts.
 */
export function injectElementsIntoView(ctx: InjectionContext): void {
	const { contentEl } = ctx;

	// ==============================================================================
	// DOM MUTATION PHASE
	// Synchronous atomic replacement: remove old headers and breadcrumbs,
	// then insert new ones in the exact same frame.
	// ==============================================================================
	removeAllInjectedElements(contentEl);

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
		const fallbackOptions: MetadataHeaderOptions = {
			...ctx.dateOptions,
			customFields: [...ctx.aboveOptions.customFields, ...ctx.belowOptions.customFields]
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

	if (ctx.customTitleText) {
		contentEl.classList.add("running-head-has-custom-title");
		const customTitleEl = contentEl.ownerDocument.createElement("div");
		customTitleEl.classList.add("inline-title", "running-head-custom-title");
		customTitleEl.textContent = ctx.customTitleText;
		insertionAnchor.insertAdjacentElement("beforebegin", customTitleEl);
		injectedTitleAnchor = customTitleEl;

		// Hide the native title if it exists, since we are replacing it
		if (inlineTitle.classList.contains("inline-title") && !inlineTitle.classList.contains("running-head-dummy-anchor")) {
			inlineTitle.classList.add("running-head-hidden");
		}
	} else {
		contentEl.classList.remove("running-head-has-custom-title");
	}

	const isWikiStyle = ctx.layoutStyle === "wiki";

	let topAnchor: Element | null = null;
	let bottomAnchor: Element = injectedTitleAnchor;

	if (isWikiStyle) {
		// Wiki Style: Date+Badge Above Title, Breadcrumb Below Title
		if (ctx.hasDateContent) {
			const tempDate = contentEl.ownerDocument.createElement("div");
			const dateEl = createMetadataHeaderEl(tempDate, ctx.dateOptions);
			injectedTitleAnchor.insertAdjacentElement("beforebegin", dateEl);
			topAnchor = dateEl;
		}

		if (ctx.showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(ctx.filePath, ctx.app, ctx.breadcrumbHighlightLast, contentEl.ownerDocument);
			if (breadcrumbEl) {
				injectedTitleAnchor.insertAdjacentElement("afterend", breadcrumbEl);
				bottomAnchor = breadcrumbEl;
			}
		}
	} else {
		// Blog Style: Breadcrumb Above Title, Date+Badge Below Title
		if (ctx.showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(ctx.filePath, ctx.app, ctx.breadcrumbHighlightLast, contentEl.ownerDocument);
			if (breadcrumbEl) {
				injectedTitleAnchor.insertAdjacentElement("beforebegin", breadcrumbEl);
				topAnchor = breadcrumbEl;
			}
		}

		if (ctx.hasDateContent) {
			const tempDate = contentEl.ownerDocument.createElement("div");
			const dateEl = createMetadataHeaderEl(tempDate, ctx.dateOptions);
			injectedTitleAnchor.insertAdjacentElement("afterend", dateEl);
			bottomAnchor = dateEl;
		}
	}

	// Custom fields "above" — ABOVE the topmost element (or the title)
	if (ctx.hasAboveContent) {
		const tempAbove = contentEl.ownerDocument.createElement("div");
		const aboveEl = createMetadataHeaderEl(tempAbove, ctx.aboveOptions);
		const anchor = topAnchor ?? injectedTitleAnchor;
		anchor.insertAdjacentElement("beforebegin", aboveEl);
	}

	let tabsAnchor = bottomAnchor;
	// Custom fields "below" — BELOW the bottommost element (or the title)
	if (ctx.hasBelowContent) {
		const tempBelow = contentEl.ownerDocument.createElement("div");
		const belowEl = createMetadataHeaderEl(tempBelow, ctx.belowOptions);
		bottomAnchor.insertAdjacentElement("afterend", belowEl);
		tabsAnchor = belowEl;
	}

	// Render tabs bar below custom fields
	if (ctx.activeTabGroup) {
		const tabsEl = createTabsBarEl(contentEl, ctx.activeTabGroup, ctx.app, ctx.filePath, ctx.tabStyle);
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
