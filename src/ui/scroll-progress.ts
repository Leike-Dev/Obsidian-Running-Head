import { MarkdownView, WorkspaceLeaf } from "obsidian";
import type RunningHeadPlugin from "../main";

const PROGRESS_BAR_CLASS = "running-head-scroll-progress";

export class ScrollProgressManager {
	private plugin: RunningHeadPlugin;
	// Store bound listeners per leaf to allow cleanup
	private listeners: WeakMap<HTMLElement, (e: Event) => void> = new WeakMap();

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
				const view = leaf.view;
				const contentEl = view.contentEl;
				contentEl.querySelectorAll(`.${PROGRESS_BAR_CLASS}`).forEach((el: Element) => el.remove());
				
				const listener = this.listeners.get(contentEl);
				if (listener) {
					contentEl.removeEventListener("scroll", listener, { capture: true });
					this.listeners.delete(contentEl);
				}
			}
		});
	}

	private attachToLeaf(leaf: WorkspaceLeaf) {
		if (!(leaf.view instanceof MarkdownView)) return;
		const view = leaf.view;

		// If disabled in settings, ensure it's removed and skip
		if (!this.plugin.settings.showScrollProgress) {
			this.removeProgressBar(view);
			return;
		}

		// Inject progress bar if missing
		this.injectProgressBar(view);

		// If listener already attached, do nothing
		if (this.listeners.has(view.contentEl)) return;

		// Create scroll handler
		const onScroll = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target && target.scrollHeight > target.clientHeight) {
				this.updateProgress(view, target);
			}
		};

		// Attach with capture phase to catch scroll events from children
		view.contentEl.addEventListener("scroll", onScroll, { capture: true });
		this.listeners.set(view.contentEl, onScroll);
		
		// Initial update
		const scroller = view.contentEl.querySelector(".cm-scroller") || view.contentEl.querySelector(".markdown-preview-view");
		if (scroller) {
			this.updateProgress(view, scroller as HTMLElement);
		}
	}

	private injectProgressBar(view: MarkdownView) {
		const container = view.contentEl;
		if (!container || container.querySelector(`.${PROGRESS_BAR_CLASS}`)) return;

		const progressBar = activeDocument.createElement("div");
		progressBar.classList.add(PROGRESS_BAR_CLASS);
		
		// Apply custom color if set
		if (this.plugin.settings.scrollProgressColor) {
			progressBar.style.backgroundColor = this.plugin.settings.scrollProgressColor;
		}

		// Insert at the top of contentEl
		container.appendChild(progressBar);
	}

	private removeProgressBar(view: MarkdownView) {
		const container = view.contentEl;
		if (container) {
			container.querySelectorAll(`.${PROGRESS_BAR_CLASS}`).forEach((el: Element) => el.remove());
		}
		const listener = this.listeners.get(view.contentEl);
		if (listener) {
			view.contentEl.removeEventListener("scroll", listener, { capture: true });
			this.listeners.delete(view.contentEl);
		}
	}

	private updateProgress(view: MarkdownView, scrollContainer: HTMLElement) {
		const container = view.contentEl;
		if (!container) return;
		
		const progressBar = container.querySelector(`.${PROGRESS_BAR_CLASS}`) as HTMLElement;
		if (!progressBar) return;

		const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
		const scrollableHeight = scrollHeight - clientHeight;
		
		let progress = 0;
		if (scrollableHeight > 0) {
			progress = Math.min(Math.max(scrollTop / scrollableHeight, 0), 1);
		}

		// Use transform scaleX for GPU acceleration (60fps smooth)
		progressBar.style.transform = `scaleX(${progress})`;
	}
}
