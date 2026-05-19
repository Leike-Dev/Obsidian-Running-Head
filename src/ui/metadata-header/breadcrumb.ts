import { App } from "obsidian";
import { BREADCRUMB_CLASS } from "./types";

/**
 * Create a breadcrumb element showing the folder path of a note.
 * Each segment is a clickable link that reveals the folder in the file explorer.
 *
 * @param filePath - Full path of the note (e.g. "Base/Windows/Boot/nota.md")
 * @param app - Obsidian App instance
 * @param highlightLast - Whether to apply accent color to the last segment
 * @returns The breadcrumb element, or null if the note is at the vault root
 */
export function createBreadcrumbEl(filePath: string, app: App, highlightLast: boolean): HTMLElement | null {
	// Extract ONLY the folder segments (without the filename)
	// e.g. "Base/Windows/Boot/nota.md" → ["Base", "Windows", "Boot"]
	// e.g. "nota.md" → [] (vault root — don't show)
	const parts = filePath.split("/");
	parts.pop(); // remove the filename
	if (parts.length === 0) return null;

	const breadcrumb = activeDocument.createElement("div");
	breadcrumb.classList.add(BREADCRUMB_CLASS);

	parts.forEach((segment, index) => {
		if (index > 0) {
			breadcrumb.createSpan({ cls: "running-head-breadcrumb-separator", text: "/" });
		}

		const isLast = index === parts.length - 1;
		const folderPath = parts.slice(0, index + 1).join("/");
		const cls = (highlightLast && isLast)
			? "running-head-breadcrumb-segment running-head-breadcrumb-active"
			: "running-head-breadcrumb-segment";
		const link = breadcrumb.createEl("a", {
			cls,
			text: segment,
		});

		link.addEventListener("click", (e) => {
			e.preventDefault();
			const folder = app.vault.getAbstractFileByPath(folderPath);
			if (!folder) return;

			// Reveal in file explorer.
			// revealInFolder is an INTERNAL API (not in obsidian.d.ts).
			// It's the de facto standard used by community plugins.
			// Combined with revealLeaf (PUBLIC API, since 1.7.2) for sidebar/drawer expansion.
			try {
				const explorers = app.workspace.getLeavesOfType("file-explorer");
				const leaf = explorers[0];
				if (leaf) {
					void app.workspace.revealLeaf(leaf);
					const explorerView = leaf.view as { revealInFolder?: (file: unknown) => void };
					if (typeof explorerView.revealInFolder === "function") {
						explorerView.revealInFolder(folder);
					}
				}
			} catch {
				// Silently ignore if file-explorer internal API is unavailable
			}
		});
	});

	return breadcrumb;
}
