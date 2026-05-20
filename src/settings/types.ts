/**
 * A user-defined frontmatter field to render in the metadata header.
 * Display type is auto-detected from the value content.
 */
export interface BasesIcon {
	property: string;
	icon: string;
}

export interface CustomField {
	/** Frontmatter key to read (e.g. "author", "status") */
	field: string;
	/** Display label shown before the value (optional) */
	label: string;
	/** Whether to display the label in the note */
	showLabel: boolean;
	/** Position relative to the note title */
	position: "above" | "below";
	/** Optional folder path where this field should be hidden (e.g. "Base/Windows") */
	excludedFolder: string;
}

/**
 * Settings interface for the RunningHead plugin.
 * Controls frontmatter field names, locale, and display preferences.
 */
export interface RunningHeadSettings {
	/** Frontmatter field name for the publication date */
	dateField: string;
	/** Frontmatter field name for the last-updated date */
	lastUpdatedField: string;
	/** Locale string for date formatting (e.g. "en-US", "pt-BR") */
	dateLocale: string;
	/** Whether to use abbreviated date format (e.g. "Aug 6, 2024" instead of "August 6, 2024") */
	useShortDate: boolean;
	/** Whether to show reading time next to the date */
	showReadingTime: boolean;
	/** Average words per minute for reading time calculation */
	wordsPerMinute: number;
	/** Whether to show the "Last Updated" badge */
	showLastUpdated: boolean;
	/** Layout style: "wiki" (separated context) or "blog" (all together below title) */
	layoutStyle: "wiki" | "blog";
	/** Title font size in em units */
	titleFontSize: number;
	/** Font size of the metadata header (date + badge) in rem units */
	badgeFontSize: number;
	/** User-defined custom fields to display */
	customFields: CustomField[];
	/** Custom date format string using Moment.js syntax */
	customDateFormat: string;
	/** Custom icons for Bases plugin table headers */
	basesIcons: BasesIcon[];
	/** Whether to show the folder breadcrumb above the title */
	showBreadcrumb: boolean;
	/** Whether to highlight the last breadcrumb segment with the accent color */
	breadcrumbHighlightLast: boolean;
	/** Whether to show a scroll progress bar at the top of the note */
	showScrollProgress: boolean;
	/** Custom color for the scroll progress bar (empty for default accent color) */
	scrollProgressColor: string;
	/** Custom color for the breadcrumb highlight (empty for default accent color) */
	breadcrumbHighlightColor: string;
	/** Custom color for the last updated badge (empty for default accent color) */
	lastUpdatedBadgeColor: string;
}

export const DEFAULT_SETTINGS: RunningHeadSettings = {
	dateField: "date",
	lastUpdatedField: "updated",
	dateLocale: "en-US",
	useShortDate: false,
	showReadingTime: true,
	wordsPerMinute: 200,
	showLastUpdated: true,
	layoutStyle: "blog",
	titleFontSize: 3,
	badgeFontSize: 0.75,
	customFields: [],
	customDateFormat: "",
	basesIcons: [],
	showBreadcrumb: false,
	breadcrumbHighlightLast: false,
	showScrollProgress: false,
	scrollProgressColor: "",
	breadcrumbHighlightColor: "",
	lastUpdatedBadgeColor: "",
};
