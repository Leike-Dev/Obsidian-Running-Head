import { Plugin, TFile } from "obsidian";
import { getAdaptivePillStyles } from "./utils/color";
import { DEFAULT_SETTINGS, RunningHeadSettings, RunningHeadSettingTab } from "./settings";
import { injectMetadataHeader, removeAllMetadataHeaders } from "./ui/metadata-header";

import { ScrollProgressManager } from "./ui/scroll-progress";

/**
 * RunningHead
 *
 * Adds a blog-style metadata header below note titles, displaying
 * publication date, reading time, a last-updated badge, breadcrumb navigation,
 * tabs navigation, and custom frontmatter properties.
 * Data is read from the note's YAML frontmatter.
 */
export default class RunningHeadPlugin extends Plugin {
	public settings!: RunningHeadSettings;
	public scrollProgressManager!: ScrollProgressManager;

	private styleEl!: HTMLStyleElement;

	async onload(): Promise<void> {
		await this.loadSettings();

		// eslint-disable-next-line obsidianmd/prefer-create-el
		this.styleEl = activeDocument.createElement("style");
		this.styleEl.id = "running-head-dynamic-styles";
		document.head.appendChild(this.styleEl);
		this.updateDynamicStyles();
		this.updateBodyClasses();

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
			this.app.metadataCache.on("changed", () => {
				this.debouncedInject();
			})
		);

		// Re-inject when a file is opened or restored in a background pane
		this.registerEvent(
			this.app.workspace.on("file-open", () => {
				this.debouncedInject();
			})
		);

		// Re-inject when reading view finishes rendering sections asynchronously
		this.registerMarkdownPostProcessor((el) => {
			if (el.closest('.markdown-embed')) return;

			const viewContainer = el.closest('.markdown-preview-view');
			if (viewContainer && (viewContainer.querySelector('.running-head-metadata-header') || viewContainer.querySelector('.running-head-custom-title'))) {
				return;
			}
			
			this.debouncedInject();
		});

		// Sync tab link targets when notes are renamed
		this.registerEvent(
			this.app.vault.on('rename', (file, oldPath) => {
				if (file instanceof TFile) {
					void this.updateTabLinksOnRename(oldPath, file.path);
				}
			})
		);

		// Initial injection on plugin load (after a small delay for the workspace to settle)
		this.app.workspace.onLayoutReady(() => {
			this.debouncedInject();
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
			window.clearTimeout(this._injectTimeout);
			this._injectTimeout = null;
		}


		this.scrollProgressManager.cleanupAll();

		document.body.classList.remove("running-head-hide-first-h1");

		// Clean up all injected headers from every open view
		removeAllMetadataHeaders(this);
	}

	async loadSettings(): Promise<void> {
		const loadedData = ((await this.loadData()) as Record<string, unknown>) || {};
		let needsCleanup = false;

		// Cleanup obsolete tabsProperties array from old architecture
		if ("tabsProperties" in loadedData) {
			delete loadedData.tabsProperties;
			needsCleanup = true;
		}

		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			loadedData as Partial<RunningHeadSettings>
		);

		if (needsCleanup) {
			await this.saveData(this.settings);
		}
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
		this.updateDynamicStyles();
		this.updateBodyClasses();
		// Re-inject to reflect updated settings immediately
		this.debouncedInject();
	}

	updateBodyClasses(): void {
		if (this.settings.hideFirstH1) {
			document.body.classList.add("running-head-hide-first-h1");
		} else {
			document.body.classList.remove("running-head-hide-first-h1");
		}
	}

	// --- Private helpers ---

	/**
	 * Update all tab link targets that reference a renamed file.
	 * This is an efficient operation — only writes settings once if changes are found.
	 */
	private async updateTabLinksOnRename(oldPath: string, newPath: string): Promise<void> {
		let hasChanges = false;

		for (const group of this.settings.tabGroups) {
			for (const tab of group.tabs) {
				if (tab.linkTarget === oldPath) {
					tab.linkTarget = newPath;
					hasChanges = true;
				}
			}
		}

		if (hasChanges) {
			await this.saveSettings();
		}
	}

	private _injectTimeout: number | null = null;

	/**
	 * Debounced injection to avoid excessive DOM manipulation
	 * when multiple events fire in quick succession.
	 */
	private debouncedInject(): void {
		if (this._injectTimeout !== null) {
			window.clearTimeout(this._injectTimeout);
		}
		this._injectTimeout = window.setTimeout(() => {
			this._injectTimeout = null;
			void injectMetadataHeader(this);
		}, 50);
	}
}
