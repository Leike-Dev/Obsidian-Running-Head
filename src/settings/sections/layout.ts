import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";

export function renderLayoutSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
		// SECTION 1: LAYOUT
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_title'))
			.setHeading();

		new Setting(containerEl)
			.setName(t('title_font_size_name'))
			.setDesc(t('title_font_size_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('title_font_size_placeholder'))
					.setValue(String(plugin.settings.titleFontSize))
					.onChange(async (value) => {
						const parsed = parseFloat(value);
						plugin.settings.titleFontSize =
							isNaN(parsed) || parsed < 1 ? 3 : Math.min(parsed, 10);
						await plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('header_font_size_name'))
			.setDesc(t('header_font_size_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('header_font_size_placeholder'))
					.setValue(String(plugin.settings.badgeFontSize))
					.onChange(async (value) => {
						const parsed = parseFloat(value);
						plugin.settings.badgeFontSize =
							isNaN(parsed) || parsed < 0.5 ? 0.75 : Math.min(parsed, 2);
						await plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('layout_style_name'))
			.setDesc(t('layout_style_desc'))
			.addDropdown((dropdown) => {
				dropdown
					.addOption("wiki", t('layout_style_wiki'))
					.addOption("blog", t('layout_style_blog'))
					.setValue(plugin.settings.layoutStyle)
					.onChange(async (value: "wiki" | "blog") => {
						plugin.settings.layoutStyle = value;
						await plugin.saveSettings();
					});
			});

		new Setting(containerEl)
			.setName(t('breadcrumb_toggle_name'))
			.setDesc(t('breadcrumb_toggle_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showBreadcrumb)
					.onChange(async (value) => {
						plugin.settings.showBreadcrumb = value;
						await plugin.saveSettings();
						tab.display();
					})
			);

		new Setting(containerEl)
			.setName(t('scroll_progress_bar_name'))
			.setDesc(t('scroll_progress_bar_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showScrollProgress)
					.onChange(async (value) => {
						plugin.settings.showScrollProgress = value;
						await plugin.saveSettings();
						plugin.scrollProgressManager?.setupListeners();
						tab.display();
					})
			);

		new Setting(containerEl)
			.setName(t('show_last_updated_name'))
			.setDesc(t('show_last_updated_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showLastUpdated)
					.onChange(async (value) => {
						plugin.settings.showLastUpdated = value;
						await plugin.saveSettings();
					})
			);

		// ================================================================
}
