import { App, MarkdownView, TFile } from "obsidian";
import type FolioPlugin from "../main";
import type { CustomField } from "../settings";
import { calculateReadingTime } from "../utils/reading-time";
import { formatDate } from "../utils/date-formatter";
import { t } from "../lang/helpers";

/** CSS class applied to the injected container — used to avoid duplicates. */
const HEADER_CLASS = "folio-metadata-header";

/** CSS class for the breadcrumb navigation element. */
const BREADCRUMB_CLASS = "folio-breadcrumb";

/** Regex to detect wiki links: [[target]] or [[target|alias]] */
const WIKI_LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Options resolved from frontmatter + settings, passed to the DOM builder.
 */
interface MetadataHeaderOptions {
	/** Formatted publication date (e.g. "August 6, 2024") */
	formattedDate: string | null;
	/** Reading time in minutes */
	readingTime: number | null;
	/** Formatted last-updated date */
	formattedLastUpdated: string | null;
	/** Whether to show reading time */
	showReadingTime: boolean;
	/** Whether to show last-updated badge */
	showLastUpdated: boolean;
	/** Font size of the header text in rem units */
	badgeFontSize: number;
	/** User-defined custom fields */
	customFields: CustomField[];
	/** Raw frontmatter data for custom field lookup */
	frontmatter: Record<string, unknown> | undefined;
	/** App instance for opening internal links */
	app: App;
	/** Source file path for resolving relative links */
	sourcePath: string;
	/** User-selected date locale for formatting injected strings */
	dateLocale: string;
}

interface AppWithPlugins extends App {
	plugins?: {
		plugins?: {
			[key: string]: {
				settings?: {
					statusStyles?: Array<{ name?: string }>;
				};
				processPill?: (el: HTMLElement, field: string) => void;
			};
		};
	};
	metadataTypeManager?: {
		getAssignedType?: (propertyName: string) => string | undefined;
	};
}

/**
 * Build the metadata header DOM element.
 *
 * Structure:
 * ```html
 * <div class="folio-metadata-header">
 *   <span class="folio-metadata-date">August 6, 2024 / 31 min read</span>
 *   <span class="folio-metadata-badge">Last Updated: August 6, 2024</span>
 * </div>
 * ```
 */
function createMetadataHeaderEl(container: HTMLElement, options: MetadataHeaderOptions): HTMLElement {
	const wrapper = container.createDiv({ cls: HEADER_CLASS });

	// --- Date + Reading Time ---
	if (options.formattedDate) {
		const dateSpan = wrapper.createSpan({ cls: "folio-metadata-date" });

		let dateText = options.formattedDate;
		if (options.showReadingTime && options.readingTime !== null) {
			dateText += ` / ${options.readingTime} ${t('min_read', options.dateLocale)}`;
		}
		dateSpan.textContent = dateText;
	}

	// --- Last Updated Badge ---
	if (options.showLastUpdated && options.formattedLastUpdated) {
		const badge = wrapper.createSpan({ cls: "folio-metadata-badge" });
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
				const containerEl = wrapper.createDiv({ cls: "folio-custom-pills" });

				if (showLabel) {
					const labelSpan = containerEl.createSpan({ cls: "folio-custom-text" });
					labelSpan.textContent = `${label}:`;
				}

				if (isTagsType) {
					containerEl.classList.add("folio-tags-container");
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

		// --- Scalar values ---
		let value: string;
		if (typeof rawValue === "object") {
			value = JSON.stringify(rawValue);
		} else {
			value = String(rawValue as string | number | boolean);
		}

		// --- Wiki links: [[target]] or [[target|alias]] ---
		if (WIKI_LINK_RE.test(value)) {
			WIKI_LINK_RE.lastIndex = 0; // Reset regex state

			const linkContainer = wrapper.createSpan({ cls: "folio-custom-text" });
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
				cls: "folio-custom-link",
				href: value,
			});
			linkEl.textContent = showLabel ? label : value;
			linkEl.setAttribute("target", "_blank");
			linkEl.setAttribute("rel", "noopener noreferrer");
		} else {
			const textEl = wrapper.createSpan({ cls: "folio-custom-text" });
			textEl.textContent = showLabel ? `${label}: ${value}` : value;
		}
	}

	return wrapper;
}

/**
 * Remove any existing metadata header from a view container.
 */
function removeExistingHeader(viewContentEl: HTMLElement): void {
	const existing = viewContentEl.querySelectorAll(`.${HEADER_CLASS}`);
	existing.forEach((el) => el.remove());
}

/**
 * Inject (or refresh) the metadata header into the active markdown view.
 *
 * This function is idempotent — it removes the previous header before
 * creating a new one.
 *
 * @param plugin - Reference to the plugin instance (for settings + app access).
 */
