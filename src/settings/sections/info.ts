import { Setting } from "obsidian";
import type RunningHeadPlugin from "../../main";
import type { RunningHeadSettingTab } from "../index";
import { t } from "../../lang/helpers";
import { ChangelogModal } from "../../ui/ChangelogModal";
import { NoticesModal } from "../../ui/NoticesModal";

export function renderInfoSection(containerEl: HTMLElement, plugin: RunningHeadPlugin, tab: RunningHeadSettingTab) {
	// ================================================================
	// SECTION: INFORMATION & UPDATES
	// ================================================================
	new Setting(containerEl)
		.setName(t('section_info_title'))
		.setHeading();

	// CHANGELOG
	const changelogSetting = new Setting(containerEl)
		.setName(t('changelog_title'))
		.setDesc(t('changelog_desc'))
		.addButton((button) =>
			button
				.setButtonText(t('changelog_button'))
				.onClick(() => {
					new ChangelogModal(plugin.app, plugin.manifest, () => {
						tab.display();
					}).open();
				})
		);

	if (plugin.settings.lastSeenVersion !== plugin.manifest.version) {
		const nameEl = changelogSetting.nameEl;
		nameEl.setText(t('changelog_title') + " ");
		nameEl.createSpan({ text: t('changelog_badge_new'), cls: "running-head-changelog-badge-new" });
	}

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

		// For now we don't have notices, so count is 0
		const activeNoticesCount = 0;

		if (activeNoticesCount > 0) {
			const badgeContainer = activeDocument.createElement("div");
			badgeContainer.addClass("running-head-notices-badge-container");
			badgeContainer.createSpan({ text: activeNoticesCount.toString(), cls: "running-head-notices-badge" });
			noticesSetting.controlEl.prepend(badgeContainer);
		}
	};

	renderNoticesBadge();
}
