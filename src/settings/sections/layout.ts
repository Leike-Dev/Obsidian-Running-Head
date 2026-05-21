import { Setting, setIcon } from "obsidian";
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

		// ================================================================
		// COLLAPSIBLE TOGGLES SECTION
		// ================================================================
		interface TabWithState extends RunningHeadSettingTab { togglesExpanded?: boolean; colorsExpanded?: boolean; }
		const tabState = tab as TabWithState;
		const isTogglesOpen = tabState.togglesExpanded ?? false;

		const togglesHeader = new Setting(containerEl)
			.setName(t('toggles_section_name'))
			.setDesc(t('toggles_section_desc'));

		togglesHeader.settingEl.classList.add("running-head-dropdown-header");
		if (isTogglesOpen) {
			togglesHeader.settingEl.classList.add("is-expanded");
		}

		const toggleIconToggles = togglesHeader.controlEl.createSpan({ cls: "running-head-dropdown-icon" });
		setIcon(toggleIconToggles, isTogglesOpen ? "chevron-down" : "chevron-right");
		togglesHeader.settingEl.classList.add("running-head-clickable-header");

		const togglesContainer = containerEl.createDiv({ cls: "running-head-dropdown-container" });
		togglesContainer.style.display = isTogglesOpen ? "block" : "none";

		togglesHeader.settingEl.addEventListener("click", () => {
			const newState = !tabState.togglesExpanded;
			tabState.togglesExpanded = newState;
			togglesContainer.style.display = newState ? "block" : "none";
			toggleIconToggles.empty();
			setIcon(toggleIconToggles, newState ? "chevron-down" : "chevron-right");
			if (newState) {
				togglesHeader.settingEl.classList.add("is-expanded");
			} else {
				togglesHeader.settingEl.classList.remove("is-expanded");
			}
		});

		let highlightSetting: Setting;
		let highlightColorSetting: Setting;
		let scrollColorSetting: Setting;
		let badgeColorSetting: Setting;

		new Setting(togglesContainer)
			.setName(t('breadcrumb_toggle_name'))
			.setDesc(t('breadcrumb_toggle_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showBreadcrumb)
					.onChange(async (value) => {
						plugin.settings.showBreadcrumb = value;
						await plugin.saveSettings();
						if (highlightSetting !== undefined) highlightSetting.setDisabled(!value);
						if (highlightColorSetting !== undefined) highlightColorSetting.setDisabled(!value || !plugin.settings.breadcrumbHighlightLast);
					})
			);

		highlightSetting = new Setting(togglesContainer)
			.setName(t('breadcrumb_highlight_name'))
			.setDesc(t('breadcrumb_highlight_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.breadcrumbHighlightLast)
					.onChange(async (value) => {
						plugin.settings.breadcrumbHighlightLast = value;
						await plugin.saveSettings();
						if (highlightColorSetting !== undefined) highlightColorSetting.setDisabled(!plugin.settings.showBreadcrumb || !value);
					})
			);

		highlightSetting.setDisabled(!plugin.settings.showBreadcrumb);

		new Setting(togglesContainer)
			.setName(t('scroll_progress_bar_name'))
			.setDesc(t('scroll_progress_bar_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showScrollProgress)
					.onChange(async (value) => {
						plugin.settings.showScrollProgress = value;
						await plugin.saveSettings();
						plugin.scrollProgressManager?.setupListeners();
						if (scrollColorSetting !== undefined) scrollColorSetting.setDisabled(!value);
					})
			);

		new Setting(togglesContainer)
			.setName(t('show_last_updated_name'))
			.setDesc(t('show_last_updated_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showLastUpdated)
					.onChange(async (value) => {
						plugin.settings.showLastUpdated = value;
						await plugin.saveSettings();
						if (badgeColorSetting !== undefined) badgeColorSetting.setDisabled(!value);
					})
			);

		// ================================================================
		// COLLAPSIBLE COLORS SECTION
		// ================================================================
		const isDark = document.body.classList.contains("theme-dark");
		const defaultEmptyColor = isDark ? "#555555" : "#e0e0e0";

		const isColorsOpen = tabState.colorsExpanded ?? false;

		const colorsHeader = new Setting(containerEl)
			.setName(t('colors_section_name'))
			.setDesc(t('colors_section_desc'));

		colorsHeader.settingEl.classList.add("running-head-dropdown-header");
		if (isColorsOpen) {
			colorsHeader.settingEl.classList.add("is-expanded");
		}

		const toggleIcon = colorsHeader.controlEl.createSpan({ cls: "running-head-dropdown-icon" });
		setIcon(toggleIcon, isColorsOpen ? "chevron-down" : "chevron-right");
		colorsHeader.settingEl.classList.add("running-head-clickable-header");

		const colorsContainer = containerEl.createDiv({ cls: "running-head-dropdown-container" });
		colorsContainer.style.display = isColorsOpen ? "block" : "none";

		colorsHeader.settingEl.addEventListener("click", () => {
			const newState = !tabState.colorsExpanded;
			tabState.colorsExpanded = newState;
			colorsContainer.style.display = newState ? "block" : "none";
			toggleIcon.empty();
			setIcon(toggleIcon, newState ? "chevron-down" : "chevron-right");
			if (newState) {
				colorsHeader.settingEl.classList.add("is-expanded");
			} else {
				colorsHeader.settingEl.classList.remove("is-expanded");
			}
		});

		highlightColorSetting = new Setting(colorsContainer)
			.setName(t('breadcrumb_highlight_color_name'))
			.setDesc(t('breadcrumb_highlight_color_desc'))
			.setClass("running-head-color-setting")
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
					.setValue(plugin.settings.breadcrumbHighlightColor || defaultEmptyColor)
					.onChange(async (value) => {
						plugin.settings.breadcrumbHighlightColor = value;
						await plugin.saveSettings();
					})
			);
			
		highlightColorSetting.setDisabled(!plugin.settings.showBreadcrumb || !plugin.settings.breadcrumbHighlightLast);

		scrollColorSetting = new Setting(colorsContainer)
			.setName(t('scroll_progress_color_name'))
			.setDesc(t('scroll_progress_color_desc'))
			.setClass("running-head-color-setting")
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
					.setValue(plugin.settings.scrollProgressColor || defaultEmptyColor)
					.onChange(async (value) => {
						plugin.settings.scrollProgressColor = value;
						await plugin.saveSettings();
						plugin.scrollProgressManager?.setupListeners();
					})
			);
		
		scrollColorSetting.setDisabled(!plugin.settings.showScrollProgress);

		badgeColorSetting = new Setting(colorsContainer)
			.setName(t('badge_color_name'))
			.setDesc(t('badge_color_desc'))
			.setClass("running-head-color-setting")
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
					.setValue(plugin.settings.lastUpdatedBadgeColor || defaultEmptyColor)
					.onChange(async (value) => {
						plugin.settings.lastUpdatedBadgeColor = value;
						await plugin.saveSettings();
					})
			);
			
		badgeColorSetting.setDisabled(!plugin.settings.showLastUpdated);

		// ================================================================
}
