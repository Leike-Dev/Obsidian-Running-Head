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

		const highlightSetting = new Setting(containerEl)
			.setName(t('breadcrumb_highlight_name'))
			.setDesc(t('breadcrumb_highlight_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.breadcrumbHighlightLast)
					.onChange(async (value) => {
						plugin.settings.breadcrumbHighlightLast = value;
						await plugin.saveSettings();
					})
			);

		if (!plugin.settings.showBreadcrumb) {
			highlightSetting.settingEl.classList.add("running-head-modal-input-disabled");
		}

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

		const scrollColorSetting = new Setting(containerEl)
			.setName(t('scroll_progress_color_name'))
			.setDesc(t('scroll_progress_color_desc'))
			.addText((text) =>
				text
					.setPlaceholder("#10b981 or rgb(...)")
					.setValue(plugin.settings.scrollProgressColor)
					.onChange(async (value) => {
						plugin.settings.scrollProgressColor = value;
						await plugin.saveSettings();
						plugin.scrollProgressManager?.setupListeners();
					})
			);
		
		if (!plugin.settings.showScrollProgress) {
			scrollColorSetting.settingEl.classList.add("running-head-modal-input-disabled");
		}

		// ================================================================
}
