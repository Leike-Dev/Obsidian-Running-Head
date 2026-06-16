import { setIcon, App } from "obsidian";
import type { TabPropertyConfig, TabStyle } from "../../settings";

/**
 * Parses frontmatter properties into a tabs navigation bar DOM element.
 * Supports drag-to-scroll, mouse wheel horizontal scrolling, and wiki-link tab items.
 */
export function createTabsBarEl(
	container: HTMLElement,
	tabConfigs: TabPropertyConfig[],
	frontmatter: Record<string, unknown> | undefined,
	app: App,
	sourcePath: string,
	tabStyle: TabStyle = "underline"
): HTMLElement | null {
	if (!frontmatter || !tabConfigs || tabConfigs.length === 0) return null;

	const tabsWrapper = container.createDiv({ cls: `running-head-tabs-container tab-style-${tabStyle}` });
	let hasTabs = false;

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

	for (const config of tabConfigs) {
		const rawValue = frontmatter[config.property];
		if (!rawValue || !Array.isArray(rawValue)) continue;

		let link: string | null = null;
		let iconName: string | null = null;
		let customLabel: string | null = null;

		for (const item of rawValue) {
			const val = String(item).trim();
			if (val.startsWith("[[") && val.endsWith("]]")) {
				link = val;
			} else {
				const iconMatch = val.match(/^\[icon\s*,\s*(.+)\]$/i);
				if (iconMatch && iconMatch[1]) {
					iconName = iconMatch[1].trim();
					continue;
				}
				const nameMatch = val.match(/^\[name\s*,\s*(.+)\]$/i);
				if (nameMatch && nameMatch[1]) {
					customLabel = nameMatch[1].trim();
					continue;
				}
			}
		}

		if (!link) continue;

		const linkMatch = parseWikiLink(link);
		if (!linkMatch) continue;

		const target = linkMatch.target;
		const alias = linkMatch.alias;
		const label = customLabel || alias || target;

		const destFile = app.metadataCache.getFirstLinkpathDest(target, sourcePath);
		const currentFile = app.vault.getAbstractFileByPath(sourcePath);
		const isActive = destFile 
			? destFile.path === sourcePath 
			: (currentFile ? currentFile.name.replace(/\.md$/, "") === target : false);

		const tabEl = tabsWrapper.createEl("a", {
			cls: isActive ? "running-head-tab is-active" : "running-head-tab",
		});

		if (config.showIcon && iconName) {
			const iconSpan = tabEl.createSpan({ cls: "running-head-tab-icon" });
			setIcon(iconSpan, iconName);
		}

		tabEl.createSpan({ text: label, cls: "running-head-tab-label" });

		tabEl.addEventListener("click", (e) => {
			if (dragMoved) {
				e.preventDefault();
				return;
			}
			e.preventDefault();
			void app.workspace.openLinkText(target, sourcePath);
		});

		hasTabs = true;
	}

	if (!hasTabs) {
		tabsWrapper.remove();
		return null;
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

function parseWikiLink(text: string): { target: string; alias?: string } | null {
	const regex = /^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/;
	const match = regex.exec(text);
	if (!match || !match[1]) return null;
	return {
		target: match[1].trim(),
		alias: match[2]?.trim()
	};
}
