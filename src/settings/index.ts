import { App, PluginSettingTab } from "obsidian";
import type RunningHeadPlugin from "../main";
export * from "./types";
import { renderLayoutSection } from "./sections/layout";
import { renderFrontmatterSection } from "./sections/frontmatter";
import { renderDateSection } from "./sections/date-reading";
import { renderCustomFieldsSection } from "./sections/custom-fields";

import { renderDataManagementSection } from "./sections/data-management";

export class RunningHeadSettingTab extends PluginSettingTab {
	plugin: RunningHeadPlugin;

	constructor(app: App, plugin: RunningHeadPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		renderFrontmatterSection(containerEl, this.plugin, this);
		renderLayoutSection(containerEl, this.plugin, this);
		renderDateSection(containerEl, this.plugin, this);
		renderCustomFieldsSection(containerEl, this.plugin, this);

		renderDataManagementSection(containerEl, this.plugin, this);
	}
}
