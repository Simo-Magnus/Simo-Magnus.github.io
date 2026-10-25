import type { Locale } from './types.ts'

export interface LocaleInfo {
  code: Locale
  /** Nome della lingua scritto nella lingua stessa. */
  label: string
  short: string
  htmlLang: string
  ogLocale: string
  /** Prefisso degli indirizzi: l'inglese è la lingua predefinita, alla radice. */
  prefix: string
  /** false finché i testi della lingua non sono pronti: niente pagine né voce nel selettore. */
  enabled: boolean
}

export const defaultLocale: Locale = 'en'

const allLocales: LocaleInfo[] = [
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US', prefix: '', enabled: true },
  { code: 'it', label: 'Italiano', short: 'IT', htmlLang: 'it', ogLocale: 'it_IT', prefix: '/it', enabled: true },
  { code: 'fr', label: 'Français', short: 'FR', htmlLang: 'fr', ogLocale: 'fr_FR', prefix: '/fr', enabled: true },
  { code: 'es', label: 'Español', short: 'ES', htmlLang: 'es', ogLocale: 'es_ES', prefix: '/es', enabled: true },
]

/** Lingue attive, nell'ordine del selettore. */
export const localeList = allLocales.filter((info) => info.enabled)

export const localeInfo = Object.fromEntries(allLocales.map((info) => [info.code, info])) as Record<Locale, LocaleInfo>

/** Percorso nella lingua indicata: localePath('it', '/projects/uninotes') → '/it/projects/uninotes'. */
export function localePath(locale: Locale, path: string): string {
  const prefix = localeInfo[locale].prefix
  if (!prefix) return path
  return path === '/' ? `${prefix}/` : `${prefix}${path}`
}

/** Riconosce la lingua dal percorso e restituisce anche il percorso senza prefisso. */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  for (const info of localeList) {
    if (!info.prefix) continue
    if (pathname === info.prefix || pathname.startsWith(`${info.prefix}/`)) {
      return { locale: info.code, rest: pathname.slice(info.prefix.length) || '/' }
    }
  }
  return { locale: defaultLocale, rest: pathname || '/' }
}
