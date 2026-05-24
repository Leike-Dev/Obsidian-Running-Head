import { Setting, Notice } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import type { TabStyle } from "../types";
import { t } from "../../lang/helpers";
import { TabPropertyManagerModal } from "../../ui/TabPropertyManagerModal";
import { TabPropertyEditorModal } from "../../ui/TabPropertyEditorModal";
import { IconPickerModal } from "../../ui/IconPickerModal";

export function renderTabsSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
	// SECTION: TABS NAVIGATION
	// ================================================================
	new Setting(containerEl)
		.setName(t('section_tabs'))
		.setHeading();

	// Add tab property
	new Setting(containerEl)
		.setName(t('add_tab_property_name'))
		.setDesc(t('add_tab_property_desc'))
		.addButton((btn) =>
			btn
				.setButtonText(t('add_tab_property_button'))
				.setCta()
				.onClick(() => {
					new TabPropertyEditorModal(plugin.app, plugin, () => tab.display()).open();
				})
		);

	// Manage tab properties
	new Setting(containerEl)
		.setName(t('manage_tab_properties_name'))
		.setDesc(t('manage_tab_properties_desc'))
		.addButton((btn) =>
			btn
				.setButtonText(t('manage_tab_properties_button'))
				.onClick(() => {
					new TabPropertyManagerModal(plugin.app, plugin, () => tab.display()).open();
				})
		);

	// Icon copier tool
	new Setting(containerEl)
		.setName(t('icon_picker_copy_button'))
		.setDesc(t('icon_picker_copy_desc'))
		.addButton((btn) =>
			btn
				.setButtonText(t('add_button') || "Choose")
				.onClick(() => {
					new IconPickerModal(plugin.app, (selectedIcon) => {
						const tag = `[icon, ${selectedIcon}]`;
						navigator.clipboard.writeText(tag).then(() => {
							const msg = t('icon_picker_copy_notice')
								? t('icon_picker_copy_notice').replace('{tag}', tag)
								: `Copied ${tag} to clipboard!`;
							new Notice(msg);
						}).catch(() => {
							new Notice(t('clipboard_copy_failed'));
						});
					}).open();
				})
		);

	// Tab visual style selector
	new Setting(containerEl)
		.setName(t('tab_style_name'))
		.setDesc(t('tab_style_desc'))
		.addDropdown((dropdown) =>
			dropdown
				.addOption("underline", t('tab_style_underline'))
				.addOption("pill", t('tab_style_pill'))
				.addOption("minimal", t('tab_style_minimal'))
				.setValue(plugin.settings.tabStyle)
				.onChange(async (value) => {
					plugin.settings.tabStyle = value as TabStyle;
					await plugin.saveSettings();
				})
		);
}
