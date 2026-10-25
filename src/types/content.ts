import type { BrandIconName } from '../data/brandIcons.ts'

/** Nome di un'icona: marchio (Simple Icons) oppure icona generica dell'interfaccia. */
export type IconRef =
  | { brand: BrandIconName }
  | { ui: UiIconName }

export type UiIconName =
  | 'mail'
  | 'globe'
  | 'download'
  | 'code'
  | 'smartphone'
  | 'monitor'
  | 'sparkles'
  | 'dumbbell'
  | 'database'
  | 'cloud'
  | 'wrench'
  | 'layers'
  | 'heart'
  | 'mic'
  | 'book'
  | 'graduation'
  | 'calendar'
  | 'shield'
  | 'accessibility'
  | 'zap'
  | 'lightbulb'
  | 'map-pin'
  | 'rss'
  | 'utensils'
  | 'trending'
  | 'chef-hat'
  | 'heart-pulse'
  | 'watch'
  | 'headphones'
  | 'file-text'
  | 'audio'
  | 'languages'
  | 'palette'
  | 'search'
  | 'chart'
  | 'brain'
  | 'bot'
  | 'pen-tool'
  | 'flask'
  | 'coins'
  | 'map'
  | 'scan'
  | 'server'
  | 'lock'

export interface SocialLink {
  id: string
  label: string
  /** null = non ancora disponibile: il link non viene mostrato. */
  url: string | null
  icon: IconRef
  /** Testo breve mostrato accanto al link nella sezione contatti. */
  handle?: string
}

export type ThemePreference = 'light' | 'dark' | 'system'

/** Ancore delle sezioni della home (uguali in tutte le lingue). */
export type SectionId = 'home' | 'projects' | 'about' | 'skills' | 'contact'

export interface EducationEntry {
  /** Corso o titolo, es. "Ingegneria Informatica". */
  title: string
  institution: string
  /** Periodo o stato, es. "Da settembre 2026 · in corso". */
  period: string
}

export interface Certification {
  name: string
  issuer: string
  /** Data di rilascio, es. "Giugno 2026". */
  issued: string
  /** Pagina pubblica della credenziale, se disponibile. */
  url?: string
}

/**
 * Configurazione del sito senza testi: i testi stanno nei file delle lingue (src/i18n/locales).
 * Un link con `url: null` non viene mostrato; una sezione con `false` resta nascosta.
 */
export interface SiteConfig {
  url: string
  brand: {
    name: string
    monogram: string
  }
  seo: {
    ogImage: string
  }
  theme: {
    default: ThemePreference
    storageKey: string
  }
  /** Mostra i riquadri "Da completare" per i contenuti mancanti. Disattivalo prima della pubblicazione. */
  showPlaceholders: boolean
  nav: SectionId[]
  hero: {
    featuredProjectSlug?: string
  }
  /** Quali blocchi della sezione "Chi sono" mostrare. */
  about: {
    interests: boolean
    philosophy: boolean
    education: boolean
    location: boolean
    certifications: boolean
    languages: boolean
    /** Icone dei principi di "Come lavoro", nello stesso ordine dei testi. */
    philosophyIcons: UiIconName[]
  }
  contact: {
    email: string
    subjectPrefix: string
  }
  socials: SocialLink[]
}

export type ProjectCategory = 'mobile' | 'web' | 'desktop' | 'ai'

export type ProjectStatus = 'live' | 'beta' | 'development' | 'planned'

export interface ProjectTheme {
  /** Colore principale del progetto (pulsanti, accenti). */
  primary: string
  /** Colore scuro di base per la copertina della pagina di dettaglio. */
  deep: string
  /** Secondo colore della sfumatura della copertina. */
  accent: string
  /** Sfondo della miniatura nelle card. */
  tile: string
  /** Colore del testo leggibile sopra `tile`. */
  onTile: 'light' | 'dark'
}

export type ProjectLinkKind = 'demo' | 'site' | 'repo' | 'download' | 'store' | 'support'

export interface ProjectLink {
  kind: ProjectLinkKind
  label: string
  url: string
}

export interface ProjectFeature {
  title: string
  text: string
  icon: UiIconName
}

export interface ProjectImage {
  src: string
  /** Variante per il tema scuro del sito, se disponibile. */
  srcDark?: string
  alt: string
  caption?: string
}

export interface Project {
  slug: string
  name: string
  /** true se il nome è provvisorio. */
  nameIsProvisional?: boolean
  tagline: string
  summary: string
  description: string[]
  categories: ProjectCategory[]
  status: ProjectStatus
  statusNote?: string
  platforms?: string[]
  /** Nomi delle tecnologie, devono esistere in src/data/technologies.ts. */
  tech: string[]
  /** Competenze impiegate nel progetto (stesso catalogo delle tecnologie). */
  skills?: string[]
  theme: ProjectTheme
  logo?: string
  /** Icona generica usata quando il progetto non ha ancora un logo. */
  fallbackIcon?: UiIconName
  cover?: ProjectImage
  problem?: string
  goals?: string[]
  features?: ProjectFeature[]
  decisions?: { title: string; text: string }[]
  screenshots?: ProjectImage[]
  /** Nota mostrata sotto la galleria, ad esempio "dati di esempio". */
  screenshotsNote?: string
  /** Immagine grande nella copertina della pagina di dettaglio (al posto di `cover`). */
  showcase?: ProjectImage
  links: ProjectLink[]
  seo?: { title?: string; description?: string; image?: string }
  /** Elenco trasparente dei contenuti ancora da inserire. */
  todo?: string[]
}

/**
 * Dati di un progetto che non dipendono dalla lingua. I testi (nome, descrizioni, didascalie,
 * etichette dei link…) stanno in `projects[slug]` dei file delle lingue; gli elenchi di icone,
 * immagini e link sono nello stesso ordine dei testi corrispondenti.
 */
export interface ProjectData {
  slug: string
  nameIsProvisional?: boolean
  categories: ProjectCategory[]
  status: ProjectStatus
  platforms?: string[]
  tech: string[]
  skills?: string[]
  theme: ProjectTheme
  logo?: string
  fallbackIcon?: UiIconName
  cover?: string
  /** Immagine grande della pagina del progetto e della home; `srcDark` per il tema scuro. */
  showcase?: { src: string; srcDark?: string }
  screenshots?: { src: string; srcDark?: string }[]
  featureIcons?: UiIconName[]
  links: { kind: ProjectLinkKind; url: string }[]
  seoImage?: string
}

export interface Technology {
  name: string
  icon: IconRef
}

export interface SkillCategory {
  id: string
  title: string
  description: string
  icon: UiIconName
  items: { tech: string; note?: string; visible?: boolean }[]
}

/** Categoria di competenze senza testi (titolo, descrizione e note sono nei file delle lingue). */
export interface SkillCategoryData {
  id: string
  icon: UiIconName
  items: { tech: string; visible?: boolean }[]
}
