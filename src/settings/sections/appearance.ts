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
					})
			);

		if (!plugin.settings.showBreadcrumb) {
			highlightSetting.settingEl.classList.add("running-head-modal-input-disabled");
		}

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
