import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";

export function renderFrontmatterSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
		// SECTION 2: FRONTMATTER PROPERTIES
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_frontmatter_properties'))
			.setHeading();

		new Setting(containerEl)
			.setName(t('date_field_name'))
			.setDesc(t('date_field_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('date_field_placeholder'))
					.setValue(plugin.settings.dateField)
					.onChange(async (value) => {
						plugin.settings.dateField = value.trim() || "date";
						await plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('last_updated_field_name'))
			.setDesc(t('last_updated_field_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('last_updated_field_placeholder'))
					.setValue(plugin.settings.lastUpdatedField)
					.onChange(async (value) => {
						plugin.settings.lastUpdatedField = value.trim() || "updated";
						await plugin.saveSettings();
					})
			);

		// ================================================================
}
