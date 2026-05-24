import { App, Modal, Notice, setIcon } from "obsidian";
import type RunningHeadPlugin from "../main";
import { TabPropertyEditorModal } from "./TabPropertyEditorModal";
import type { TabPropertyConfig } from "../settings";
import { t } from "../lang/helpers";

/**
 * Modal that lists all configured custom tab properties, allowing the user
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

		if (!this.plugin.settings.tabsProperties) {
			this.plugin.settings.tabsProperties = [];
		}

		const properties = this.plugin.settings.tabsProperties;
		this.countEl.textContent = t('tab_manager_count').replace('{count}', String(properties.length));

		if (properties.length === 0) {
			this.listContainerEl.createDiv({
				text: t('tab_manager_empty'),
				cls: "running-head-manager-empty",
			});
			return;
		}

		// Render the list of tab properties
		for (let i = 0; i < properties.length; i++) {
			if (properties[i]) {
				this.renderItem(properties[i] as TabPropertyConfig, i);
			}
		}
	}

	private renderItem(tabConfig: TabPropertyConfig, index: number): void {
		if (!this.listContainerEl) return;

		const item = this.listContainerEl.createDiv({ cls: "running-head-manager-item" });

		// Info section
		const infoSection = item.createDiv({ cls: "running-head-manager-item-info" });
		
		// Icon indicating status (show icon or not)
		const iconSpan = infoSection.createSpan({ cls: "running-head-manager-item-icon" });
		setIcon(iconSpan, tabConfig.showIcon ? "eye" : "eye-off");

		// Vertical divider
		infoSection.createSpan({ text: "|", cls: "running-head-manager-item-divider" });
		
		// Name and ordering
		const nameRow = infoSection.createDiv({ cls: "running-head-manager-item-name" });
		nameRow.textContent = `${tabConfig.property} (Order: ${tabConfig.order})`;

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
				tabConfig,
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
	 * Shows an inline confirmation UI to delete a custom tab property.
	 */
	private showDeleteConfirm(itemEl: HTMLElement, index: number): void {
		const tabConfig = this.plugin.settings.tabsProperties?.[index];
		if (!tabConfig) return;

		const confirmEl = itemEl.createDiv({ cls: "running-head-manager-confirm" });
		const confirmMsg = t('delete_confirm')
			? t('delete_confirm').replace('{name}', tabConfig.property)
			: `Delete "${tabConfig.property}"?`;
			
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
				this.plugin.settings.tabsProperties.splice(index, 1);
				await this.plugin.saveSettings();
				
				const deletedMsg = t('tab_property_deleted')
					? t('tab_property_deleted').replace('{name}', tabConfig.property)
					: `Tab property "${tabConfig.property}" removed.`;
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
