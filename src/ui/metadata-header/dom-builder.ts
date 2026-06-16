import { t } from "../../lang/helpers";
import { HEADER_CLASS, MetadataHeaderOptions } from "./types";
import { renderCustomField } from "./custom-field-renderer";

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
		renderCustomField(wrapper, cf, options);
	}

	return wrapper;
}

/**
 * Remove any existing metadata header from a view container.
 */
export function removeExistingHeader(viewContentEl: HTMLElement): void {
	const existing = viewContentEl.querySelectorAll(`.${HEADER_CLASS}`);
	existing.forEach((el) => el.remove());
	const dummies = viewContentEl.querySelectorAll('.running-head-dummy-anchor');
	dummies.forEach((el) => el.remove());
	const customTitles = viewContentEl.querySelectorAll('.running-head-custom-title');
	customTitles.forEach((el) => el.remove());
	const hiddenTitle = viewContentEl.querySelector('.inline-title.running-head-hidden');
	if (hiddenTitle) hiddenTitle.classList.remove('running-head-hidden');
	const hiddenProps = viewContentEl.querySelector('.metadata-container.running-head-hidden');
	if (hiddenProps) hiddenProps.classList.remove('running-head-hidden');
	viewContentEl.classList.remove('running-head-has-custom-title');
}

// Re-export tabs builder for consumers that import from dom-builder
export { createTabsBarEl } from "./tabs-builder";
