import { App, PluginSettingTab, Setting, sanitizeHTMLToDom } from "obsidian";
import type RunningHeadPlugin from "./main";
import { FieldEditorModal } from "./ui/FieldEditorModal";
import { FieldManagerModal } from "./ui/FieldManagerModal";
import { BasesIconManagerModal } from "./ui/BasesIconManagerModal";
import { BasesIconEditorModal } from "./ui/BasesIconEditorModal";
import { t } from "./lang/helpers";

/**
 * A user-defined frontmatter field to render in the metadata header.
 * Display type is auto-detected from the value content.
 */
export interface BasesIcon {
	property: string;
	icon: string;
}

export interface CustomField {
	/** Frontmatter key to read (e.g. "author", "status") */
	field: string;
	/** Display label shown before the value (optional) */
	label: string;
	/** Whether to display the label in the note */
	showLabel: boolean;
	/** Position relative to the note title */
	position: "above" | "below";
	/** Optional folder path where this field should be hidden (e.g. "Base/Windows") */
	excludedFolder: string;
}

/**
 * Settings interface for the RunningHead plugin.
 * Controls frontmatter field names, locale, and display preferences.
 */
export interface RunningHeadSettings {
	/** Frontmatter field name for the publication date */
	dateField: string;
	/** Frontmatter field name for the last-updated date */
	lastUpdatedField: string;
	/** Locale string for date formatting (e.g. "en-US", "pt-BR") */
	dateLocale: string;
	/** Whether to use abbreviated date format (e.g. "Aug 6, 2024" instead of "August 6, 2024") */
	useShortDate: boolean;
	/** Whether to show reading time next to the date */
	showReadingTime: boolean;
	/** Average words per minute for reading time calculation */
	wordsPerMinute: number;
	/** Whether to show the "Last Updated" badge */
	showLastUpdated: boolean;
	/** Layout style: "wiki" (separated context) or "blog" (all together below title) */
	layoutStyle: "wiki" | "blog";
	/** Title font size in em units */
	titleFontSize: number;
	/** Font size of the metadata header (date + badge) in rem units */
	badgeFontSize: number;
	/** User-defined custom fields to display */
	customFields: CustomField[];
	/** Custom date format string using Moment.js syntax */
	customDateFormat: string;
	/** Custom icons for Bases plugin table headers */
	basesIcons: BasesIcon[];
	/** Whether to show the folder breadcrumb above the title */
	showBreadcrumb: boolean;
	/** Whether to highlight the last breadcrumb segment with the accent color */
	breadcrumbHighlightLast: boolean;
}

export const DEFAULT_SETTINGS: RunningHeadSettings = {
	dateField: "date",
	lastUpdatedField: "updated",
	dateLocale: "en-US",
	useShortDate: false,
	showReadingTime: true,
	wordsPerMinute: 200,
	showLastUpdated: true,
	layoutStyle: "blog",
	titleFontSize: 3,
	badgeFontSize: 0.75,
	customFields: [],
	customDateFormat: "",
	basesIcons: [],
	showBreadcrumb: false,
	breadcrumbHighlightLast: false,
};

/**
 * Settings tab for the RunningHead plugin.
 * Provides UI controls for all configurable options.
 */
export class RunningHeadSettingTab extends PluginSettingTab {
	plugin: RunningHeadPlugin;

