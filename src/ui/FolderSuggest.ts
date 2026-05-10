import { App, AbstractInputSuggest, TFolder } from "obsidian";

/**
 * Inline folder suggest dropdown attached to a text input.
 * Uses the public AbstractInputSuggest API (since 1.4.10) to provide
 * a native-feeling folder picker with fuzzy filtering.
 */
export class FolderSuggest extends AbstractInputSuggest<TFolder> {
	private onChange: (value: string) => void;
	private inputEl: HTMLInputElement;
	private pluginApp: App;

	constructor(app: App, inputEl: HTMLInputElement, onChange: (value: string) => void) {
		super(app, inputEl);
		this.inputEl = inputEl;
		this.pluginApp = app;
		this.onChange = onChange;
	}

	getSuggestions(query: string): TFolder[] {
		const currentSegment = query.trim();

		const folders = this.pluginApp.vault.getAllFolders();
		if (!currentSegment) return folders.slice(0, 50);

		const lowerQuery = currentSegment.toLowerCase();
		return folders
			.filter((f) => f.path.toLowerCase().includes(lowerQuery))
			.slice(0, 50);
	}

	renderSuggestion(folder: TFolder, el: HTMLElement): void {
		el.setText(folder.path);
	}

	selectSuggestion(folder: TFolder): void {
		this.setValue(folder.path);
		this.onChange(folder.path);
		this.close();
	}
}
