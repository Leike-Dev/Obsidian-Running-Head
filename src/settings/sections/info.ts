import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";
import { NoticesModal, getActiveNotices } from "../../ui/NoticesModal";

export function renderNoticesSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
	// NOTICES
	const noticesSetting = new Setting(containerEl)
		.setName(t('notices_title'))
		.setDesc(t('notices_desc'))
		.addButton((button) =>
			button
				.setButtonText(t('notices_button'))
				.onClick(() => {
					new NoticesModal(plugin.app, plugin).open();
				})
		);

	// Get notices count logic
	const renderNoticesBadge = () => {
		const existingBadge = noticesSetting.controlEl.querySelector(".running-head-notices-badge-container");
		if (existingBadge) {
			existingBadge.remove();
		}

		const activeNoticesCount = getActiveNotices().length;

		if (activeNoticesCount > 0) {
			const badgeContainer = noticesSetting.controlEl.createDiv({ cls: "running-head-notices-badge-container", prepend: true });
			badgeContainer.createSpan({ text: activeNoticesCount.toString(), cls: "running-head-notices-badge" });
		}
	};

	renderNoticesBadge();
}
