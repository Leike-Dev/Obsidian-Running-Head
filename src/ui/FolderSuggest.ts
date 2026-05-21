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
	private getExcludedFolders?: () => string[];

	constructor(app: App, inputEl: HTMLInputElement, onChange: (value: string) => void, getExcludedFolders?: () => string[]) {
		super(app, inputEl);
		this.inputEl = inputEl;
		this.pluginApp = app;
		this.onChange = onChange;
		this.getExcludedFolders = getExcludedFolders;
	}

	getSuggestions(query: string): TFolder[] {
		const currentSegment = query.trim();

		let folders = this.pluginApp.vault.getAllFolders();
		
		// Filter out already selected folders
		if (this.getExcludedFolders) {
			const excluded = this.getExcludedFolders();
			folders = folders.filter((f) => !excluded.includes(f.path));
		}

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
		// Do not set the value to the folder path, because we want it to clear 
		// (which onChange does) and let the user select another one.
		this.onChange(folder.path);
		
		// Trigger an input event to refresh the suggestions list immediately
		// without needing to click out and back in.
		this.inputEl.focus();
		this.inputEl.dispatchEvent(new Event("input"));
	}
}
