import { App, Modal, Notice } from 'obsidian';
import type RunningHeadPlugin from '../main';
import { t } from '../lang/helpers';
import { DEFAULT_SETTINGS, RunningHeadSettings } from '../settings';

/**
 * Modal for importing plugin settings via clipboard paste.
 * User pastes JSON into a textarea and clicks Import.
 * Validates the JSON structure before applying.
 */
export class ImportSettingsModal extends Modal {
	private plugin: RunningHeadPlugin;
	private textAreaEl!: HTMLTextAreaElement;
	private onImport?: () => void;

	constructor(app: App, plugin: RunningHeadPlugin, onImport?: () => void) {
		super(app);
		this.plugin = plugin;
		this.onImport = onImport;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass('running-head-import-modal');

		this.setTitle(t('import_modal_title'));

		// Textarea for pasting JSON
		const textContainer = contentEl.createDiv({ cls: 'running-head-data-text-container' });
		this.textAreaEl = textContainer.createEl('textarea', { cls: 'running-head-data-textarea' });
		this.textAreaEl.placeholder = t('import_paste_placeholder');

		// Buttons
		const btnContainer = contentEl.createDiv({ cls: 'modal-button-container' });

		const importBtn = btnContainer.createEl('button', {
			text: t('import_button'),
			cls: 'mod-cta'
		});
		importBtn.addEventListener('click', () => {
			void this.handleImport();
		});

		const cancelBtn = btnContainer.createEl('button', {
			text: t('cancel_button'),
			cls: 'mod-cancel'
		});
		cancelBtn.addEventListener('click', () => { this.close(); });
	}

	/**
	 * Validates and applies the imported JSON data.
	 */
	private async handleImport(): Promise<void> {
		const jsonString = this.textAreaEl.value.trim();
		if (!jsonString) {
			new Notice(t('import_empty_notice'));
			return;
		}

		let data: { settings?: Record<string, unknown> };
		try {
			data = JSON.parse(jsonString) as { settings?: Record<string, unknown> };
		} catch {
			new Notice(t('import_invalid_json'));
			return;
		}

		if (!data.settings || typeof data.settings !== 'object' || Array.isArray(data.settings)) {
			new Notice(t('import_error'));
			return;
		}

		const incomingSettings = data.settings;
		let updatedSettings = false;

		const pluginSettings = this.plugin.settings as unknown as Record<string, unknown>;

		// Safely merge incoming settings by checking against DEFAULT_SETTINGS keys and types
		for (const k of Object.keys(DEFAULT_SETTINGS)) {
			const key = k as keyof RunningHeadSettings;
			if (k in incomingSettings) {
				const expectedType = typeof DEFAULT_SETTINGS[key];
				const incomingValue = incomingSettings[k];

				if (expectedType === 'boolean' && typeof incomingValue === 'boolean') {
					pluginSettings[k] = incomingValue;
					updatedSettings = true;
				} else if (expectedType === 'number' && typeof incomingValue === 'number') {
					pluginSettings[k] = incomingValue;
					updatedSettings = true;
				} else if (expectedType === 'string' && typeof incomingValue === 'string') {
					pluginSettings[k] = incomingValue;
					updatedSettings = true;
				} else if (Array.isArray(DEFAULT_SETTINGS[key]) && Array.isArray(incomingValue)) {
					// Minimal array validation: ensure we only assign if it is an array
					// More complex validation can be done per item if necessary
					pluginSettings[k] = incomingValue;
					updatedSettings = true;
				}
			}
		}

		if (updatedSettings) {
			await this.plugin.saveSettings();
			new Notice(t('import_success'));
			this.onImport?.();
			this.close();
		} else {
			new Notice(t('import_error'));
		}
	}

	onClose() {
		this.contentEl.empty();
	}
}
