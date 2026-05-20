import { App, Modal, Notice } from 'obsidian';
import type RunningHeadPlugin from '../main';
import { t } from '../lang/helpers';

/**
 * Modal for exporting plugin settings via clipboard.
 * Displays the JSON in a read-only textarea with a "Copy to clipboard" button.
 */
export class ExportSettingsModal extends Modal {
	private plugin: RunningHeadPlugin;
	private textAreaEl!: HTMLTextAreaElement;

	constructor(app: App, plugin: RunningHeadPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.empty();
		contentEl.addClass('running-head-export-modal');

		this.setTitle(t('export_modal_title'));

		// JSON preview
		const textContainer = contentEl.createDiv({ cls: 'running-head-data-text-container' });
		this.textAreaEl = textContainer.createEl('textarea', { cls: 'running-head-data-textarea' });
		this.textAreaEl.readOnly = true;

		const data = {
			version: this.plugin.manifest.version,
			exportedAt: new Date().toISOString(),
			settings: this.plugin.settings
		};
		this.textAreaEl.value = JSON.stringify(data, null, 2);

		// Copy button
		const btnContainer = contentEl.createDiv({ cls: 'modal-button-container' });
		const copyBtn = btnContainer.createEl('button', {
			text: t('copy_clipboard_button'),
			cls: 'mod-cta'
		});
		copyBtn.addEventListener('click', () => {
			void this.copyToClipboard();
		});
	}

	private async copyToClipboard(): Promise<void> {
		try {
			await navigator.clipboard.writeText(this.textAreaEl.value);
			new Notice(t('copy_clipboard_success'));
			this.close();
		} catch {
			new Notice(t('export_error'));
		}
	}

	onClose() {
		this.contentEl.empty();
	}
}
