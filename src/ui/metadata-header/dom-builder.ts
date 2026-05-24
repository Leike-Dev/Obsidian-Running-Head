import { setIcon, App } from "obsidian";
import { t } from "../../lang/helpers";
import { HEADER_CLASS, WIKI_LINK_RE, MetadataHeaderOptions, AppWithPlugins } from "./types";
import type { TabPropertyConfig, TabStyle } from "../../settings";

/**
 * Build the metadata header DOM element.
 *
 * Structure:
 * ```html
 * <div class="running-head-metadata-header">
 *   <span class="running-head-metadata-date">August 6, 2024 / 31 min read</span>
 *   <span class="running-head-metadata-badge">Last Updated: August 6, 2024</span>
 * </div>
 * ```
 */
export function createMetadataHeaderEl(container: HTMLElement, options: MetadataHeaderOptions): HTMLElement {
	const wrapper = container.createDiv({ cls: HEADER_CLASS });

	// --- Date + Reading Time ---
	if (options.formattedDate) {
		const dateSpan = wrapper.createSpan({ cls: "running-head-metadata-date" });

		let dateText = options.formattedDate;
		if (options.showReadingTime && options.readingTime !== null) {
			dateText += ` / ${options.readingTime} ${t('min_read', options.dateLocale)}`;
		}
		dateSpan.textContent = dateText;
	}

	// --- Last Updated Badge ---
	if (options.showLastUpdated && options.formattedLastUpdated) {
		const badge = wrapper.createSpan({ cls: "running-head-metadata-badge" });
		badge.textContent = `${t('last_updated', options.dateLocale)}: ${options.formattedLastUpdated}`;
	}

	// --- Custom Fields ---
	for (const cf of options.customFields) {
		if (!cf.field) continue;

		const rawValue = options.frontmatter?.[cf.field];
		if (rawValue == null) continue;

		const label = cf.label || cf.field;
		const showLabel = cf.showLabel ?? false;

		let rawArray: unknown[] = [];
		let isTagsType = false;
		let isListType = false;

		// Attempt to get the Obsidian property type
		try {
			const appWithTypes = options.app as AppWithPlugins;
			const typeManager = appWithTypes.metadataTypeManager;
			if (typeManager && typeof typeManager.getAssignedType === "function") {
				const assignedType = typeManager.getAssignedType(cf.field) || "";
				isTagsType = assignedType === "tags" || cf.field.toLowerCase() === "tags";
				isListType = assignedType === "multitext" || assignedType === "aliases" || isTagsType;
			}
		} catch {
			// Fallback: Check field name heuristically if type manager fails
			isTagsType = cf.field.toLowerCase() === "tags";
			isListType = isTagsType;
		}

		let hasTypifyStyle = false;
		try {
			const appWithTypes = options.app as AppWithPlugins;
			const typify = appWithTypes.plugins?.plugins?.["typify"];
			if (typify && typify.settings?.statusStyles && typeof rawValue !== "object" && !Array.isArray(rawValue)) {
				const strValue = String(rawValue as string | number | boolean).trim().toLowerCase();
				hasTypifyStyle = typify.settings.statusStyles.some((s) => s.name?.toLowerCase() === strValue);
			}
		} catch {
			// Ignore API fallback
		}

		if (Array.isArray(rawValue)) {
			rawArray = rawValue;
		} else if (isTagsType || isListType || hasTypifyStyle) {
			rawArray = [rawValue];
		}

		if (rawArray.length > 0) {
			const items = rawArray
				.filter((v) => v !== null && v !== undefined && v !== "")
				.map((v) => String(v).trim());

			if (items.length > 0) {
				const containerEl = wrapper.createDiv({ cls: "running-head-custom-pills" });

				if (showLabel) {
					const labelSpan = containerEl.createSpan({ cls: "running-head-custom-text" });
					labelSpan.textContent = `${label}:`;
				}

				if (isTagsType) {
					containerEl.classList.add("running-head-tags-container");
					for (const item of items) {
						const tagEl = containerEl.createEl("a", {
							cls: "tag",
							href: `#${item}`,
						});
						tagEl.textContent = `#${item}`; // Restore native Obsidian markdown hashtag look
						tagEl.addEventListener("click", (e) => {
							e.preventDefault();
							void options.app.workspace.openLinkText(`#${item}`, options.sourcePath);
						});
					}
				} else {
					containerEl.setAttribute("data-property-key", cf.field);

					for (const item of items) {
						const pillEl = containerEl.createDiv({
							cls: "multi-select-pill",
						});

						const pillContent = pillEl.createSpan({
							cls: "multi-select-pill-content",
						});
						pillContent.textContent = item;

						pillEl.setAttribute("data-value", item);
						pillEl.setAttribute("data-property-key", cf.field);

						try {
							const appWithTypes = options.app as AppWithPlugins;
							const typify = appWithTypes.plugins?.plugins?.["typify"];
							if (typify && typeof typify.processPill === "function") {
								typify.processPill(pillEl, cf.field);
							}
						} catch {
							// Typify fallback
						}
					}
				}
				continue;
			}
		}

		// --- Boolean Badges ---
		if (typeof rawValue === "boolean") {
			const pillEl = wrapper.createDiv({ cls: "multi-select-pill running-head-boolean-pill" });
			if (rawValue) {
				pillEl.classList.add("is-true");
				setIcon(pillEl.createSpan({ cls: "running-head-icon" }), "circle-check");
				pillEl.createSpan({ cls: "multi-select-pill-content", text: showLabel ? label : "True" });
			} else {
				pillEl.classList.add("is-false");
				setIcon(pillEl.createSpan({ cls: "running-head-icon" }), "circle-x");
				pillEl.createSpan({ cls: "multi-select-pill-content", text: showLabel ? label : "False" });
			}
			continue;
		}

		// --- Scalar values ---
		let value: string;
		if (typeof rawValue === "object") {
			value = JSON.stringify(rawValue);
		} else {
			value = String(rawValue as string | number);
		}

		// --- Wiki links: [[target]] or [[target|alias]] ---
		if (WIKI_LINK_RE.test(value)) {
			WIKI_LINK_RE.lastIndex = 0; // Reset regex state

			const linkContainer = wrapper.createSpan({ cls: "running-head-custom-text" });
			let lastIndex = 0;

			let match: RegExpExecArray | null;
			while ((match = WIKI_LINK_RE.exec(value)) !== null) {
				if (match.index > lastIndex) {
					linkContainer.appendText(value.slice(lastIndex, match.index));
				}

				const linkTarget = (match[1] ?? "").trim();
				const linkAlias = match[2]?.trim() || linkTarget;
				const sourcePath = options.sourcePath;

				const linkEl = linkContainer.createEl("a", {
					cls: "internal-link",
				});
				linkEl.textContent = showLabel ? label : linkAlias;
				linkEl.setAttribute("data-href", linkTarget);
				linkEl.addEventListener("click", (e) => {
					e.preventDefault();
					void options.app.workspace.openLinkText(linkTarget, sourcePath);
				});

				lastIndex = match.index + match[0].length;
			}

			if (lastIndex < value.length) {
				linkContainer.appendText(value.slice(lastIndex));
			}

			WIKI_LINK_RE.lastIndex = 0;
			continue;
		}

		// --- External URLs ---
		const isUrl = /^https?:\/\//i.test(value);

		if (isUrl) {
			const linkEl = wrapper.createEl("a", {
				cls: "running-head-custom-link",
				href: value,
			});
			linkEl.textContent = showLabel ? label : value;
			linkEl.setAttribute("target", "_blank");
			linkEl.setAttribute("rel", "noopener noreferrer");
		} else {
			const textEl = wrapper.createSpan({ cls: "running-head-custom-text" });
			textEl.textContent = showLabel ? `${label}: ${value}` : value;
		}
	}

	return wrapper;
}

/**
 * Remove any existing metadata header from a view container.
 */
export function removeExistingHeader(viewContentEl: HTMLElement): void {
	const existing = viewContentEl.querySelectorAll(`.${HEADER_CLASS}`);
	existing.forEach((el) => el.remove());
	const hiddenTitle = viewContentEl.querySelector('.inline-title.running-head-hidden');
	if (hiddenTitle) hiddenTitle.classList.remove('running-head-hidden');
	const hiddenProps = viewContentEl.querySelector('.metadata-container.running-head-hidden');
	if (hiddenProps) hiddenProps.classList.remove('running-head-hidden');
}

/**
 * Parses frontmatter properties into a tabs navigation bar DOM element.
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
			tabsWrapper.classList.add("has-overflow");
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
