import { useEffect } from 'react'
import { site } from '../data/site'
import { localeInfo } from '../i18n/config'
import { useI18n } from '../i18n/useI18n'

interface Meta {
  title?: string
  description?: string
  /** Percorso già nella lingua corrente (es. '/it/projects/uninotes/'). */
  path?: string
  image?: string
}

function setMeta(selector: string, attribute: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value)
}

/**
 * Aggiorna titolo, descrizione, canonical e Open Graph durante la navigazione.
 * Le stesse informazioni sono scritte nell'HTML statico da scripts/postbuild.mjs.
 */
export function useDocumentMeta({ title, description, path, image }: Meta = {}) {
  const { t, locale, path: localized } = useI18n()

  useEffect(() => {
    const fullTitle = title ?? t.meta.title
    const desc = description ?? t.meta.description
    const url = new URL(path ?? localized('/'), site.url).href
    const img = new URL(image ?? site.seo.ogImage, site.url).href

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:image"]', 'content', img)
    setMeta('meta[property="og:locale"]', 'content', localeInfo[locale].ogLocale)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', desc)
    setMeta('meta[name="twitter:image"]', 'content', img)
  }, [title, description, path, image, t, locale, localized])
}
