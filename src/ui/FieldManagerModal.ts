import { App, Modal, Notice, setIcon } from "obsidian";
import type RunningHeadPlugin from "../main";
import type { CustomField } from "../settings";
import { FieldEditorModal } from "./FieldEditorModal";
import { t } from "../lang/helpers";

/**
 * Modal for managing existing custom fields.
 * Displays a list grouped by position with edit and delete capabilities.
 */
export class FieldManagerModal extends Modal {
	private plugin: RunningHeadPlugin;
	private onClose_cb?: () => void;

	private listContainerEl: HTMLElement | null = null;
	private countEl: HTMLElement | null = null;

	constructor(app: App, plugin: RunningHeadPlugin, onClose?: () => void) {
		super(app);
		this.plugin = plugin;
		this.onClose_cb = onClose;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass("running-head-manager-modal");

		this.setTitle(t('field_manager_title'));

		// Count label
		this.countEl = contentEl.createDiv({ cls: "running-head-manager-count" });

		// List container
		this.listContainerEl = contentEl.createDiv({ cls: "running-head-manager-list" });

		this.renderList();
	}

	/**
	 * Render the field list grouped by position.
	 */
	private renderList(): void {
		if (!this.listContainerEl || !this.countEl) return;
		this.listContainerEl.empty();

		const fields = this.plugin.settings.customFields;
		this.countEl.textContent = t('field_manager_count').replace('{count}', String(fields.length));

		if (fields.length === 0) {
			this.listContainerEl.createDiv({
				text: t('field_manager_empty'),
				cls: "running-head-manager-empty",
			});
			return;
		}

		// Group by position
		const aboveFields = fields
			.map((f, i) => ({ field: f, index: i }))
			.filter((e) => e.field.position === "above");
		const belowFields = fields
			.map((f, i) => ({ field: f, index: i }))
			.filter((e) => e.field.position === "below");

		if (aboveFields.length > 0) {
			this.listContainerEl.createDiv({
				cls: "running-head-manager-group-header",
				text: t('field_manager_group_above'),
			});
			for (const entry of aboveFields) {
				this.renderItem(entry.field, entry.index);
			}
		}

		if (belowFields.length > 0) {
			this.listContainerEl.createDiv({
				cls: "running-head-manager-group-header",
				text: t('field_manager_group_below'),
			});
			for (const entry of belowFields) {
				this.renderItem(entry.field, entry.index);
			}
		}
	}

	/**
	 * Render a single field item card.
	 */
	private renderItem(field: CustomField, index: number): void {
		if (!this.listContainerEl) return;

		const item = this.listContainerEl.createDiv({ cls: "running-head-manager-item" });

		// Info section
		const infoSection = item.createDiv({ cls: "running-head-manager-item-info" });

		// Text block
		const textBlock = infoSection.createDiv({ cls: "running-head-manager-item-text" });

		// Primary: show label if set, otherwise show key
		const nameRow = textBlock.createDiv({ cls: "running-head-manager-item-name" });
		nameRow.textContent = field.label || field.field;

		// Secondary: show key only when label is different from key
		if (field.label && field.label !== field.field) {
			const metaRow = textBlock.createDiv({ cls: "running-head-manager-meta" });
			metaRow.textContent = field.field;
		}

		// Tertiary: show excluded folder when configured
		if (field.excludedFolder) {
			const scopeRow = textBlock.createDiv({ cls: "running-head-manager-meta" });
			const foldersList = field.excludedFolder.split(",").map(f => f.trim()).filter(f => f.length > 0);
			if (foldersList.length > 1) {
				scopeRow.textContent = `${t('field_folder_scope_excluded_label')}: ${foldersList[0]} (+${foldersList.length - 1})`;
			} else {
				scopeRow.textContent = `${t('field_folder_scope_excluded_label')}: ${field.excludedFolder}`;
			}
		}

		// Action buttons
		const actionsSection = item.createDiv({ cls: "running-head-manager-actions" });

		// Edit button
		const editBtn = actionsSection.createEl("button", {
			cls: "clickable-icon",
			attr: { "aria-label": t('edit_field_tooltip') },
		});
		setIcon(editBtn, "pencil");
		editBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.close();
			const original = this.plugin.settings.customFields[index];
			new FieldEditorModal(
				this.app,
				this.plugin,
				() => {
					this.onClose_cb?.();
					new FieldManagerModal(this.app, this.plugin, this.onClose_cb).open();
				},
				original,
				index
			).open();
		});

		// Delete button
		const deleteBtn = actionsSection.createEl("button", {
			cls: "clickable-icon",
			attr: { "aria-label": t('delete_field_tooltip') },
		});
		setIcon(deleteBtn, "trash-2");
		deleteBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			this.showDeleteConfirm(item, index);
		});
	}

	/**
	 * Show inline delete confirmation replacing the item content.
	 */
	private showDeleteConfirm(itemEl: HTMLElement, index: number): void {
		const field = this.plugin.settings.customFields[index];
		if (!field) return;

		const confirmEl = itemEl.createDiv({ cls: "running-head-manager-confirm" });
		confirmEl.createSpan({
			text: t('delete_confirm').replace('{name}', field.label || field.field),
			cls: "running-head-manager-confirm-text",
		});

		const btnGroup = confirmEl.createDiv({ cls: "running-head-manager-confirm-btns" });

		const confirmBtn = btnGroup.createEl("button", {
			text: t('delete_button'),
			cls: "mod-warning",
		});
		confirmBtn.addEventListener("click", () => {
			void (async () => {
				this.plugin.settings.customFields.splice(index, 1);
				await this.plugin.saveSettings();
				new Notice(t('field_deleted').replace('{name}', field.label || field.field));
				this.renderList();
			})();
		});

		const cancelBtn = btnGroup.createEl("button", { text: t('cancel_button') });
		cancelBtn.addEventListener("click", () => {
			confirmEl.remove();
		});
	}

	onClose(): void {
		this.contentEl.empty();
		this.onClose_cb?.();
	}
}
