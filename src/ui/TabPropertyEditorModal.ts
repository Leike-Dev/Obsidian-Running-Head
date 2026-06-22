import { App, Modal, Notice, Setting, setIcon, Platform, TFile, TextComponent, SearchComponent } from "obsidian";
import type RunningHeadPlugin from "../main";
import type { TabGroup, TabItem } from "../settings";
import { t } from "../lang/helpers";
import { FileSuggest } from "./FileSuggest";
import { IconPickerModal } from "./IconPickerModal";

/**
 * Modal for creating or editing a Tab Group.
 * Contains the group name and an inline list of tabs with add/edit/delete/reorder.
 */
export class TabPropertyEditorModal extends Modal {
	private plugin: RunningHeadPlugin;
	private onSave?: () => void;

	/** When editing, the index of the group being modified. */
	private editIndex: number | null = null;

	// --- Form state ---
	private groupName = "";
	private tabs: TabItem[] = [];

	private listContainerEl: HTMLElement | null = null;

	constructor(
		app: App,
		plugin: RunningHeadPlugin,
		onSave?: () => void,
		editGroup?: TabGroup,
		editIndex?: number
	) {
		super(app);
		this.plugin = plugin;
		this.onSave = onSave;

		if (editGroup && editIndex !== undefined) {
			this.editIndex = editIndex;
			this.groupName = editGroup.name;
			// Deep copy tabs to avoid mutating settings directly
			this.tabs = editGroup.tabs.map((tab) => ({ ...tab }));
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

		// --- Group name ---
		new Setting(contentEl)
			.setName(t('tab_group_name_label'))
			.addText((text) =>
				text
					.setPlaceholder("Home")
					.setValue(this.groupName)
					.onChange((value) => {
						this.groupName = value;
					})
			);

		// --- Divider ---
		contentEl.createEl("hr", { cls: "running-head-modal-separator" });

		// --- Tabs list container ---
		this.listContainerEl = contentEl.createDiv({ cls: "running-head-tab-items-container" });
		this.renderTabsList();

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

	private renderTabsList(): void {
		if (!this.listContainerEl) return;
		this.listContainerEl.empty();

		const listWrapper = this.listContainerEl.createDiv({ cls: "running-head-tab-list-wrapper" });

		// Header
		const header = listWrapper.createDiv({ cls: "running-head-tab-list-header" });
		header.createSpan({ text: t('tab_group_tabs_label'), cls: "running-head-tab-list-title" });
		
		const tabCountStr = this.tabs.length === 1 ? '1 aba' : `${this.tabs.length} abas`;
		header.createSpan({ text: tabCountStr, cls: "running-head-tab-list-count" });

		// List of tabs
		const listBody = listWrapper.createDiv({ cls: "running-head-tab-list-body" });

		if (this.tabs.length === 0) {
			listBody.createDiv({
				text: t('tab_group_no_tabs'),
				cls: "running-head-manager-empty",
			});
		} else {
			for (let i = 0; i < this.tabs.length; i++) {
				const tab = this.tabs[i];
				if (!tab) continue;
				this.renderTabItem(listBody, tab, i);
			}
		}

		// Footer "Add tab" button
		const footer = listWrapper.createDiv({ cls: "running-head-tab-list-footer" });
		const addBtn = footer.createEl("button", { text: t('tab_group_add_tab'), cls: "running-head-tab-add-btn" });
		
		addBtn.addEventListener("click", () => {
			this.tabs.push({ id: Date.now().toString(), label: "", icon: "", linkTarget: "" });
			this.renderTabsList();
		});
	}

	private renderTabItem(container: HTMLElement, tab: TabItem, index: number): void {
		const row = container.createDiv({ cls: "running-head-tab-row" });

		// Drag handle
		const dragHandle = row.createDiv({ cls: "clickable-icon running-head-tab-drag-handle", attr: { "aria-label": t('tab_group_move_up') || "Drag to reorder" } });
		setIcon(dragHandle, "menu");
		this.initDrag(dragHandle, row, container, index);

		// Icon button
		const iconBtn = row.createEl("button", { cls: "clickable-icon running-head-tab-icon-btn", attr: { "aria-label": t('tab_item_icon_choose') } });
		const renderIconPreview = () => {
			iconBtn.empty();
			if (tab.icon) {
				setIcon(iconBtn, tab.icon);
			} else {
				setIcon(iconBtn, "plus");
			}
		};
		renderIconPreview();
		iconBtn.addEventListener("click", () => {
			new IconPickerModal(this.app, (selectedIcon) => {
				tab.icon = selectedIcon;
				renderIconPreview();
			}).open();
		});

		// Name input
		const nameWrapper = row.createDiv({ cls: "running-head-tab-input-wrapper" });
		const nameInput = new TextComponent(nameWrapper)
			.setPlaceholder(t('tab_item_label_name') || "Name")
			.setValue(tab.label)
			.onChange((value) => { tab.label = value; });
		nameInput.inputEl.addClass("running-head-tab-input");

		// Link input (FileSuggest)
		const linkWrapper = row.createDiv({ cls: "running-head-tab-input-wrapper" });
		const linkInput = new SearchComponent(linkWrapper)
			.setPlaceholder(t('tab_item_link_name') || "Link")
			.onChange((value) => { tab.linkTarget = value; });
		linkInput.inputEl.addClass("running-head-tab-input");

		if (tab.linkTarget) {
			const existingFile = this.app.vault.getAbstractFileByPath(tab.linkTarget);
			if (existingFile instanceof TFile) {
				linkInput.setValue(existingFile.basename);
			} else {
				linkInput.setValue(tab.linkTarget);
			}
		}
		new FileSuggest(this.app, linkInput.inputEl, (file: TFile) => {
			tab.linkTarget = file.path;
		});

		// Delete button
		const deleteBtn = row.createEl("button", { cls: "running-head-tab-delete-btn clickable-icon", attr: { "aria-label": t('delete_field_tooltip') || "Delete" } });
		setIcon(deleteBtn, "trash");
		deleteBtn.addEventListener("click", () => {
			this.tabs.splice(index, 1);
			this.renderTabsList();
		});
	}

	/**
	 * Pointer-event-based smooth drag reordering.
	 * The dragged row follows the pointer; siblings slide with CSS transitions.
	 */
	private initDrag(handle: HTMLElement, row: HTMLElement, container: HTMLElement, originIndex: number): void {
		handle.addEventListener("pointerdown", (e: PointerEvent) => {
			e.preventDefault();
			handle.setPointerCapture(e.pointerId);

			const rows = Array.from(container.querySelectorAll<HTMLElement>(".running-head-tab-row"));
			const rowRect = row.getBoundingClientRect();
			const rowHeight = rowRect.height + 1; // +1 for border
			const startY = e.clientY;
			let targetIndex = originIndex;

			row.addClass("is-dragging");

			const onMove = (ev: PointerEvent) => {
				const deltaY = ev.clientY - startY;
				row.setCssProps({ '--drag-y': `${deltaY}px` });

				// Determine target position based on how many row-heights we moved
				const raw = Math.round(deltaY / rowHeight) + originIndex;
				const clamped = Math.max(0, Math.min(rows.length - 1, raw));

				if (clamped !== targetIndex) {
					targetIndex = clamped;
					// Shift siblings to make room
					for (let i = 0; i < rows.length; i++) {
						if (i === originIndex) continue;
						const r = rows[i];
						if (!r) continue;
						if (originIndex < targetIndex && i > originIndex && i <= targetIndex) {
							r.setCssProps({ '--drag-y': `-${rowHeight}px` });
						} else if (originIndex > targetIndex && i >= targetIndex && i < originIndex) {
							r.setCssProps({ '--drag-y': `${rowHeight}px` });
						} else {
							r.setCssProps({ '--drag-y': '0px' });
						}
					}
				}
			};

			const onUp = () => {
				handle.removeEventListener("pointermove", onMove);
				handle.removeEventListener("pointerup", onUp);
				handle.removeEventListener("pointercancel", onUp);

				// Reset all inline transforms
				row.removeClass("is-dragging");
				row.setCssProps({ '--drag-y': '0px' });
				for (const r of rows) {
					r.setCssProps({ '--drag-y': '0px' });
				}

				// Apply the reorder if position changed
				if (targetIndex !== originIndex) {
					const [moved] = this.tabs.splice(originIndex, 1);
					if (moved) {
						this.tabs.splice(targetIndex, 0, moved);
					}
					this.renderTabsList();
				}
			};

			handle.addEventListener("pointermove", onMove);
			handle.addEventListener("pointerup", onUp);
			handle.addEventListener("pointercancel", onUp);
		});
	}

	/**
	 * Validate and persist the tab group configuration.
	 */
	private async handleSave(): Promise<void> {
		const name = this.groupName.trim();

		if (!name) {
			new Notice(t('tab_group_name_required'));
			return;
		}

		// Validate that all tabs have a name and link
		for (let i = 0; i < this.tabs.length; i++) {
			const tab = this.tabs[i];
			if (!tab) continue;
			if (!tab.label.trim()) {
				new Notice(`Aba ${i + 1} precisa de um nome.`);
				return;
			}
			if (!tab.linkTarget.trim()) {
				new Notice(`Aba ${i + 1} precisa de um link.`);
				return;
			}
		}

		if (!this.plugin.settings.tabGroups) {
			this.plugin.settings.tabGroups = [];
		}

		// Prevent duplicate group names
		const isDuplicate = this.plugin.settings.tabGroups.some(
			(g, index) => g.name.toLowerCase() === name.toLowerCase() && index !== this.editIndex
		);
		if (isDuplicate) {
			const msg = t('field_already_exists')
				? t('field_already_exists').replace('{key}', name)
				: `Group "${name}" already exists!`;
			new Notice(msg);
			return;
		}

		const group: TabGroup = {
			id: this.editIndex !== null
				? (this.plugin.settings.tabGroups[this.editIndex]?.id || Date.now().toString())
				: Date.now().toString(),
			name,
			tabs: this.tabs,
		};

		if (this.editIndex !== null) {
			this.plugin.settings.tabGroups[this.editIndex] = group;
		} else {
			this.plugin.settings.tabGroups.push(group);
		}

		await this.plugin.saveSettings();

		const msg = this.editIndex !== null
			? t('tab_property_updated').replace('{key}', name)
			: t('tab_property_added').replace('{key}', name);
		new Notice(msg);

		this.onSave?.();
		this.close();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}

