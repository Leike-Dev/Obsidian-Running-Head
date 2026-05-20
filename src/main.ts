import { Plugin, MarkdownView } from "obsidian";
import { getAdaptivePillStyles } from "./utils/color";
import { DEFAULT_SETTINGS, RunningHeadSettings, RunningHeadSettingTab } from "./settings";
import { injectMetadataHeader, removeAllMetadataHeaders } from "./ui/metadata-header";
import { initializeBasesIconObserver } from "./ui/bases-icons";
import { ScrollProgressManager } from "./ui/scroll-progress";

/**
 * RunningHead
 *
 * Adds a blog-style metadata header below note titles, displaying
 * publication date, reading time, and a last-updated badge.
 * Data is read from the note's YAML frontmatter.
 */
export default class RunningHeadPlugin extends Plugin {
	settings: RunningHeadSettings;
	scrollProgressManager: ScrollProgressManager;
	private basesObserver: { disconnect: () => void } | null = null;
	private styleEl: HTMLStyleElement;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.styleEl = document.createElement("style");
		this.styleEl.id = "running-head-dynamic-styles";
		document.head.appendChild(this.styleEl);
		this.updateDynamicStyles();

		this.scrollProgressManager = new ScrollProgressManager(this);

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
			if (this.scrollProgressManager) {
				this.scrollProgressManager.setupListeners();
			}
		});
	}

	updateDynamicStyles(): void {
		if (!this.styleEl) return;

		let css = "";
		
		// Helper to generate CSS for a theme
		const genThemeStyles = (isDark: boolean) => {
			let themeCss = "";
			if (this.settings.lastUpdatedBadgeColor) {
				const badge = getAdaptivePillStyles(this.settings.lastUpdatedBadgeColor, isDark);
				themeCss += `--rh-badge-bg: ${badge.bg};\n`;
				themeCss += `--rh-badge-text: ${badge.text};\n`;
			}
			if (this.settings.breadcrumbHighlightColor) {
				// For text link, we just adapt text color
				const link = getAdaptivePillStyles(this.settings.breadcrumbHighlightColor, isDark);
				themeCss += `--rh-breadcrumb-text: ${link.text};\n`;
			}
			if (this.settings.scrollProgressColor) {
				const scroll = getAdaptivePillStyles(this.settings.scrollProgressColor, isDark);
				themeCss += `--rh-scroll-bg: ${scroll.text};\n`;
			}
			return themeCss;
		};

		css += `body.theme-light {\n${genThemeStyles(false)}}\n`;
		css += `body.theme-dark {\n${genThemeStyles(true)}}\n`;

		this.styleEl.textContent = css;
	}

	onunload(): void {
		if (this.styleEl) {
			this.styleEl.remove();
		}
		// Cancel any pending debounced injection
		if (this._injectTimeout !== null) {
			clearTimeout(this._injectTimeout);
			this._injectTimeout = null;
		}
		if (this.basesObserver) {
			this.basesObserver.disconnect();
			this.basesObserver = null;
		}

		this.scrollProgressManager.cleanupAll();

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
		this.updateDynamicStyles();
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
