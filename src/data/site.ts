import type { SiteConfig } from '../types/content.ts'

/**
 * Configurazione centrale del sito: indirizzi, social, preferenze e quali blocchi mostrare.
 * I testi sono nei file delle lingue in src/i18n/locales (uno per lingua).
 * Un link con `url: null` non viene mostrato; un blocco con `false` resta nascosto.
 */
export const site: SiteConfig = {
  url: 'https://simo-magnus.github.io',
  brand: {
    name: 'Simo-Magnus',
    monogram: 'SM',
  },
  seo: {
    ogImage: '/og-image.jpg',
  },
  theme: {
    default: 'system',
    storageKey: 'sm-theme',
  },
  showPlaceholders: false,
  nav: ['home', 'projects', 'about', 'skills', 'contact'],
  hero: {
    featuredProjectSlug: 'uninotes',
  },
  about: {
    interests: true,
    philosophy: true,
    education: true,
    location: true,
    certifications: true,
    languages: true,
    philosophyIcons: ['shield', 'lightbulb', 'accessibility'],
  },
  contact: {
    email: 'simomagnus.dev@gmail.com',
    subjectPrefix: '[Portfolio]',
  },
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/Simo-Magnus', icon: { brand: 'github' }, handle: 'Simo-Magnus' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/simone-m-a021b4361/', icon: { brand: 'linkedin' }, handle: 'Simone M.' },
    { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com/@UniNotes-app', icon: { brand: 'youtube' }, handle: '@UniNotes-app' },
    { id: 'kofi', label: 'Ko-fi', url: 'https://ko-fi.com/uninotes', icon: { brand: 'kofi' }, handle: 'uninotes' },
  ],
}

/** Social con un indirizzo valido, nell'ordine della configurazione. */
export const activeSocials = site.socials.filter(
  (social): social is typeof social & { url: string } => social.url !== null,
)
