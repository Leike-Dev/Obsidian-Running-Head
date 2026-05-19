import { Setting, sanitizeHTMLToDom } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";

export function renderDateSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
		// SECTION 3: DATE & READING
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_date'))
			.setHeading();

		new Setting(containerEl)
			.setName(t('date_locale_name'))
			.setDesc(t('date_locale_desc'))
			.addDropdown((dropdown) =>
				dropdown
					.addOption("en-US", t('locale_en_us'))
					.addOption("en-GB", t('locale_en_gb'))
					.addOption("pt-BR", t('locale_pt_br'))
					.addOption("pt-PT", t('locale_pt_pt'))
					.addOption("es-ES", t('locale_es'))
					.addOption("fr-FR", t('locale_fr'))
					.addOption("de-DE", t('locale_de'))
					.addOption("it-IT", t('locale_it'))
					.addOption("ja-JP", t('locale_ja'))
					.addOption("zh-CN", t('locale_zh_cn'))
					.addOption("zh-TW", t('locale_zh_tw'))
					.addOption("ko-KR", t('locale_ko'))
					.addOption("ru-RU", t('locale_ru'))
					.addOption("ar-SA", t('locale_ar'))
					.addOption("hi-IN", t('locale_hi'))
					.addOption("nl-NL", t('locale_nl'))
					.addOption("sv-SE", t('locale_sv'))
					.addOption("pl-PL", t('locale_pl'))
					.addOption("tr-TR", t('locale_tr'))
					.setValue(plugin.settings.dateLocale)
					.onChange(async (value) => {
						plugin.settings.dateLocale = value;
						await plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('short_date_name'))
			.setDesc(t('short_date_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.useShortDate)
					.onChange(async (value) => {
						plugin.settings.useShortDate = value;
						await plugin.saveSettings();
					})
			);

		const customDateDesc = activeDocument.createDocumentFragment();
		const customDateDiv = activeDocument.createElement("div");
		customDateDiv.appendChild(sanitizeHTMLToDom(t('custom_date_format_desc')));
		while (customDateDiv.firstChild) {
			customDateDesc.appendChild(customDateDiv.firstChild);
		}

		new Setting(containerEl)
			.setName(t('custom_date_format_name'))
			.setDesc(customDateDesc)
			.addText((text) =>
				text
					.setPlaceholder(t('custom_date_format_placeholder'))
					.setValue(plugin.settings.customDateFormat)
					.onChange(async (value) => {
						plugin.settings.customDateFormat = value.trim();
						await plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('show_reading_time_name'))
			.setDesc(t('show_reading_time_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(plugin.settings.showReadingTime)
					.onChange(async (value) => {
						plugin.settings.showReadingTime = value;
						await plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('wpm_name'))
			.setDesc(t('wpm_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('wpm_placeholder'))
					.setValue(String(plugin.settings.wordsPerMinute))
					.onChange(async (value) => {
						const parsed = parseInt(value, 10);
						plugin.settings.wordsPerMinute =
							isNaN(parsed) || parsed <= 0 ? 200 : parsed;
						await plugin.saveSettings();
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
}
