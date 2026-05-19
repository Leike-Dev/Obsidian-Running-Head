import { setIcon } from "obsidian";
import { t } from "../../lang/helpers";
import { HEADER_CLASS, WIKI_LINK_RE, MetadataHeaderOptions, AppWithPlugins } from "./types";

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
}
