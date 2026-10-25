import { createContext } from 'react'
import type { Project, SkillCategory, Technology } from '../types/content'
import type { Locale, Messages } from './types'

export interface I18nValue {
  locale: Locale
  t: Messages
  /** Percorso nella lingua corrente: path('/projects/uninotes'). */
  path: (to: string) => string
  projects: Project[]
  skills: SkillCategory[]
  tech: (id: string) => Technology
}

export const I18nContext = createContext<I18nValue | null>(null)
