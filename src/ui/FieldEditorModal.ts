import { App, Modal, Notice, Setting, setIcon, Platform } from "obsidian";
import type RunningHeadPlugin from "../main";
import type { CustomField } from "../settings";
import { FolderSuggest } from "./FolderSuggest";
import { t } from "../lang/helpers";

/**
 * Modal for creating or editing a custom field.
 * In create mode a blank form is presented. In edit mode the form is
 * pre-populated and saving updates the existing field in-place.
 */
export class FieldEditorModal extends Modal {
	private plugin: RunningHeadPlugin;
	private onSave?: () => void;

	/** When editing, the index of the field being modified. */
	private editIndex: number | null = null;

	// --- Form state ---
	private fieldKey = "";
	private fieldLabel = "";
	private fieldShowLabel = false;
	private fieldPosition: "above" | "below" = "below";
	private fieldExcludedFolder = "";

	constructor(
		app: App,
		plugin: RunningHeadPlugin,
		onSave?: () => void,
		editField?: CustomField,
		editIndex?: number
	) {
		super(app);
		this.plugin = plugin;
		this.onSave = onSave;

		if (editField && editIndex !== undefined) {
			this.editIndex = editIndex;
			this.fieldKey = editField.field;
			this.fieldLabel = editField.label;
			this.fieldShowLabel = editField.showLabel ?? false;
			this.fieldPosition = editField.position;
			this.fieldExcludedFolder = editField.excludedFolder ?? "";
		}
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.empty();

		this.setTitle(this.editIndex !== null ? t('field_editor_title_edit') : t('field_editor_title_add'));
		if (!Platform.isMobile) {
			this.modalEl.addClass("mod-confirmation");
		}

		// ============================================================
		// GROUP 1: IDENTIDADE
		// ============================================================

		// --- Frontmatter key ---
		new Setting(contentEl)
			.setName(t('field_key_name'))
			.setDesc(t('field_key_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('field_key_placeholder'))
					.setValue(this.fieldKey)
					.onChange((value) => {
						this.fieldKey = value;
					})
			);

		// --- Label ---
		const labelSetting = new Setting(contentEl)
			.setName(t('field_label_name'))
			.setDesc(t('field_label_desc'))
			.addText((text) =>
				text
					.setPlaceholder(t('field_label_placeholder'))
					.setValue(this.fieldLabel)
					.onChange((value) => {
						this.fieldLabel = value;
					})
			);

		// Initial state for label input
		const updateLabelState = (show: boolean) => {
			if (show) {
				labelSetting.settingEl.classList.remove("running-head-modal-input-disabled");
			} else {
				labelSetting.settingEl.classList.add("running-head-modal-input-disabled");
			}
		};
		updateLabelState(this.fieldShowLabel);

		// --- Show Label Toggle ---
		new Setting(contentEl)
			.setName(t('field_show_label_name'))
			.setDesc(t('field_show_label_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.fieldShowLabel)
					.onChange((value) => {
						this.fieldShowLabel = value;
						updateLabelState(value);
					})
			);

		// ============================================================
		// GROUP 2: COMPORTAMENTO
		// ============================================================

		// --- Position ---
		new Setting(contentEl)
			.setName(t('field_position_name'))
			.setDesc(t('field_position_desc'))
			.addDropdown((dropdown) =>
				dropdown
					.addOption("below", t('field_position_below'))
					.addOption("above", t('field_position_above'))
					.setValue(this.fieldPosition)
					.onChange((value) => {
						this.fieldPosition = value as "above" | "below";
					})
			);
			
		// --- Excluded folder ---
		new Setting(contentEl)
			.setName(t('field_folder_scope_name'))
			.setDesc(t('field_folder_scope_desc'));
			
		const listContainer = contentEl.createDiv({ cls: "running-head-folder-pills" });

		const renderFolders = () => {
			listContainer.empty();
			const folders = this.fieldExcludedFolder
				.split(',')
				.map(f => f.trim())
				.filter(f => f.length > 0);

			if (folders.length === 0) {
				listContainer.classList.add("running-head-hidden");
			} else {
				listContainer.classList.remove("running-head-hidden");
				for (const folder of folders) {
					const item = listContainer.createDiv({ cls: "running-head-folder-pill" });
					
					const nameSpan = item.createSpan();
					nameSpan.textContent = folder;

					const deleteBtn = item.createSpan({ 
						cls: "running-head-folder-pill-delete", 
						attr: { "aria-label": t('delete_button') || "Delete" } 
					});
					setIcon(deleteBtn, "x");
					deleteBtn.addEventListener("click", () => {
						const newFolders = folders.filter(f => f !== folder);
						this.fieldExcludedFolder = newFolders.join(', ');
						renderFolders();
					});
				}
			}
		};

		renderFolders();

		let excludedFolderInputEl: HTMLInputElement;

		const excludedFolderSetting = new Setting(contentEl)
			.addText((text) => {
				text.setPlaceholder(t('field_folder_scope_placeholder'));
				excludedFolderInputEl = text.inputEl;

				// Attach inline folder suggestions
				new FolderSuggest(this.app, excludedFolderInputEl, (path) => {
					const folders = this.fieldExcludedFolder.split(',').map(f => f.trim()).filter(f => f.length > 0);
					if (!folders.includes(path)) {
						folders.push(path);
						this.fieldExcludedFolder = folders.join(', ');
						renderFolders();
					}
					excludedFolderInputEl.value = "";
				});
			});
			
		excludedFolderSetting.settingEl.classList.add("running-head-modal-no-border");

		excludedFolderSetting.addButton((btn) => 
			btn
				.setButtonText(t('add_field_button') || "Adicionar")
				.onClick(() => {
					if (!excludedFolderInputEl) return;
					const val = excludedFolderInputEl.value.trim();
					if (!val) return;
					const folders = this.fieldExcludedFolder.split(',').map(f => f.trim()).filter(f => f.length > 0);
					if (!folders.includes(val)) {
						folders.push(val);
						this.fieldExcludedFolder = folders.join(', ');
						renderFolders();
					}
					excludedFolderInputEl.value = "";
				})
		);

		// --- Footer buttons ---
		const buttonContainer = contentEl.createDiv({ cls: "modal-button-container" });

		const saveBtn = buttonContainer.createEl("button", {
			text: t('save_button'),
			cls: "mod-cta",
		});
		saveBtn.addEventListener("click", () => {
			void this.handleSave();
		});

		const cancelBtn = buttonContainer.createEl("button", {
			text: t('cancel_button'),
			cls: "mod-cancel",
		});
		cancelBtn.addEventListener("click", () => this.close());
	}

	/**
	 * Validate and persist the field.
	 */
	private async handleSave(): Promise<void> {
		const key = this.fieldKey.trim();
		if (!key) {
			new Notice(t('field_key_required'));
			return;
		}

		// Prevent duplicate field keys
		const isDuplicate = this.plugin.settings.customFields.some(
			(f, index) => f.field === key && index !== this.editIndex
		);
		if (isDuplicate) {
			const msg = t('field_already_exists') ? t('field_already_exists').replace('{key}', key) : `A propriedade "${key}" já foi adicionada!`;
			new Notice(msg);
			return;
		}

		const field: CustomField = {
			field: key,
			label: this.fieldLabel.trim(),
			showLabel: this.fieldShowLabel,
			position: this.fieldPosition,
			excludedFolder: this.fieldExcludedFolder.trim(),
		};

		if (this.editIndex !== null) {
			this.plugin.settings.customFields[this.editIndex] = field;
		} else {
			this.plugin.settings.customFields.push(field);
		}

		await this.plugin.saveSettings();

		const msg = this.editIndex !== null
			? t('field_updated').replace('{key}', key)
			: t('field_added').replace('{key}', key);
		new Notice(msg);

		this.onSave?.();
		this.close();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
