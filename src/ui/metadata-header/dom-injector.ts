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
	contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => { if (!el.closest(".markdown-embed")) el.remove(); });
	contentEl.querySelectorAll(".running-head-top-row").forEach((el) => { if (!el.closest(".markdown-embed")) el.remove(); });
	contentEl.querySelectorAll(".running-head-tabs-container").forEach((el) => { if (!el.closest(".markdown-embed")) el.remove(); });
}

/**
 * Helper to safely find the first matching element that is NOT inside an embed.
 */
function findSafeAnchor(contentEl: HTMLElement, selector: string): Element | undefined {
	const elements = Array.from(contentEl.querySelectorAll(selector));
	return elements.find(el => !el.closest(".markdown-embed"));
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

	const topElements: Element[] = [];
	const bottomElements: Element[] = [];

	// 1. Above Custom Fields
	if (ctx.hasAboveContent) {
		const tempAbove = createDiv();
		topElements.push(createMetadataHeaderEl(tempAbove, ctx.aboveOptions));
	}

	// 2. Date / Breadcrumb (Top)
	const isWikiStyle = ctx.layoutStyle === "wiki";
	if (isWikiStyle && ctx.hasDateContent) {
		const tempDate = createDiv();
		topElements.push(createMetadataHeaderEl(tempDate, ctx.dateOptions));
	} else if (!isWikiStyle && ctx.showBreadcrumb) {
		const breadcrumbEl = createBreadcrumbEl(ctx.filePath, ctx.app, ctx.breadcrumbHighlightLast, contentEl.ownerDocument);
		if (breadcrumbEl) topElements.push(breadcrumbEl);
	}

	// 3. Custom Title
	let customTitleEl: HTMLDivElement | null = null;
	if (ctx.customTitleText) {
		customTitleEl = createDiv({ cls: "running-head-custom-title", text: ctx.customTitleText });
	}

	// 4. Date / Breadcrumb (Bottom)
	if (isWikiStyle && ctx.showBreadcrumb) {
		const breadcrumbEl = createBreadcrumbEl(ctx.filePath, ctx.app, ctx.breadcrumbHighlightLast, contentEl.ownerDocument);
		if (breadcrumbEl) bottomElements.push(breadcrumbEl);
	} else if (!isWikiStyle && ctx.hasDateContent) {
		const tempDate = createDiv();
		bottomElements.push(createMetadataHeaderEl(tempDate, ctx.dateOptions));
	}

	// 5. Below Custom Fields
	if (ctx.hasBelowContent) {
		const tempBelow = createDiv();
		bottomElements.push(createMetadataHeaderEl(tempBelow, ctx.belowOptions));
	}

	// 6. Tabs
	if (ctx.activeTabGroup) {
		const tabsEl = createTabsBarEl(contentEl, ctx.activeTabGroup, ctx.app, ctx.filePath, ctx.tabStyle);
		if (tabsEl) bottomElements.push(tabsEl);
	}

	// Resolve the anchor element hierarchically (always at the very top of the content)
	// We use findSafeAnchor to ensure we don't accidentally match elements inside embeds (.markdown-embed)
	const insertionAnchor = findSafeAnchor(contentEl, ".inline-title")
		?? findSafeAnchor(contentEl, ".metadata-container")
		?? findSafeAnchor(contentEl, ".cm-content")
		?? findSafeAnchor(contentEl, ".markdown-preview-sizer")?.firstElementChild
		?? contentEl.firstElementChild
		?? contentEl;

	const allElements = customTitleEl 
		? [...topElements, customTitleEl, ...bottomElements] 
		: [...topElements, ...bottomElements];

	if (allElements.length === 0) return;

	// Add sibling layout classes
	for (let i = 0; i < allElements.length; i++) {
		const child = allElements[i];
		const next = allElements[i + 1];
		if (!child) continue;

		if (customTitleEl) {
			if (child === topElements[topElements.length - 1]) child.classList.add("is-above-title");
			if (child === bottomElements[0]) child.classList.add("is-below-title");
		} else if (insertionAnchor?.classList.contains("inline-title")) {
			if (child === topElements[topElements.length - 1]) child.classList.add("is-above-title");
			if (child === bottomElements[0]) child.classList.add("is-below-title");
		}
		
		if (next && child.classList.contains("running-head-metadata-header") && next.classList.contains("running-head-breadcrumb")) {
			child.classList.add("with-breadcrumb-sibling");
		}
	}

	if (!insertionAnchor || insertionAnchor === contentEl) {
		const fragment = createFragment();
		for (const el of allElements) fragment.appendChild(el);
		contentEl.prepend(fragment);
		return;
	}

	if (customTitleEl || !insertionAnchor.classList.contains("inline-title")) {
		// Single injection BEFORE the anchor
		const fragment = createFragment();
		for (const el of allElements) fragment.appendChild(el);
		insertionAnchor.before(fragment);
	} else {
		// Split injection around the native title
		if (topElements.length > 0) {
			const topFragment = createFragment();
			for (const el of topElements) topFragment.appendChild(el);
			insertionAnchor.before(topFragment);
		}
		if (bottomElements.length > 0) {
			const bottomFragment = createFragment();
			for (const el of bottomElements) bottomFragment.appendChild(el);
			insertionAnchor.after(bottomFragment);
		}
	}

	// Process first H1 for Reading View without :has selector
	const firstH1 = contentEl.querySelector('.markdown-preview-sizer > div > h1');
	if (firstH1 && firstH1.parentElement) {
		firstH1.parentElement.classList.add('running-head-first-h1-wrapper');
	}
}
