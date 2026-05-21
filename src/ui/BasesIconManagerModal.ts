import { App, Modal, Notice, setIcon } from "obsidian";
import type RunningHeadPlugin from "../main";
import { BasesIconEditorModal } from "./BasesIconEditorModal";
import type { BasesIcon } from "../settings";
import { t } from "../lang/helpers";

/**
 * Modal that lists all configured custom bases icons, allowing the user
 * to edit or delete them.
 */
export class BasesIconManagerModal extends Modal {
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

		this.setTitle(t('bases_icons_title'));

		// Count label
		this.countEl = contentEl.createDiv({ cls: "running-head-manager-count" });

		// List container
		this.listContainerEl = contentEl.createDiv({ cls: "running-head-manager-list" });

		this.renderList();
	}

	private renderList(): void {
		if (!this.listContainerEl || !this.countEl) return;
		this.listContainerEl.empty();

		if (!this.plugin.settings.basesIcons) {
			this.plugin.settings.basesIcons = [];
		}

		const icons = this.plugin.settings.basesIcons;
		this.countEl.textContent = t('existing_bases_icons').replace('{count}', String(icons.length));

		if (icons.length === 0) {
			this.listContainerEl.createDiv({
				text: t('no_bases_icons'),
				cls: "running-head-manager-empty",
			});
			return;
		}

		// Render the list of icons
		for (let i = 0; i < icons.length; i++) {
			if (icons[i]) {
				this.renderItem(icons[i] as BasesIcon, i);
			}
		}
	}

	private renderItem(iconConfig: BasesIcon, index: number): void {
		if (!this.listContainerEl) return;

		const item = this.listContainerEl.createDiv({ cls: "running-head-manager-item" });

		// Info section
		const infoSection = item.createDiv({ cls: "running-head-manager-item-info" });
		
		// Icon on the left
		const iconSpan = infoSection.createSpan({ cls: "running-head-manager-item-icon" });
		setIcon(iconSpan, iconConfig.icon);

		// Vertical divider
		const divider = infoSection.createSpan({ text: "|", cls: "running-head-manager-item-divider" });
		
		// Name
		const nameRow = infoSection.createDiv({ cls: "running-head-manager-item-name" });
		nameRow.textContent = iconConfig.property;

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
			new BasesIconEditorModal(
				this.app,
				this.plugin,
				() => {
					this.onSave?.();
					new BasesIconManagerModal(this.app, this.plugin, this.onSave).open();
				},
				iconConfig,
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
	 * Shows an inline confirmation UI to delete a custom icon.
	 */
	private showDeleteConfirm(itemEl: HTMLElement, index: number): void {
		const iconConfig = this.plugin.settings.basesIcons?.[index];
		if (!iconConfig) return;

		const confirmEl = itemEl.createDiv({ cls: "running-head-manager-confirm" });
		const confirmMsg = t('delete_confirm')
			? t('delete_confirm').replace('{name}', iconConfig.property)
			: `Delete "${iconConfig.property}"?`;
			
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
				this.plugin.settings.basesIcons.splice(index, 1);
				await this.plugin.saveSettings();
				
				const deletedMsg = t('bases_icon_deleted')
					? t('bases_icon_deleted').replace('{property}', iconConfig.property)
					: `Icon for "${iconConfig.property}" deleted.`;
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
