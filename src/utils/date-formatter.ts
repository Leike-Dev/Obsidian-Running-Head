import { moment } from "obsidian";

/**
 * Format a date value from frontmatter into a human-readable string.
 *
 * Accepts ISO date strings ("2024-08-06"), full ISO timestamps, or anything
 * that `new Date()` can parse. Returns a locale-formatted string such as
 * "August 6, 2024" (for "en-US") or "6 de agosto de 2024" (for "pt-BR").
 * When `useShortDate` is true, uses abbreviated month names (e.g. "Aug 6, 2024").
 * If `customFormat` is provided, it uses Moment.js to format the date exactly.
 *
 * @param dateValue - The raw date value from frontmatter (string or Date).
 * @param locale - BCP 47 locale tag (e.g. "en-US", "pt-BR"). Defaults to "en-US".
 * @param useShortDate - If true, use abbreviated month names. Defaults to false.
 * @param customFormat - Optional Moment.js format string (e.g. "DD/MM/YYYY").
 * @returns Formatted date string, or `null` if the value cannot be parsed.
 */
export function formatDate(dateValue: unknown, locale = "en-US", useShortDate = false, customFormat = ""): string | null {
	if (dateValue == null) {
		return null;
	}

	let date: Date;

	if (dateValue instanceof Date) {
		date = dateValue;
	} else if (typeof dateValue === "string") {
		// Handle YYYY-MM-DD format by appending T00:00:00 to avoid timezone shifts
		const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
		date = isoDateOnly.test(dateValue)
			? new Date(dateValue + "T00:00:00")
			: new Date(dateValue);
	} else if (typeof dateValue === "number") {
		date = new Date(dateValue);
	} else {
		return null;
	}

	if (isNaN(date.getTime())) {
		return null;
	}

	// Use custom format with Moment.js if provided
	if (customFormat && customFormat.trim().length > 0) {
		return moment(date).locale(locale).format(customFormat);
	}

	// Fallback to native Intl formatter
	return date.toLocaleDateString(locale, {
		year: "numeric",
		month: useShortDate ? "short" : "long",
		day: "numeric",
	});
}
