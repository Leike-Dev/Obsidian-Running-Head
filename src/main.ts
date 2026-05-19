import { Plugin, MarkdownView } from "obsidian";
import { DEFAULT_SETTINGS, RunningHeadSettings, RunningHeadSettingTab } from "./settings";
import { injectMetadataHeader, removeAllMetadataHeaders } from "./ui/metadata-header";
import { initializeBasesIconObserver } from "./ui/bases-icons";

/**
 * RunningHead
 *
 * Adds a blog-style metadata header below note titles, displaying
 * publication date, reading time, and a last-updated badge.
 * Data is read from the note's YAML frontmatter.
 */
export default class RunningHeadPlugin extends Plugin {
	settings: RunningHeadSettings;
	private basesObserver: { disconnect: () => void } | null = null;

	async onload(): Promise<void> {
		await this.loadSettings();

		// Register the settings tab
		this.addSettingTab(new RunningHeadSettingTab(this.app, this));

		// Inject the metadata header whenever the active leaf changes
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				this.debouncedInject();
			})
		);

		// Re-inject on layout changes (e.g. switching between reading/editing mode)
		this.registerEvent(
			this.app.workspace.on("layout-change", () => {
				this.debouncedInject();
			})
		);

		// Re-inject when metadata cache updates (frontmatter edits)
		this.registerEvent(
			this.app.metadataCache.on("changed", (file) => {
				const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (activeView && activeView.file?.path === file.path) {
					this.debouncedInject();
				}
			})
		);

		// Initial injection on plugin load (after a small delay for the workspace to settle)
		this.app.workspace.onLayoutReady(() => {
			this.debouncedInject();
			this.basesObserver = initializeBasesIconObserver(this);
		});
	}

	onunload(): void {
		// Cancel any pending debounced injection
		if (this._injectTimeout !== null) {
			clearTimeout(this._injectTimeout);
			this._injectTimeout = null;
		}
		if (this.basesObserver) {
			this.basesObserver.disconnect();
			this.basesObserver = null;
		}

		// Clean up all injected headers from every open view
		removeAllMetadataHeaders(this);
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData() as Partial<RunningHeadSettings>
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
		// Re-inject to reflect updated settings immediately
		await injectMetadataHeader(this);
	}

	// --- Private helpers ---

	private _injectTimeout: ReturnType<typeof setTimeout> | null = null;

	/**
	 * Debounced injection to avoid excessive DOM manipulation
	 * when multiple events fire in quick succession.
	 */
	private debouncedInject(): void {
		if (this._injectTimeout !== null) {
			clearTimeout(this._injectTimeout);
		}
		this._injectTimeout = setTimeout(() => {
			this._injectTimeout = null;
			void injectMetadataHeader(this);
		}, 50);
	}
}
