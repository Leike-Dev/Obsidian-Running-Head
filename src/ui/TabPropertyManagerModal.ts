import { App, Modal, Notice, setIcon } from "obsidian";
import type RunningHeadPlugin from "../main";
import { TabPropertyEditorModal } from "./TabPropertyEditorModal";
import type { TabGroup } from "../settings";
import { t } from "../lang/helpers";

/**
 * Modal that lists all configured tab groups, allowing the user
 * to edit or delete them.
 */
export class TabPropertyManagerModal extends Modal {
	private plugin: RunningHeadPlugin;
	private onSave?: () => void;

	private listContainerEl: HTMLElement | null = null;
	private countEl: HTMLElement | null = null;

	constructor(app: App, plugin: RunningHeadPlugin, onSave?: () => void) {
		super(app);
		this.plugin = plugin;
		this.onSave = onSave;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("running-head-manager-modal");

		this.setTitle(t('tab_manager_title'));

		// Count label
		this.countEl = contentEl.createDiv({ cls: "running-head-manager-count" });

		// List container
		this.listContainerEl = contentEl.createDiv({ cls: "running-head-manager-list" });

		this.renderList();
	}

	private renderList(): void {
		if (!this.listContainerEl || !this.countEl) return;
		this.listContainerEl.empty();

		if (!this.plugin.settings.tabGroups) {
			this.plugin.settings.tabGroups = [];
		}

		const groups = this.plugin.settings.tabGroups;
		this.countEl.textContent = t('tab_manager_count').replace('{count}', String(groups.length));

		if (groups.length === 0) {
			this.listContainerEl.createDiv({
				text: t('tab_manager_empty'),
				cls: "running-head-manager-empty",
			});
			return;
		}

		// Render the list of tab groups
		for (let i = 0; i < groups.length; i++) {
			if (groups[i]) {
				this.renderItem(groups[i] as TabGroup, i);
			}
		}
	}

	private renderItem(group: TabGroup, index: number): void {
		if (!this.listContainerEl) return;

		const item = this.listContainerEl.createDiv({ cls: "running-head-manager-item" });

		// Info section
		const infoSection = item.createDiv({ cls: "running-head-manager-item-info" });

		// Group icon
		const iconSpan = infoSection.createSpan({ cls: "running-head-manager-item-icon" });
		setIcon(iconSpan, "layout-list");

		// Vertical divider
		infoSection.createSpan({ text: "|", cls: "running-head-manager-item-divider" });

		// Name and tab count
		const nameRow = infoSection.createDiv({ cls: "running-head-manager-item-name" });
		const tabCount = group.tabs?.length ?? 0;
		nameRow.textContent = `${group.name} (${tabCount} ${tabCount === 1 ? 'tab' : 'tabs'})`;

		// Action buttons
		const actionsSection = item.createDiv({ cls: "running-head-manager-actions" });

		// Edit button
		const editBtn = actionsSection.createEl("button", {
			cls: "clickable-icon",
			attr: { "aria-label": t('edit_field_tooltip') || "Edit" },
		});
		setIcon(editBtn, "pencil");
		editBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.close();
			new TabPropertyEditorModal(
				this.app,
				this.plugin,
				() => {
					this.onSave?.();
					new TabPropertyManagerModal(this.app, this.plugin, this.onSave).open();
				},
				group,
				index
			).open();
		});

		// Delete button
		const deleteBtn = actionsSection.createEl("button", {
			cls: "clickable-icon",
			attr: { "aria-label": t('delete_field_tooltip') || "Delete" },
		});
		setIcon(deleteBtn, "trash");
		deleteBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.showDeleteConfirm(actionsSection, index);
		});
	}

	/**
	 * Shows an inline confirmation UI to delete a tab group.
	 */
	private showDeleteConfirm(itemEl: HTMLElement, index: number): void {
		const group = this.plugin.settings.tabGroups?.[index];
		if (!group) return;

		const confirmEl = itemEl.createDiv({ cls: "running-head-manager-confirm" });
		const confirmMsg = t('delete_confirm')
			? t('delete_confirm').replace('{name}', group.name)
			: `Delete "${group.name}"?`;

		confirmEl.createSpan({
			text: confirmMsg,
			cls: "running-head-manager-confirm-text",
		});

		const btnGroup = confirmEl.createDiv({ cls: "running-head-manager-confirm-btns" });

		const confirmBtn = btnGroup.createEl("button", {
			text: t('delete_button') || "Delete",
			cls: "mod-warning",
		});
		confirmBtn.addEventListener("click", () => {
			void (async () => {
				this.plugin.settings.tabGroups.splice(index, 1);
				await this.plugin.saveSettings();

				const deletedMsg = t('tab_property_deleted')
					? t('tab_property_deleted').replace('{name}', group.name)
					: `Tab group "${group.name}" removed.`;
				new Notice(deletedMsg);

				this.renderList();
				this.onSave?.();
			})();
		});

		const cancelBtn = btnGroup.createEl("button", { text: t('cancel_button') || "Cancel" });
		cancelBtn.addEventListener("click", () => {
			confirmEl.remove();
		});
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
