import { App, Modal, Notice, Setting, Platform } from "obsidian";
import type RunningHeadPlugin from "../main";
import type { BasesIcon } from "../settings";
import { IconPickerModal } from "./IconPickerModal";
import { t } from "../lang/helpers";

/**
 * Modal for creating or editing a custom bases icon.
 */
export class BasesIconEditorModal extends Modal {
	private plugin: RunningHeadPlugin;
	private onSave?: () => void;

	/** When editing, the index of the icon being modified. */
	private editIndex: number | null = null;

	// --- Form state ---
	private propertyKey = "";
	private iconName = "";

	constructor(
		app: App,
		plugin: RunningHeadPlugin,
		onSave?: () => void,
		editIcon?: BasesIcon,
		editIndex?: number
	) {
		super(app);
		this.plugin = plugin;
		this.onSave = onSave;

		if (editIcon && editIndex !== undefined) {
			this.editIndex = editIndex;
			this.propertyKey = editIcon.property;
			this.iconName = editIcon.icon;
		}
	}

	onOpen(): void {
		this.display();
	}

	private display(): void {
		const { contentEl } = this;
		contentEl.empty();

		this.setTitle(this.editIndex !== null ? t('bases_icon_editor_title_edit') : t('bases_icon_editor_title_add'));
		if (!Platform.isMobile) {
			this.modalEl.addClass("mod-confirmation");
		}

		// --- Property name ---
		new Setting(contentEl)
			.setName(t('bases_icon_property'))
			.setDesc(t('bases_icon_property_desc'))
			.addText((text) =>
				text
					.setPlaceholder("Status")
					.setValue(this.propertyKey)
					.onChange((value) => {
						this.propertyKey = value;
					})
			);

		// --- Icon name ---
		const iconSetting = new Setting(contentEl)
			.setName(t('bases_icon_name'))
			.setDesc(t('bases_icon_name_desc'));
			
		iconSetting.settingEl.classList.add("running-head-icon-selector-setting");

		if (this.iconName) {
			iconSetting.addExtraButton(btn => btn
				.setIcon(this.iconName)
				.setTooltip("Change icon")
				.onClick(() => {
					new IconPickerModal(this.app, (selectedIcon) => {
						this.iconName = selectedIcon;
						this.display();
					}).open();
				})
			);
			iconSetting.addExtraButton(btn => btn
				.setIcon("trash")
				.setTooltip(t('delete_button') || "Remover ícone")
				.onClick(() => {
					this.iconName = "";
					this.display();
				})
			);
		} else {
			iconSetting.addButton(btn => btn
				.setButtonText(t('add_button') || "Escolher ícone")
				.onClick(() => {
					new IconPickerModal(this.app, (selectedIcon) => {
						this.iconName = selectedIcon;
						this.display();
					}).open();
				})
			);
		}

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
	 * Validate and persist the icon configuration.
	 */
	private async handleSave(): Promise<void> {
		const prop = this.propertyKey.trim();
		const icon = this.iconName.trim();

		if (!prop) {
			new Notice(t('bases_icon_property_required'));
			return;
		}
		if (!icon) {
			new Notice(t('bases_icon_name_required'));
			return;
		}

		if (!this.plugin.settings.basesIcons) {
			this.plugin.settings.basesIcons = [];
		}

		// Prevent duplicate properties
		const isDuplicate = this.plugin.settings.basesIcons.some(
			(i, index) => i.property.toLowerCase() === prop.toLowerCase() && index !== this.editIndex
		);
		if (isDuplicate) {
			const msg = t('field_already_exists') ? t('field_already_exists').replace('{key}', prop) : `A propriedade "${prop}" já foi adicionada!`;
			new Notice(msg);
			return;
		}

		const iconConfig: BasesIcon = {
			property: prop,
			icon: icon,
		};

		if (this.editIndex !== null) {
			this.plugin.settings.basesIcons[this.editIndex] = iconConfig;
		} else {
			this.plugin.settings.basesIcons.push(iconConfig);
		}

		await this.plugin.saveSettings();

		const msg = this.editIndex !== null
			? t('bases_icon_updated').replace('{property}', prop)
			: t('bases_icon_added').replace('{property}', prop);
		new Notice(msg);

		this.onSave?.();
		this.close();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
