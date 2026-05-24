import { App, FuzzySuggestModal, FuzzyMatch, setIcon, getIconIds } from "obsidian";
import { t } from "../lang/helpers";

/**
 * Modal for selecting an icon from the loaded Obsidian library (Lucide).
 */
export class IconPickerModal extends FuzzySuggestModal<string> {
	private onChoose: (icon: string) => void;

	constructor(app: App, onChoose: (icon: string) => void) {
		super(app);
		this.onChoose = onChoose;
		this.setPlaceholder(t('icon_picker_placeholder') || "Search for an icon...");
	}

	getItems(): string[] {
		// Use native Obsidian icon IDs
		return getIconIds();
	}

	getItemText(item: string): string {
		return item;
	}

	renderSuggestion(match: FuzzyMatch<string>, el: HTMLElement): void {
		const icon = match.item;
		el.addClass('running-head-icon-suggestion');

		const iconEl = el.createSpan({ cls: 'running-head-icon-suggestion-icon' });
		setIcon(iconEl, icon);

		el.createSpan({ text: icon, cls: 'running-head-icon-suggestion-name' });
	}

	onChooseItem(item: string, evt: MouseEvent | KeyboardEvent): void {
		this.onChoose(item);
	}
}
