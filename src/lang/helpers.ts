// ============================================================================
// LOCALIZATION HELPERS
// Resolves translation keys using the user's Obsidian language setting.
// ============================================================================

import { en } from './en';
import { ptBR } from './pt-BR';
import { es } from './es';
import { fr } from './fr';
import { zhCN } from './zh-CN';

const localeMap: { [key: string]: Partial<typeof en> } = {
	'en': en,
	'pt': ptBR,
	'pt-br': ptBR,
	'es': es,
	'fr': fr,
	'zh': zhCN,
	'zh-cn': zhCN,
};

import { moment } from 'obsidian';
const locale = moment.locale();

/**
 * Returns the localized string for the given translation key.
 * Fallback chain: overrideLocale → user's locale → English → raw key name.
 * @param key A valid translation key from the English locale file.
 * @param overrideLocale Optional locale to force a specific language (e.g. "pt-BR").
 * @returns The translated string, or the key itself if no translation is found.
 */
export function t(key: keyof typeof en, overrideLocale?: string): string {
	const activeLocale = (overrideLocale || locale).toLowerCase();
	// Try full match (e.g. "pt-br"), then base language match (e.g. "pt"), then fallback to English
	const baseLang = activeLocale.split('-')[0] || '';
	const lang = localeMap[activeLocale] || localeMap[baseLang] || en;
	return (lang as Record<string, string>)[key] || (en as Record<string, string>)[key] || key;
}
