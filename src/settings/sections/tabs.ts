import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import type { TabStyle } from "../types";
import { t } from "../../lang/helpers";
import { TabPropertyManagerModal } from "../../ui/TabPropertyManagerModal";
import { TabPropertyEditorModal } from "../../ui/TabPropertyEditorModal";

export function renderTabsSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
	// SECTION: TABS NAVIGATION
	// ================================================================
	new Setting(containerEl)
		.setName(t('section_tabs'))
		.setHeading();

	// Global frontmatter property name
	new Setting(containerEl)
		.setName(t('tab_property_global_name'))
		.setDesc(t('tab_property_global_desc'))
		.addText((text) =>
			text
				.setPlaceholder(t('tab_property_placeholder'))
				.setValue(plugin.settings.tabsPropertyName)
				.onChange(async (value) => {
					plugin.settings.tabsPropertyName = value.trim();
					await plugin.saveSettings();
				})
		);

	// New tab group
	new Setting(containerEl)
		.setName(t('add_tab_property_name'))
		.setDesc(t('add_tab_property_desc'))
		.addButton((btn) =>
			btn
				.setButtonText(t('tab_group_new_button'))
				.setCta()
				.onClick(() => {
					new TabPropertyEditorModal(plugin.app, plugin, () => tab.display()).open();
				})
		);

	// Manage tab groups
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
