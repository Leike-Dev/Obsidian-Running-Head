import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";
import { BasesIconManagerModal } from "../../ui/BasesIconManagerModal";
import { BasesIconEditorModal } from "../../ui/BasesIconEditorModal";

export function renderBasesIconsSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
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
						new BasesIconEditorModal(plugin.app, plugin, () => tab.display()).open();
					})
			);
			
		new Setting(containerEl)
			.setName(t('manage_bases_icons_name'))
			.setDesc(t('manage_bases_icons_desc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('manage_bases_icons_button'))
					.onClick(() => {
						new BasesIconManagerModal(plugin.app, plugin, () => tab.display()).open();
					})
			);
	}
