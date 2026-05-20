import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";
import { ExportSettingsModal } from "../../ui/ExportSettingsModal";
import { ImportSettingsModal } from "../../ui/ImportSettingsModal";

export function renderDataManagementSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
	// ================================================================
	// SECTION: DATA MANAGEMENT
	// ================================================================
	new Setting(containerEl)
		.setName(t('section_data_management_title'))
		.setHeading();

	// EXPORT
	new Setting(containerEl)
		.setName(t('export_title'))
		.setDesc(t('export_desc'))
		.addButton((button) =>
			button
				.setButtonText(t('export_button'))
				.onClick(() => {
					new ExportSettingsModal(plugin.app, plugin).open();
				})
		);

	// IMPORT
	new Setting(containerEl)
		.setName(t('import_title'))
		.setDesc(t('import_desc'))
		.addButton((button) =>
			button
				.setButtonText(t('import_button'))
				.onClick(() => {
					new ImportSettingsModal(plugin.app, plugin, () => {
						tab.display();
					}).open();
				})
		);

	// ================================================================
}
