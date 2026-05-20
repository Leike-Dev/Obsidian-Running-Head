import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";

export function renderAppearanceSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
		// SECTION: APPEARANCE
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_appearance'))
			.setHeading();

		const highlightSetting = new Setting(containerEl)
			.setName(t('breadcrumb_highlight_name'))
			.setDesc(t('breadcrumb_highlight_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.breadcrumbHighlightLast)
					.onChange(async (value) => {
						plugin.settings.breadcrumbHighlightLast = value;
						await plugin.saveSettings();
						tab.display();
					})
			);

		highlightSetting.setDisabled(!plugin.settings.showBreadcrumb);

		const highlightColorSetting = new Setting(containerEl)
			.setName(t('breadcrumb_highlight_color_name'))
			.setDesc(t('breadcrumb_highlight_color_desc'))
			.addExtraButton((btn) =>
				btn
					.setIcon("reset")
					.setTooltip("Reset")
					.onClick(async () => {
						plugin.settings.breadcrumbHighlightColor = "";
						await plugin.saveSettings();
						tab.display();
					})
			)
			.addColorPicker((color) =>
				color
					.setValue(plugin.settings.breadcrumbHighlightColor)
					.onChange(async (value) => {
						plugin.settings.breadcrumbHighlightColor = value;
						await plugin.saveSettings();
					})
			);
			
		highlightColorSetting.setDisabled(!plugin.settings.showBreadcrumb || !plugin.settings.breadcrumbHighlightLast);

		const scrollColorSetting = new Setting(containerEl)
			.setName(t('scroll_progress_color_name'))
			.setDesc(t('scroll_progress_color_desc'))
			.addExtraButton((btn) =>
				btn
					.setIcon("reset")
					.setTooltip("Reset")
					.onClick(async () => {
						plugin.settings.scrollProgressColor = "";
						await plugin.saveSettings();
						plugin.scrollProgressManager?.setupListeners();
						tab.display();
					})
			)
			.addColorPicker((color) =>
				color
					.setValue(plugin.settings.scrollProgressColor)
					.onChange(async (value) => {
						plugin.settings.scrollProgressColor = value;
						await plugin.saveSettings();
						plugin.scrollProgressManager?.setupListeners();
					})
			);
		
		scrollColorSetting.setDisabled(!plugin.settings.showScrollProgress);

		const badgeColorSetting = new Setting(containerEl)
			.setName(t('badge_color_name'))
			.setDesc(t('badge_color_desc'))
			.addExtraButton((btn) =>
				btn
					.setIcon("reset")
					.setTooltip("Reset")
					.onClick(async () => {
						plugin.settings.lastUpdatedBadgeColor = "";
						await plugin.saveSettings();
						tab.display();
					})
			)
			.addColorPicker((color) =>
				color
					.setValue(plugin.settings.lastUpdatedBadgeColor)
					.onChange(async (value) => {
						plugin.settings.lastUpdatedBadgeColor = value;
						await plugin.saveSettings();
					})
			);
			
		badgeColorSetting.setDisabled(!plugin.settings.showLastUpdated);

		// ================================================================
}
