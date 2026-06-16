import { setIcon } from "obsidian";
import { WIKI_LINK_RE, MetadataHeaderOptions, AppWithPlugins } from "./types";
import type { CustomField } from "../../settings";

/** Pre-compiled regex for detecting external URLs. */
const EXTERNAL_URL_RE = /^https?:\/\//i;

/**
 * Render a single custom field into the header wrapper element.
 * Handles: array/pill values, tags, booleans, wiki links, external URLs, and scalar text.
 *
 * @param wrapper - The parent container to append field elements into.
 * @param cf - The custom field configuration.
 * @param options - Header options containing frontmatter data and app references.
 */
export function renderCustomField(wrapper: HTMLElement, cf: CustomField, options: MetadataHeaderOptions): void {
	if (!cf.field) return;

	const rawValue = options.frontmatter?.[cf.field];
	if (rawValue == null) return;

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
			const strValue = String(rawValue).trim().toLowerCase();
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
			renderPillsOrTags(wrapper, items, cf, options, isTagsType, showLabel, label);
			return;
		}
	}

	// --- Boolean Badges ---
	if (typeof rawValue === "boolean") {
		renderBooleanBadge(wrapper, rawValue, showLabel, label);
		return;
	}

	// --- Scalar values ---
	let value: string;
	if (typeof rawValue === "string") {
		value = rawValue;
	} else if (typeof rawValue === "number") {
		value = String(rawValue);
	} else if (typeof rawValue === "object") {
		value = JSON.stringify(rawValue);
	} else {
		value = String(rawValue);
	}

	// --- Wiki links: [[target]] or [[target|alias]] ---
	if (WIKI_LINK_RE.test(value)) {
		WIKI_LINK_RE.lastIndex = 0; // Reset regex state
		renderWikiLinks(wrapper, value, options, showLabel, label);
		WIKI_LINK_RE.lastIndex = 0;
		return;
	}

	// --- External URLs ---
	if (EXTERNAL_URL_RE.test(value)) {
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

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

function renderPillsOrTags(
	wrapper: HTMLElement,
	items: string[],
	cf: CustomField,
	options: MetadataHeaderOptions,
	isTagsType: boolean,
	showLabel: boolean,
	label: string,
): void {
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
}

function renderBooleanBadge(wrapper: HTMLElement, value: boolean, showLabel: boolean, label: string): void {
	const pillEl = wrapper.createDiv({ cls: "multi-select-pill running-head-boolean-pill" });
	if (value) {
		pillEl.classList.add("is-true");
		setIcon(pillEl.createSpan({ cls: "running-head-icon" }), "circle-check");
		pillEl.createSpan({ cls: "multi-select-pill-content", text: showLabel ? label : "True" });
	} else {
		pillEl.classList.add("is-false");
		setIcon(pillEl.createSpan({ cls: "running-head-icon" }), "circle-x");
		pillEl.createSpan({ cls: "multi-select-pill-content", text: showLabel ? label : "False" });
	}
}

function renderWikiLinks(
	wrapper: HTMLElement,
	value: string,
	options: MetadataHeaderOptions,
	showLabel: boolean,
	label: string,
): void {
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
}
