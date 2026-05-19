import { App } from "obsidian";
import type { CustomField } from "../../settings";

/** CSS class applied to the injected container — used to avoid duplicates. */
export const HEADER_CLASS = "running-head-metadata-header";

/** CSS class for the breadcrumb navigation element. */
export const BREADCRUMB_CLASS = "running-head-breadcrumb";

/** Regex to detect wiki links: [[target]] or [[target|alias]] */
export const WIKI_LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Options resolved from frontmatter + settings, passed to the DOM builder.
 */
export interface MetadataHeaderOptions {
	/** Formatted publication date (e.g. "August 6, 2024") */
	formattedDate: string | null;
	/** Reading time in minutes */
	readingTime: number | null;
	/** Formatted last-updated date */
	formattedLastUpdated: string | null;
	/** Whether to show reading time */
	showReadingTime: boolean;
	/** Whether to show last-updated badge */
	showLastUpdated: boolean;
	/** Font size of the header text in rem units */
	badgeFontSize: number;
	/** User-defined custom fields */
	customFields: CustomField[];
	/** Raw frontmatter data for custom field lookup */
	frontmatter: Record<string, unknown> | undefined;
	/** App instance for opening internal links */
	app: App;
	/** Source file path for resolving relative links */
	sourcePath: string;
	/** User-selected date locale for formatting injected strings */
	dateLocale: string;
}

export interface AppWithPlugins extends App {
	plugins?: {
		plugins?: {
			[key: string]: {
				settings?: {
					statusStyles?: Array<{ name?: string }>;
				};
				processPill?: (el: HTMLElement, field: string) => void;
			};
		};
	};
	metadataTypeManager?: {
		getAssignedType?: (propertyName: string) => string | undefined;
	};
}

