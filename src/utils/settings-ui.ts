import { Setting, setIcon } from "obsidian";

/**
 * Create a collapsible (accordion) section in the settings panel.
 *
 * Returns the inner container element where child settings should be added.
 * State is managed via a `stateKey` on the `stateHolder` object, which persists
 * across re-renders within the same settings tab lifecycle.
 *
 * @param containerEl - The parent element to attach the section header and container to.
 * @param name - The section header title.
 * @param desc - The section header description.
 * @param stateHolder - Object to store the expanded/collapsed state (e.g. the tab instance).
 * @param stateKey - Property key on `stateHolder` for tracking open/closed state.
 * @returns The inner container `HTMLElement` to populate with settings.
 */
export function createCollapsibleSection(
	containerEl: HTMLElement,
	name: string,
	desc: string,
	stateHolder: Record<string, unknown>,
	stateKey: string,
): HTMLElement {
	const isOpen = (stateHolder[stateKey] as boolean | undefined) ?? false;

	const header = new Setting(containerEl)
		.setName(name)
		.setDesc(desc);

	header.settingEl.classList.add("running-head-dropdown-header", "running-head-clickable-header");
	if (isOpen) {
		header.settingEl.classList.add("is-expanded");
	}

	const iconSpan = header.controlEl.createSpan({ cls: "running-head-dropdown-icon" });
	setIcon(iconSpan, isOpen ? "chevron-down" : "chevron-right");

	const innerContainer = containerEl.createDiv({ cls: "running-head-dropdown-container" });
	innerContainer.style.display = isOpen ? "block" : "none";

	header.settingEl.addEventListener("click", () => {
		const newState = !stateHolder[stateKey];
		stateHolder[stateKey] = newState;
		innerContainer.style.display = newState ? "block" : "none";
		iconSpan.empty();
		setIcon(iconSpan, newState ? "chevron-down" : "chevron-right");
		if (newState) {
			header.settingEl.classList.add("is-expanded");
		} else {
			header.settingEl.classList.remove("is-expanded");
		}
	});

	return innerContainer;
}
