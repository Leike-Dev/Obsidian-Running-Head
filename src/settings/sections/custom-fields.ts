import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";
import { FieldEditorModal } from "../../ui/FieldEditorModal";
import { FieldManagerModal } from "../../ui/FieldManagerModal";

export function renderCustomFieldsSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
		// SECTION 4: CUSTOM FIELDS
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_custom_fields'))
			.setHeading();

		new Setting(containerEl)
			.setName(t('add_field_name'))
			.setDesc(t('add_field_desc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('add_field_button'))
					.setCta()
					.onClick(() => {
						new FieldEditorModal(plugin.app, plugin, () => tab.display()).open();
					})
			);

		new Setting(containerEl)
			.setName(t('manage_fields_name'))
			.setDesc(t('manage_fields_desc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('manage_fields_button'))
					.onClick(() => {
						new FieldManagerModal(plugin.app, plugin, () => tab.display()).open();
					})
			);

		// ================================================================
}
