import { en } from './locales/en.ts'
import { es } from './locales/es.ts'
import { fr } from './locales/fr.ts'
import { it } from './locales/it.ts'
import type { Locale, Messages } from './types.ts'

/**
 * Testi disponibili per lingua. Una lingua senza file usa l'inglese
 * (ma resta comunque nascosta finché non è attivata in config.ts).
 */
const available: Partial<Record<Locale, Messages>> = { en, it, fr, es }

export function getMessages(locale: Locale): Messages {
  return available[locale] ?? en
}
