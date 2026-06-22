import { App, AbstractInputSuggest, TFile } from "obsidian";

/**
 * Inline file suggest dropdown attached to a text input.
 * Uses AbstractInputSuggest to provide native-feeling note search
 * with fuzzy filtering — same behavior as Obsidian's [[wikilink]] suggest.
 */
export class FileSuggest extends AbstractInputSuggest<TFile> {
	private onChange: (file: TFile) => void;
	private inputEl: HTMLInputElement;
	private pluginApp: App;

	constructor(app: App, inputEl: HTMLInputElement, onChange: (file: TFile) => void) {
		super(app, inputEl);
		this.inputEl = inputEl;
		this.pluginApp = app;
		this.onChange = onChange;
	}

	getSuggestions(query: string): TFile[] {
		const files = this.pluginApp.vault.getMarkdownFiles();
		if (!query.trim()) return files.slice(0, 50);

		const lowerQuery = query.toLowerCase();
		return files
			.filter((f) => {
				const basename = f.basename.toLowerCase();
				const path = f.path.toLowerCase();
				return basename.includes(lowerQuery) || path.includes(lowerQuery);
			})
			.slice(0, 50);
	}

	renderSuggestion(file: TFile, el: HTMLElement): void {
		const container = el.createDiv({ cls: "running-head-file-suggestion" });
		container.createDiv({ text: file.basename, cls: "running-head-file-suggestion-name" });
		if (file.parent && file.parent.path !== "/") {
			container.createDiv({ text: file.parent.path, cls: "running-head-file-suggestion-path" });
		}
	}

	selectSuggestion(file: TFile): void {
		this.inputEl.value = file.basename;
		this.onChange(file);
		this.inputEl.focus();
		this.close();
	}
}
