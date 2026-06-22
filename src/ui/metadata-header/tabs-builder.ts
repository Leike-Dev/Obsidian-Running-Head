import { setIcon, App } from "obsidian";
import type { TabGroup, TabItem, TabStyle } from "../../settings";

/**
 * Creates a tabs navigation bar from a TabGroup defined in plugin settings.
 * The frontmatter is only used to determine which group is active (by matching
 * the property value to a group name).
 *
 * Supports drag-to-scroll, mouse wheel horizontal scrolling, and internal links.
 */
export function createTabsBarEl(
	container: HTMLElement,
	activeGroup: TabGroup,
	app: App,
	sourcePath: string,
	tabStyle: TabStyle = "underline"
): HTMLElement | null {
	if (!activeGroup || !activeGroup.tabs || activeGroup.tabs.length === 0) return null;

	const tabsWrapper = container.createDiv({ cls: `running-head-tabs-container tab-style-${tabStyle}` });

	// Mouse drag-to-scroll variables
	let isDown = false;
	let startX = 0;
	let scrollLeftVal = 0;
	let dragMoved = false;

	tabsWrapper.addEventListener("mousedown", (e: MouseEvent) => {
		if (e.button !== 0) return; // Only left click
		isDown = true;
		tabsWrapper.classList.add("is-dragging");
		startX = e.pageX - tabsWrapper.offsetLeft;
		scrollLeftVal = tabsWrapper.scrollLeft;
		dragMoved = false;
	});

	tabsWrapper.addEventListener("mouseleave", () => {
		isDown = false;
		tabsWrapper.classList.remove("is-dragging");
	});

	tabsWrapper.addEventListener("mouseup", () => {
		isDown = false;
		tabsWrapper.classList.remove("is-dragging");
	});

	tabsWrapper.addEventListener("mousemove", (e: MouseEvent) => {
		if (!isDown) return;
		const x = e.pageX - tabsWrapper.offsetLeft;
		const walk = (x - startX) * 1.5; // Scroll speed multiplier
		if (Math.abs(walk) > 5) {
			dragMoved = true;
			tabsWrapper.scrollLeft = scrollLeftVal - walk;
		}
	});

	// Wheel horizontal scroll mapping — only consume the event when
	// the container actually overflows and there is room to scroll.
	tabsWrapper.addEventListener("wheel", (e: WheelEvent) => {
		if (e.deltaY === 0) return;
		const hasOverflow = tabsWrapper.scrollWidth > tabsWrapper.clientWidth;
		if (!hasOverflow) return;

		const atStart = tabsWrapper.scrollLeft <= 0 && e.deltaY < 0;
		const atEnd = tabsWrapper.scrollLeft >= (tabsWrapper.scrollWidth - tabsWrapper.clientWidth) && e.deltaY > 0;
		if (atStart || atEnd) return;

		e.preventDefault();
		tabsWrapper.scrollLeft += e.deltaY;
	}, { passive: false });

	// Render each tab from the group's settings
	for (const tab of activeGroup.tabs) {
		renderTab(tabsWrapper, tab, app, sourcePath, dragMoved, () => dragMoved);
	}

	// Apply overflow-dependent styles only when tabs actually overflow.
	// Uses requestAnimationFrame to ensure layout has been calculated.
	requestAnimationFrame(() => {
		if (tabsWrapper.scrollWidth > tabsWrapper.clientWidth) {
			tabsWrapper.classList.add("is-overflowing");
		}
	});

	return tabsWrapper;
}

/**
 * Renders a single tab element from a TabItem definition.
 */
function renderTab(
	tabsWrapper: HTMLElement,
	tab: TabItem,
	app: App,
	sourcePath: string,
	_dragMovedInitial: boolean,
	getDragMoved: () => boolean
): void {
	const target = tab.linkTarget;
	const label = tab.label;

	const destFile = app.metadataCache.getFirstLinkpathDest(target, sourcePath);
	const currentFile = app.vault.getAbstractFileByPath(sourcePath);
	const isActive = destFile
		? destFile.path === sourcePath
		: (currentFile ? currentFile.name.replace(/\.md$/, "") === target.replace(/\.md$/, "") : false);

	const tabEl = tabsWrapper.createEl("a", {
		cls: isActive ? "running-head-tab is-active" : "running-head-tab",
	});

	// Add internal-link class for native Obsidian behaviors
	tabEl.addClass("internal-link");
	tabEl.setAttr("data-href", target);

	if (tab.icon) {
		const iconSpan = tabEl.createSpan({ cls: "running-head-tab-icon" });
		setIcon(iconSpan, tab.icon);
	}

	tabEl.createSpan({ text: label, cls: "running-head-tab-label" });

	tabEl.addEventListener("click", (e) => {
		if (getDragMoved()) {
			e.preventDefault();
			return;
		}
		e.preventDefault();
		void app.workspace.openLinkText(target, sourcePath);
	});

	// Page preview hover support
	tabEl.addEventListener("mouseover", (e: MouseEvent) => {
		app.workspace.trigger("hover-link", {
			event: e,
			source: "running-head",
			hoverParent: tabEl,
			targetEl: tabEl,
			linktext: target,
			sourcePath,
		});
	});
}

/**
 * Resolves which TabGroup should be active for a given note's frontmatter.
 * Looks up the global property name, reads its value, and matches against group names.
 *
 * ARCHITECTURE NOTE:
 * This uses a linear search O(N) via Array.find(). While using a Map or Record would provide 
 * O(1) lookup time, an Array is retained here for the following reasons:
 * 1. Serialization: Arrays save/load natively to data.json (unlike Maps which require conversion).
 * 2. Prototype Safety: Records risk prototype collision if a user names a group "constructor" or "toString".
 * 3. Performance: In modern V8, iterating hundreds of items with .toLowerCase() takes < 0.05ms, 
 *    making the O(N) cost visually imperceptible while keeping the codebase maintenance simple.
 */
export function resolveActiveTabGroup(
	frontmatter: Record<string, unknown> | undefined,
	propertyName: string,
	tabGroups: TabGroup[]
): TabGroup | null {
	if (!frontmatter || !propertyName || tabGroups.length === 0) return null;

	const rawValue = frontmatter[propertyName];
	
	if (typeof rawValue === "string") {
		const groupName = rawValue.trim();
		if (!groupName) return null;
		return tabGroups.find((g) => g.name.toLowerCase() === groupName.toLowerCase()) ?? null;
	} else if (Array.isArray(rawValue) && rawValue.length > 0) {
		// If it's a list, check all items and return the first one that matches a valid group
		for (const item of rawValue) {
			if (typeof item === "string") {
				const candidate = item.trim();
				const matchedGroup = tabGroups.find((g) => g.name.toLowerCase() === candidate.toLowerCase());
				if (matchedGroup) return matchedGroup;
			}
		}
	}

	return null;
}
