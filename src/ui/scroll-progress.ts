import { MarkdownView, WorkspaceLeaf } from "obsidian";
import type RunningHeadPlugin from "../main";

const PROGRESS_BAR_CLASS = "running-head-scroll-progress";

interface ScrollState {
	listener: (e: Event) => void;
	progressBar: HTMLElement | null;
	frameId: number | null;
}

export class ScrollProgressManager {
	private plugin: RunningHeadPlugin;
	// Store state per leaf container to allow cleanup, caching, and rAF management
	private states: WeakMap<HTMLElement, ScrollState> = new WeakMap();

	constructor(plugin: RunningHeadPlugin) {
		this.plugin = plugin;
	}

	public setupListeners() {
		// Clean up existing bars if any
		this.cleanupAll();

		// Attach to all current markdown leaves
		this.plugin.app.workspace.iterateAllLeaves((leaf) => {
			this.attachToLeaf(leaf);
		});

		// Listen for layout changes / newly opened leaves
		this.plugin.registerEvent(
			this.plugin.app.workspace.on("layout-change", () => {
				this.plugin.app.workspace.iterateAllLeaves((leaf) => {
					this.attachToLeaf(leaf);
				});
			})
		);
	}

	public cleanupAll() {
		this.plugin.app.workspace.iterateAllLeaves((leaf) => {
			if (leaf.view instanceof MarkdownView) {
				const contentEl = leaf.view.contentEl;
				this.removeProgressBar(contentEl);
			}
		});
	}

	private attachToLeaf(leaf: WorkspaceLeaf) {
		if (!(leaf.view instanceof MarkdownView)) return;
		const view = leaf.view;
		const contentEl = view.contentEl;

		// If disabled in settings, ensure it's removed and skip
		if (!this.plugin.settings.showScrollProgress) {
			this.removeProgressBar(contentEl);
			return;
		}

		// Inject progress bar if missing
		this.injectProgressBar(contentEl);

		// If state already exists, we are already listening
		if (this.states.has(contentEl)) return;

		// Create scroll handler with rAF throttling
		const onScroll = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target) {
				const state = this.states.get(contentEl);
				if (state && state.frameId === null) {
					state.frameId = requestAnimationFrame(() => {
						this.updateProgress(state.progressBar, target);
						state.frameId = null; // Reset frame ID
					});
				}
			}
		};

		// Initialize state
		const progressBar = contentEl.querySelector<HTMLElement>(`.${PROGRESS_BAR_CLASS}`);
		
		this.states.set(contentEl, {
			listener: onScroll,
			progressBar,
			frameId: null
		});

		// Attach with capture phase to catch scroll events from children
		contentEl.addEventListener("scroll", onScroll, { capture: true });
		
		// Initial update
		const scroller = contentEl.querySelector(".cm-scroller") || contentEl.querySelector(".markdown-preview-view");
		if (scroller && progressBar) {
			this.updateProgress(progressBar, scroller as HTMLElement);
		}
	}

	private injectProgressBar(container: HTMLElement) {
		if (!container || container.querySelector(`.${PROGRESS_BAR_CLASS}`)) return;

		const progressBar = activeDocument.createElement("div");
		progressBar.classList.add(PROGRESS_BAR_CLASS);
		
		// Apply custom color if set
		if (this.plugin.settings.scrollProgressColor) {
			progressBar.setCssProps({
				"background-color": this.plugin.settings.scrollProgressColor
			});
		}

		// Insert at the top of contentEl
		container.appendChild(progressBar);
		
		// Update cached reference if state exists
		const state = this.states.get(container);
		if (state) {
			state.progressBar = progressBar;
		}
	}

	private removeProgressBar(container: HTMLElement) {
		if (!container) return;

		// Remove elements
		container.querySelectorAll(`.${PROGRESS_BAR_CLASS}`).forEach((el: Element) => el.remove());
		
		// Cleanup state
		const state = this.states.get(container);
		if (state) {
			container.removeEventListener("scroll", state.listener, { capture: true });
			if (state.frameId !== null) {
				cancelAnimationFrame(state.frameId);
			}
			this.states.delete(container);
		}
	}

	private updateProgress(progressBar: HTMLElement | null, scrollContainer: HTMLElement) {
		if (!progressBar) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
		
		// If not scrollable, reset progress to 0 and skip calculations
		if (scrollHeight <= clientHeight) {
			progressBar.setCssProps({
				"transform": "scaleX(0)"
			});
			return;
		}

		const scrollableHeight = scrollHeight - clientHeight;
		let progress = 0;
		if (scrollableHeight > 0) {
			progress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
		}

		// Use transform scaleX for GPU acceleration (60fps smooth)
		progressBar.setCssProps({
			"transform": `scaleX(${progress})`
		});
	}
}
