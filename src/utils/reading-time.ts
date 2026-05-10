/**
 * Calculate estimated reading time from note content.
 *
 * Strips YAML frontmatter (if present) and counts words in the remaining
 * body text, then divides by the given words-per-minute rate.
 *
 * @param content - Raw markdown content of the note (including frontmatter).
 * @param wordsPerMinute - Average reading speed. Defaults to 200.
 * @returns Estimated reading time in whole minutes (minimum 1).
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
	// Strip YAML frontmatter block (--- ... ---)
	const body = content.replace(/^---[\s\S]*?---\s*/m, "");

	// Count words efficiently using a global match for non-whitespace sequences.
	// This avoids creating a huge intermediate array from splitting and filtering.
	const wordCount = body.match(/\S+/g)?.length || 0;

	const minutes = Math.ceil(wordCount / wordsPerMinute);
	return Math.max(1, minutes);
}
