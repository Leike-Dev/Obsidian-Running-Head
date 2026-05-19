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

	// Regular expression for CJK characters (Chinese, Japanese, Korean)
	// Uses Unicode property escapes for accurate matching
	const cjkRegex = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;

	// Extract and count all CJK characters. Each CJK character is roughly equivalent 
	// to a word in terms of reading time calculation.
	const cjkMatches = body.match(cjkRegex) || [];
	const cjkCount = cjkMatches.length;

	// Remove CJK characters from the body to count Western words accurately,
	// replacing them with spaces to preserve boundaries between western words.
	const westernBody = body.replace(cjkRegex, " ");

	// Count Western words efficiently
	const westernCount = westernBody.match(/\S+/g)?.length || 0;

	// Total elements to process
	const totalCount = westernCount + cjkCount;

	const minutes = Math.ceil(totalCount / wordsPerMinute);
	return Math.max(1, minutes);
}
