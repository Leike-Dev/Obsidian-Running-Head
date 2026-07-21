import { moment } from "obsidian";

interface MomentLike {
	isValid(): boolean;
	format(f?: string): string;
	locale(l: string): MomentLike;
	hours(): number;
	minutes(): number;
	creationData(): { format?: unknown };
}

/** Date formats supported for parsing note titles as dates. */
const DATE_FORMATS = [
	"YYYY-MM-DD",
	"YYYY-MM-DD HHmm",
	"YYYY-MM-DD HH:mm",
	"YYYY-MM-DD HH:mm:ss",
	"YYYYMMDD",
	"YYYYMMDDHHmm",
	"YYYYMMDDHHmmss",
	"YYYYMMDD HHmm",
	"YYYYMMDD HH:mm",
	"DD-MM-YYYY",
	"DD-MM-YYYY HH:mm",
	"DD-MM-YYYY HHmm",
	"DD.MM.YYYY",
	"YYYY.MM.DD",
	"YYYY/MM/DD",
	"DD/MM/YYYY"
];

/**
 * Attempt to parse a note's basename as a date and return a formatted string.
 * If the basename cannot be parsed as a date, returns the original (trimmed) value.
 *
 * @param basename - The note's file basename (without extension).
 * @param dateLocale - BCP 47 locale tag for Moment.js formatting.
 * @param customDateFormat - Optional Moment.js format string. When provided, overrides auto-detection.
 * @returns The formatted date string, or the original basename if unparseable.
 */
export function formatTitleAsDate(basename: string, dateLocale: string, customDateFormat: string): string {
	const text = basename.trim();

	let parsedDate = moment(text, DATE_FORMATS, true) as unknown as MomentLike;

	if (!parsedDate.isValid()) {
		const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/;
		const dateObj = isoDateOnly.test(text)
			? new Date(text + "T00:00:00")
			: new Date(text);

		if (!isNaN(dateObj.getTime())) {
			parsedDate = moment(dateObj) as unknown as MomentLike;
		}
	}

	if (!parsedDate.isValid()) {
		return text;
	}

	if (customDateFormat) {
		return parsedDate.format(customDateFormat);
	}

	const creationData = parsedDate.creationData();
	const matchedFormat = creationData?.format;
	const hasTime = parsedDate.hours() > 0 || parsedDate.minutes() > 0;

	let includesTime = false;
	if (typeof matchedFormat === "string") {
		includesTime = matchedFormat.includes("HH") || matchedFormat.includes("mm") || matchedFormat.includes("hh");
	} else if (Array.isArray(matchedFormat) && matchedFormat.length > 0) {
		const firstFormat = typeof matchedFormat[0] === "string" ? matchedFormat[0] : "";
		includesTime = firstFormat.includes("HH") || firstFormat.includes("mm") || firstFormat.includes("hh");
	} else {
		includesTime = hasTime;
	}

	return parsedDate.locale(dateLocale).format(includesTime || hasTime ? "LLL" : "LL");
}
