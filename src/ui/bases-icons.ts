import { setIcon, App } from "obsidian";
import type RunningHeadPlugin from "../main";

/**
 * Initializes a MutationObserver to watch for Bases plugin table headers
 * and inject native or custom icons.
 */
export function initializeBasesIconObserver(plugin: RunningHeadPlugin): { disconnect: () => void } {
	const observedViews = new WeakSet<HTMLElement>();

	const observer = new MutationObserver((mutations) => {
		const headersToProcess = new Set<HTMLElement>();

		for (const mutation of mutations) {
			if (mutation.type === "childList") {
				mutation.addedNodes.forEach((node) => {
					if (node instanceof Element) {
						if (node.classList.contains("bases-table-header")) {
							headersToProcess.add(node as HTMLElement);
						} else {
							// Verifica se o nó inserido foi DENTRO de um header existente
							const closestHeader = node.closest(".bases-table-header") as HTMLElement;
							if (closestHeader) {
								headersToProcess.add(closestHeader);
							} else if (node.children && node.children.length > 0) {
								// Otimização: Só executa querySelectorAll se o elemento inserido
								// realmente for um contêiner com filhos. Ignora folhas isoladas.
								const headers = Array.from(node.querySelectorAll<HTMLElement>(".bases-table-header"));
								headers.forEach(h => headersToProcess.add(h));
							}
						}
					} else if (node instanceof Node && node.parentElement) {
						const closestHeader = node.parentElement.closest(".bases-table-header") as HTMLElement;
						if (closestHeader) {
							headersToProcess.add(closestHeader);
						}
					}
				});
			} else if (mutation.type === "characterData") {
				let targetEl: Element | null = null;
				if (mutation.target instanceof Element) {
					targetEl = mutation.target;
				} else if (mutation.target instanceof Node && mutation.target.parentElement) {
					targetEl = mutation.target.parentElement;
				}
				
				if (targetEl) {
					const closestHeader = targetEl.closest(".bases-table-header") as HTMLElement;
					if (closestHeader) {
						headersToProcess.add(closestHeader);
					}
				}
			}
		}

		headersToProcess.forEach(header => processBasesTableHeader(header, plugin));
	});

	const performRefresh = () => {
		const basesViews = activeDocument.body.findAll(".bases-view");
		basesViews.forEach(view => {
			if (observedViews.has(view)) return;
			observedViews.add(view);

			// Attach observer ONLY to the Bases view.
			// Removed 'attributes: true' because it causes catastrophic performance drops
			// when hovering or selecting cells in large tables.
			observer.observe(view, {
				childList: true,
				subtree: true,
				characterData: true
			});
			
			// Process existing headers inside this view
			const existingHeaders = view.findAll(".bases-table-header");
			existingHeaders.forEach(header => processBasesTableHeader(header, plugin));
		});
	};

	// Debounce the refresh to avoid layout-change spam during Obsidian startup
	let refreshTimeout: number | null = null;
	const refreshBasesViews = () => {
		if (refreshTimeout !== null) {
			window.clearTimeout(refreshTimeout);
		}
		refreshTimeout = window.setTimeout(() => {
			performRefresh();
			refreshTimeout = null;
		}, 250);
	};

	// Hook into workspace events to force refresh when changing tabs/layouts
	const layoutChangeRef = plugin.app.workspace.on("layout-change", refreshBasesViews);
	const activeLeafChangeRef = plugin.app.workspace.on("active-leaf-change", refreshBasesViews);

	plugin.registerEvent(layoutChangeRef);
	plugin.registerEvent(activeLeafChangeRef);

	// Process any existing ones on load
	refreshBasesViews();

	return {
		disconnect: () => observer.disconnect()
	};
}

/**
 * Processes a single Bases table header, injecting the correct icon based on
 * native type or user configuration.
 */
function processBasesTableHeader(headerEl: HTMLElement, plugin: RunningHeadPlugin) {
	// Find the property name
	const nameEl = headerEl.querySelector(".bases-table-header-name");
	if (!nameEl || !nameEl.textContent) return;

	const propertyName = nameEl.textContent.trim();

	// Find the icon container
	const iconContainer = headerEl.querySelector(".bases-table-header-icon");
	if (!iconContainer || !iconContainer.instanceOf(HTMLElement)) return;

	// 1. Check custom configuration first
	const customConfig = plugin.settings.basesIcons?.find(
		(i) => i.property.toLowerCase() === propertyName.toLowerCase()
	);

	if (customConfig && customConfig.icon) {
		injectIcon(iconContainer, customConfig.icon);
		return;
	}

	// 2. Fallback to native Obsidian type manager
	try {
		const appWithTypes = plugin.app as App & {
			metadataTypeManager?: {
				getAssignedType?: (propertyName: string) => string | undefined;
			};
		};
		const typeManager = appWithTypes.metadataTypeManager;
		if (typeManager && typeof typeManager.getAssignedType === "function") {
			const assignedType = String(typeManager.getAssignedType(propertyName) || "text");
			const defaultIcon = getIconForType(assignedType);
			if (defaultIcon) {
				injectIcon(iconContainer, defaultIcon);
			}
		}
	} catch {
		// Ignore if metadataTypeManager is unavailable
	}
}

/**
 * Safely injects the icon, avoiding infinite mutation loops.
 */
function injectIcon(container: HTMLElement, iconName: string) {
	// Check if already injected
	const existingSvg = container.querySelector("svg");
	
	// We mark the SVG with a custom data attribute so we know we injected it.
	// This prevents infinite loops with non-Lucide custom icons that don't get the 'lucide-*' class.
	if (existingSvg && existingSvg.getAttribute("data-running-head-icon") === iconName) {
		return; // Already has the correct icon
	}

	container.empty();
	setIcon(container, iconName);
	
	// Mark the newly injected SVG
	const newSvg = container.querySelector("svg");
	if (newSvg) {
		newSvg.setAttribute("data-running-head-icon", iconName);
	}
}

/**
 * Maps an Obsidian property type to a default Lucide icon.
 */
function getIconForType(type: string): string {
	switch (type) {
		case "text": return "align-left";
		case "number": return "hash";
		case "checkbox": return "check-square";
		case "date": return "calendar";
		case "datetime": return "clock";
		case "aliases": return "list";
		case "multitext": return "list";
		case "tags": return "tags";
		default: return "info";
	}
}
