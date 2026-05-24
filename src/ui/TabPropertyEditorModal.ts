import { App, Modal, Notice, Setting, Platform } from "obsidian";
import type RunningHeadPlugin from "../main";
import type { TabPropertyConfig } from "../settings";
import { t } from "../lang/helpers";

/**
 * Modal for creating or editing a tab property configuration.
 */
export class TabPropertyEditorModal extends Modal {
	private plugin: RunningHeadPlugin;
	private onSave?: () => void;

	/** When editing, the index of the item being modified. */
	private editIndex: number | null = null;

	// --- Form state ---
	private propertyKey = "";
	private order = 10;
	private showIcon = true;

	constructor(
		app: App,
		plugin: RunningHeadPlugin,
		onSave?: () => void,
		editConfig?: TabPropertyConfig,
		editIndex?: number
	) {
		super(app);
		this.plugin = plugin;
		this.onSave = onSave;

		if (editConfig && editIndex !== undefined) {
			this.editIndex = editIndex;
			this.propertyKey = editConfig.property;
			this.order = editConfig.order;
			this.showIcon = editConfig.showIcon;
		} else {
			// Auto-increment order for new properties
			const existing = this.plugin.settings.tabsProperties || [];
			if (existing.length > 0) {
				const maxOrder = Math.max(...existing.map(cfg => cfg.order));
				this.order = maxOrder + 10; // increment by 10 to leave space for insertions
			}
		}
	}

	onOpen(): void {
		this.display();
	}

	private display(): void {
		const { contentEl } = this;
		contentEl.empty();

		this.setTitle(this.editIndex !== null ? t('tab_editor_title_edit') : t('tab_editor_title_add'));
		if (!Platform.isMobile) {
			this.modalEl.addClass("mod-confirmation");
		}

		// --- Property name ---
		new Setting(contentEl)
			.setName(t('tab_property_name'))
			.setDesc(t('tab_property_desc'))
			.addText((text) =>
				text
					.setPlaceholder("Tabs home")
					.setValue(this.propertyKey)
					.onChange((value) => {
						this.propertyKey = value;
					})
			);

		// --- Display order ---
		new Setting(contentEl)
			.setName(t('tab_property_order'))
			.setDesc(t('tab_property_order_desc'))
			.addText((text) =>
				text
					.setPlaceholder("10")
					.setValue(String(this.order))
					.onChange((value) => {
						const num = parseInt(value, 10);
						this.order = isNaN(num) ? 0 : num;
					})
			);

		// --- Show icon toggle ---
		new Setting(contentEl)
			.setName(t('tab_property_show_icon'))
			.setDesc(t('tab_property_show_icon_desc'))
			.addToggle((toggle) =>
				toggle
					.setValue(this.showIcon)
					.onChange((value) => {
						this.showIcon = value;
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
	 * Validate and persist the configuration.
	 */
	private async handleSave(): Promise<void> {
		const prop = this.propertyKey.trim();

		if (!prop) {
			new Notice(t('tab_property_required'));
			return;
		}

		if (!this.plugin.settings.tabsProperties) {
			this.plugin.settings.tabsProperties = [];
		}

		// Prevent duplicate properties
		const isDuplicate = this.plugin.settings.tabsProperties.some(
			(i, index) => i.property.toLowerCase() === prop.toLowerCase() && index !== this.editIndex
		);
		if (isDuplicate) {
			const msg = t('field_already_exists') ? t('field_already_exists').replace('{key}', prop) : `A propriedade "${prop}" já foi adicionada!`;
			new Notice(msg);
			return;
		}

		const tabConfig: TabPropertyConfig = {
			id: this.editIndex !== null ? (this.plugin.settings.tabsProperties[this.editIndex]?.id || Date.now().toString()) : Date.now().toString(),
			property: prop,
			order: this.order,
			showIcon: this.showIcon
		};

		if (this.editIndex !== null) {
			this.plugin.settings.tabsProperties[this.editIndex] = tabConfig;
		} else {
			this.plugin.settings.tabsProperties.push(tabConfig);
		}

		// Sort by order ascending
		this.plugin.settings.tabsProperties.sort((a, b) => a.order - b.order);

		await this.plugin.saveSettings();

		const msg = this.editIndex !== null
			? t('tab_property_updated').replace('{key}', prop)
			: t('tab_property_added').replace('{key}', prop);
		new Notice(msg);

		this.onSave?.();
		this.close();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