export async function injectMetadataHeader(plugin: FolioPlugin): Promise<void> {
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

		const tempFallback = document.createElement("div");
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
		});
		removeExistingHeader(contentEl);
		previewView.prepend(fallbackEl);
		return;
	}

	// Apply configurable font sizes via CSS variables
	contentEl.style.setProperty('--folio-title-size', `${settings.titleFontSize}em`);
	contentEl.style.setProperty('--folio-badge-size', `${settings.badgeFontSize}rem`);

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
	contentEl.querySelectorAll(".folio-top-row").forEach((el) => el.remove());

	// 1. Top Row (Wiki Style) or Breadcrumb (Blog Style) — DIRECTLY above the title
	const isWikiStyle = settings.layoutStyle === "wiki";
	const showWikiBadge = isWikiStyle && settings.showLastUpdated && formattedLastUpdated;
	const showBreadcrumb = settings.showBreadcrumb;

	let topRowAnchor: Element | null = null;

	if (isWikiStyle && (showBreadcrumb || showWikiBadge)) {
		const topRow = document.createElement("div");
		topRow.classList.add("folio-top-row");

		if (showBreadcrumb) {
			const breadcrumbEl = createBreadcrumbEl(file.path, plugin.app, settings.breadcrumbHighlightLast);
			if (breadcrumbEl) topRow.appendChild(breadcrumbEl);
		}

		if (showWikiBadge) {
			const badge = document.createElement("div");
			badge.classList.add("folio-metadata-badge");
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
		const tempAbove = document.createElement("div");
		const aboveEl = createMetadataHeaderEl(tempAbove, aboveOptions);
		const aboveAnchor = topRowAnchor ?? inlineTitle;
		aboveAnchor.insertAdjacentElement("beforebegin", aboveEl);
	}

	// 3. Date/badge — DIRECTLY below the title (always)
	if (hasDateContent) {
		const tempDate = document.createElement("div");
		const dateEl = createMetadataHeaderEl(tempDate, dateOptions);
		inlineTitle.insertAdjacentElement("afterend", dateEl);
	}

	// 4. Custom fields "below" — BELOW the date/badge (or the title)
	if (hasBelowContent) {
		const tempBelow = document.createElement("div");
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
export function removeAllMetadataHeaders(plugin: FolioPlugin): void {
	plugin.app.workspace.iterateAllLeaves((leaf) => {
		const view = leaf.view;
		if (view instanceof MarkdownView) {
			removeExistingHeader(view.contentEl);
			view.contentEl.querySelectorAll(`.${BREADCRUMB_CLASS}`).forEach((el) => el.remove());
			view.contentEl.querySelectorAll(".folio-top-row").forEach((el) => el.remove());
		}
	});
}

// ============================================================
// BREADCRUMB
// ============================================================

/**
 * Create a breadcrumb element showing the folder path of a note.
 * Each segment is a clickable link that reveals the folder in the file explorer.
 *
 * @param filePath - Full path of the note (e.g. "Base/Windows/Boot/nota.md")
 * @param app - Obsidian App instance
 * @param highlightLast - Whether to apply accent color to the last segment
 * @returns The breadcrumb element, or null if the note is at the vault root
 */
function createBreadcrumbEl(filePath: string, app: App, highlightLast: boolean): HTMLElement | null {
	// Extract ONLY the folder segments (without the filename)
	// e.g. "Base/Windows/Boot/nota.md" → ["Base", "Windows", "Boot"]
	// e.g. "nota.md" → [] (vault root — don't show)
	const parts = filePath.split("/");
	parts.pop(); // remove the filename
	if (parts.length === 0) return null;

	const breadcrumb = document.createElement("div");
	breadcrumb.classList.add(BREADCRUMB_CLASS);

	parts.forEach((segment, index) => {
		if (index > 0) {
			breadcrumb.createSpan({ cls: "folio-breadcrumb-separator", text: "/" });
		}

		const isLast = index === parts.length - 1;
		const folderPath = parts.slice(0, index + 1).join("/");
		const cls = (highlightLast && isLast)
			? "folio-breadcrumb-segment folio-breadcrumb-active"
			: "folio-breadcrumb-segment";
		const link = breadcrumb.createEl("a", {
			cls,
			text: segment,
		});

		link.addEventListener("click", (e) => {
			e.preventDefault();
			const folder = app.vault.getAbstractFileByPath(folderPath);
			if (!folder) return;

			// Reveal in file explorer.
			// revealInFolder is an INTERNAL API (not in obsidian.d.ts).
			// It's the de facto standard used by community plugins.
			// Combined with revealLeaf (PUBLIC API, since 1.7.2) for sidebar/drawer expansion.
			try {
				const explorers = app.workspace.getLeavesOfType("file-explorer");
				const leaf = explorers[0];
				if (leaf) {
					void app.workspace.revealLeaf(leaf);
					const explorerView = leaf.view as { revealInFolder?: (file: unknown) => void };
					if (typeof explorerView.revealInFolder === "function") {
						explorerView.revealInFolder(folder);
					}
				}
			} catch {
				// Silently ignore if file-explorer internal API is unavailable
			}
		});
	});

	return breadcrumb;
}