	constructor(app: App, plugin: RunningHeadPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// ================================================================
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
					.setValue(String(this.plugin.settings.titleFontSize))
					.onChange(async (value) => {
						const parsed = parseFloat(value);
						this.plugin.settings.titleFontSize =
							isNaN(parsed) || parsed < 1 ? 3 : Math.min(parsed, 10);
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('header_font_size_name'))
			.setDesc(t('header_font_size_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('header_font_size_placeholder'))
					.setValue(String(this.plugin.settings.badgeFontSize))
					.onChange(async (value) => {
						const parsed = parseFloat(value);
						this.plugin.settings.badgeFontSize =
							isNaN(parsed) || parsed < 0.5 ? 0.75 : Math.min(parsed, 2);
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('breadcrumb_toggle_name'))
			.setDesc(t('breadcrumb_toggle_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showBreadcrumb)
					.onChange(async (value) => {
						this.plugin.settings.showBreadcrumb = value;
						await this.plugin.saveSettings();
						this.display();
					})
			);

		const highlightSetting = new Setting(containerEl)
			.setName(t('breadcrumb_highlight_name'))
			.setDesc(t('breadcrumb_highlight_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.breadcrumbHighlightLast)
					.onChange(async (value) => {
						this.plugin.settings.breadcrumbHighlightLast = value;
						await this.plugin.saveSettings();
					})
			);

		if (!this.plugin.settings.showBreadcrumb) {
			highlightSetting.settingEl.classList.add("running-head-modal-input-disabled");
		}

		// ================================================================
		// SECTION 2: FRONTMATTER PROPERTIES
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_frontmatter_properties'))
			.setHeading();

		new Setting(containerEl)
			.setName(t('date_field_name'))
			.setDesc(t('date_field_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('date_field_placeholder'))
					.setValue(this.plugin.settings.dateField)
					.onChange(async (value) => {
						this.plugin.settings.dateField = value.trim() || "date";
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('last_updated_field_name'))
			.setDesc(t('last_updated_field_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('last_updated_field_placeholder'))
					.setValue(this.plugin.settings.lastUpdatedField)
					.onChange(async (value) => {
						this.plugin.settings.lastUpdatedField = value.trim() || "updated";
						await this.plugin.saveSettings();
					})
			);

		// ================================================================
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
					.setValue(this.plugin.settings.dateLocale)
					.onChange(async (value) => {
						this.plugin.settings.dateLocale = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('short_date_name'))
			.setDesc(t('short_date_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.useShortDate)
					.onChange(async (value) => {
						this.plugin.settings.useShortDate = value;
						await this.plugin.saveSettings();
					})
			);

		const customDateDesc = document.createDocumentFragment();
		const customDateDiv = document.createElement("div");
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
					.setValue(this.plugin.settings.customDateFormat)
					.onChange(async (value) => {
						this.plugin.settings.customDateFormat = value.trim();
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('show_reading_time_name'))
			.setDesc(t('show_reading_time_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showReadingTime)
					.onChange(async (value) => {
						this.plugin.settings.showReadingTime = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('wpm_name'))
			.setDesc(t('wpm_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('wpm_placeholder'))
					.setValue(String(this.plugin.settings.wordsPerMinute))
					.onChange(async (value) => {
						const parsed = parseInt(value, 10);
						this.plugin.settings.wordsPerMinute =
							isNaN(parsed) || parsed <= 0 ? 200 : parsed;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('show_last_updated_name'))
			.setDesc(t('show_last_updated_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.showLastUpdated)
					.onChange(async (value) => {
						this.plugin.settings.showLastUpdated = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('layout_style_name'))
			.setDesc(t('layout_style_desc'))
			.addDropdown((dropdown) => {
				dropdown
					.addOption("wiki", t('layout_style_wiki'))
					.addOption("blog", t('layout_style_blog'))
					.setValue(this.plugin.settings.layoutStyle)
					.onChange(async (value: "wiki" | "blog") => {
						this.plugin.settings.layoutStyle = value;
						await this.plugin.saveSettings();
					});
			});



		// ================================================================
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
						new FieldEditorModal(this.app, this.plugin, () => this.display()).open();
					})
			);

		new Setting(containerEl)
			.setName(t('manage_fields_name'))
			.setDesc(t('manage_fields_desc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('manage_fields_button'))
					.onClick(() => {
						new FieldManagerModal(this.app, this.plugin, () => this.display()).open();
					})
			);

		// ================================================================
		// SECTION 4: BASES ICONS
		// ================================================================
		new Setting(containerEl)
			.setName(t('section_bases_icons'))
			.setHeading();
			
		const noticeEl = containerEl.createEl("div", {
			cls: "running-head-bases-notice"
		});
		noticeEl.createEl("p", {
			cls: "warning-text",
			text: t('bases_icons_notice')
		});
		new Setting(containerEl)
			.setName(t('add_bases_icon_name'))
			.setDesc(t('add_bases_icon_desc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('add_bases_icon_button'))
					.setCta()
					.onClick(() => {
						new BasesIconEditorModal(this.app, this.plugin, () => this.display()).open();
					})
			);
			
		new Setting(containerEl)
			.setName(t('manage_bases_icons_name'))
			.setDesc(t('manage_bases_icons_desc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('manage_bases_icons_button'))
					.onClick(() => {
						new BasesIconManagerModal(this.app, this.plugin, () => this.display()).open();
					})
			);
	}
}

