import { useEffect, useMemo, type ReactNode } from 'react'
import { localizeProjects } from '../data/projects'
import { localizeSkills } from '../data/skills'
import { getTechnology } from '../data/technologies'
import { localeInfo, localePath } from './config'
import { I18nContext, type I18nValue } from './context'
import { getMessages } from './messages'
import type { Locale } from './types'

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const value = useMemo<I18nValue>(() => {
    const t = getMessages(locale)
    return {
      locale,
      t,
      path: (to) => localePath(locale, to),
      projects: localizeProjects(t),
      skills: localizeSkills(t),
      tech: (id) => getTechnology(id, t.tech),
    }
  }, [locale])

  // Lingua del documento, per lettori di schermo, sillabazione e motori di ricerca.
  useEffect(() => {
    document.documentElement.lang = localeInfo[locale].htmlLang
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
