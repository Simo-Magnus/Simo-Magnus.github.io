import type { Certification, EducationEntry, ProjectCategory, ProjectStatus, SectionId } from '../types/content.ts'

export type Locale = 'en' | 'it' | 'fr' | 'es'

/** Testi di un progetto. Gli elenchi seguono l'ordine dei dati in src/data/projects.ts. */
export interface ProjectText {
  name: string
  tagline: string
  summary: string
  description: string[]
  statusNote?: string
  problem?: string
  goals?: string[]
  /** Stesso ordine di `featureIcons`. */
  features?: { title: string; text: string }[]
  decisions?: { title: string; text: string }[]
  /** Stesso ordine di `screenshots`. */
  screenshots?: { alt: string; caption: string }[]
  screenshotsNote?: string
  showcaseAlt?: string
  coverAlt?: string
  /** Etichette dei link, stesso ordine di `links`. */
  links?: string[]
  seo: { title: string; description: string }
  /** Contenuti ancora da inserire (mostrati solo con `showPlaceholders`). */
  todo?: string[]
}

/**
 * Tutti i testi del sito in una lingua. Ogni file in src/i18n/locales deve avere la stessa forma:
 * TypeScript segnala le chiavi mancanti o in più.
 * Nei testi, {nome} è un segnaposto sostituito dal programma (es. {n}, {name}, {email}).
 */
export interface Messages {
  meta: { title: string; description: string }
  brand: { role: string; tagline: string }
  nav: Record<SectionId, string>
  a11y: {
    skipToContent: string
    mainNav: string
    mobileNav: string
    themeToLight: string
    themeToDark: string
    themeLight: string
    themeDark: string
    openMenu: string
    closeMenu: string
    language: string
    /** "{name}, torna alla home" */
    backHome: string
    newTab: string
    /** "Scrivi a {email}" */
    writeTo: string
    profiles: string
    openProject: string
    status: string
    technologies: string
    skills: string
    projectSheet: string
    screenshotsUnavailable: string
    /** "e altre {n}" */
    more: string
    footerSections: string
  }
  hero: { subtitle: string; primaryCta: string; secondaryCta: string }
  sections: {
    projects: { title: string; description: string }
    about: { title: string }
    skills: { title: string; description: string }
    contact: { title: string; intro: string }
  }
  projectsList: {
    all: string
    filterLabel: string
    shownOne: string
    /** "{n} progetti mostrati" */
    shownMany: string
    empty: string
    showAll: string
    provisionalName: string
    techTbd: string
  }
  categories: Record<ProjectCategory, string>
  status: Record<ProjectStatus, string>
  about: {
    bio: string[]
    interestsTitle: string
    interests: string[]
    location: string
    photoAlt: string
    photoCredit: string
    educationTitle: string
    education: EducationEntry[]
    certificationsTitle: string
    certifications: Certification[]
    languagesTitle: string
    languages: { name: string; level: string }[]
    methodTitle: string
    philosophy: { title: string; text: string }[]
  }
  /** Titolo, descrizione e note di ogni categoria di competenze (chiave = id della categoria). */
  skills: Record<string, { title: string; description: string; notes: Record<string, string> }>
  /** Nomi tradotti delle competenze che non sono marchi (chiave = id in src/data/technologies.ts). */
  tech: Record<string, string>
  contact: {
    emailTitle: string
    copy: string
    copied: string
    copiedLive: string
    formTitle: string
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    message: string
    messagePlaceholder: string
    submit: string
    note: string
    /** "Se il programma di posta non si è aperto, scrivi direttamente a {email}." */
    opened: string
    /** "Messaggio da {name}" */
    mailSubject: string
    errors: {
      nameRequired: string
      /** "{min}" */
      nameShort: string
      /** "{max}" */
      nameLong: string
      emailRequired: string
      emailInvalid: string
      messageRequired: string
      messageShort: string
      messageLong: string
    }
  }
  footer: { description: string; sectionsTitle: string; projectsTitle: string; legal: string[] }
  pending: { title: string }
  project: {
    back: string
    about: string
    problem: string
    goals: string
    features: string
    screenshots: string
    screenshotsSoon: string
    decisions: string
    status: string
    platforms: string
    technologies: string
    tbd: string
    skills: string
    links: string
    others: string
    /** "Progetto successivo: {name}" */
    next: string
    /** "Logo di {name}" */
    logoAlt: string
  }
  notFound: { label: string; title: string; text: string; back: string; metaTitle: string }
  projects: Record<string, ProjectText>
}

/** Sostituisce i segnaposto {chiave} in un testo. */
export function fmt(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match))
}
