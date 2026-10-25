import type { Messages } from '../i18n/types.ts'
import trainingCover from '../assets/projects/training/cover-960.webp'
import trainingLogo from '../assets/projects/training/logo.webp'
import uninotesLogo from '../assets/projects/uninotes/logo.svg'
import unAppuntiDark from '../assets/projects/uninotes/screenshots/appunti-dark.webp'
import unAppuntiLight from '../assets/projects/uninotes/screenshots/appunti-light.webp'
import unDesktopHomeDark from '../assets/projects/uninotes/screenshots/desktop-home-dark.webp'
import unDesktopHomeLight from '../assets/projects/uninotes/screenshots/desktop-home-light.webp'
import unEsamiDark from '../assets/projects/uninotes/screenshots/esami-dark.webp'
import unEsamiLight from '../assets/projects/uninotes/screenshots/esami-light.webp'
import unFocusDark from '../assets/projects/uninotes/screenshots/focus-dark.webp'
import unFocusLight from '../assets/projects/uninotes/screenshots/focus-light.webp'
import unHomeDark from '../assets/projects/uninotes/screenshots/home-dark.webp'
import unHomeLight from '../assets/projects/uninotes/screenshots/home-light.webp'
import unLezioneDark from '../assets/projects/uninotes/screenshots/lezione-dark.webp'
import unLezioneLight from '../assets/projects/uninotes/screenshots/lezione-light.webp'
import unMedieDark from '../assets/projects/uninotes/screenshots/medie-dark.webp'
import unMedieLight from '../assets/projects/uninotes/screenshots/medie-light.webp'
import type { Project, ProjectCategory, ProjectData } from '../types/content'

/** Competenze AI impiegate in tutti i progetti (id del catalogo in technologies.ts). */
const aiSkills = ['vibe-coding', 'prompt-engineering', 'ai-research', 'data-analysis']

/**
 * Progetti del portfolio, senza testi: nomi, descrizioni, didascalie ed etichette sono in
 * `projects[slug]` dei file delle lingue. Gli elenchi (icone delle funzionalità, screenshot, link)
 * seguono lo stesso ordine dei testi corrispondenti.
 */
export const projectData: ProjectData[] = [
  {
    slug: 'uninotes',
    categories: ['mobile', 'desktop', 'ai'],
    status: 'beta',
    platforms: ['Android', 'iOS', 'Windows', 'macOS'],
    tech: ['Flutter', 'Dart', 'SQLite', 'Python', 'Whisper', 'Gemini', 'OneDrive', 'Google Drive', 'GitHub Actions'],
    skills: aiSkills,
    theme: { primary: '#1784FB', deep: '#0E3A7F', accent: '#1784FB', tile: '#FFFFFF', onTile: 'dark' },
    logo: uninotesLogo,
    featureIcons: ['graduation', 'mic', 'book', 'calendar', 'zap', 'cloud'],
    // Schermate generate dall'app vera con dati di esempio (D:\University_Notes\grafica_play\screenshot_portfolio).
    screenshots: [
      { src: unHomeLight, srcDark: unHomeDark },
      { src: unLezioneLight, srcDark: unLezioneDark },
      { src: unAppuntiLight, srcDark: unAppuntiDark },
      { src: unEsamiLight, srcDark: unEsamiDark },
      { src: unMedieLight, srcDark: unMedieDark },
      { src: unFocusLight, srcDark: unFocusDark },
    ],
    showcase: { src: unDesktopHomeLight, srcDark: unDesktopHomeDark },
    links: [
      { kind: 'site', url: 'https://simo-magnus.github.io/UniNotes/' },
      { kind: 'download', url: 'https://github.com/Simo-Magnus/UniNotes/releases/tag/ultima-build' },
      { kind: 'repo', url: 'https://github.com/Simo-Magnus/UniNotes' },
      { kind: 'support', url: 'https://ko-fi.com/uninotes' },
    ],
    seoImage: '/og/uninotes.jpg',
  },
  {
    slug: 'app-audiolibri',
    // [DA COMPLETARE] Nome non ancora annunciato.
    nameIsProvisional: true,
    categories: ['mobile', 'desktop', 'web', 'ai'],
    status: 'development',
    platforms: ['Android', 'iOS', 'Desktop', 'Web'],
    tech: ['Flutter', 'Dart', 'Python', 'Supabase', 'Stripe', 'RevenueCat'],
    skills: aiSkills,
    // Identità visiva provvisoria: colori e logo non sono ancora stati definiti.
    theme: { primary: '#7C3AED', deep: '#1A1033', accent: '#F472B6', tile: '#1A1033', onTile: 'light' },
    fallbackIcon: 'headphones',
    featureIcons: ['file-text', 'audio', 'languages'],
    links: [],
  },
  {
    slug: 'training',
    categories: ['mobile', 'ai'],
    status: 'development',
    platforms: ['Android', 'iOS'],
    tech: ['Flutter', 'Dart', 'SQLite', 'Supabase', 'PostgreSQL', 'SQL', 'Python', 'FastAPI', 'Firebase', 'RevenueCat', 'PostHog', 'Sentry', 'Brevo', 'Cloudflare', 'Fastlane', 'Blender'],
    // Competenze ricavate dal piano di progettazione dell'app.
    skills: [
      ...aiSkills,
      'constrained-llm',
      'model-evaluation',
      'offline-first',
      'encryption',
      'property-testing',
      'health-integrations',
      'privacy-gdpr',
      'pricing',
      'market-analysis',
      'app-design',
      'graphics-2d',
      'graphics-3d',
    ],
    theme: { primary: '#E86F08', deep: '#02060F', accent: '#38BDF8', tile: '#041426', onTile: 'light' },
    logo: trainingLogo,
    cover: trainingCover,
    featureIcons: ['dumbbell', 'utensils', 'trending', 'calendar', 'chef-hat', 'heart-pulse', 'watch'],
    links: [],
  },
]

/** Unisce dati e testi di una lingua nei progetti completi usati dai componenti. */
export function localizeProjects(t: Messages): Project[] {
  return projectData.map((data) => {
    const text = t.projects[data.slug]
    return {
      slug: data.slug,
      name: text.name,
      nameIsProvisional: data.nameIsProvisional,
      tagline: text.tagline,
      summary: text.summary,
      description: text.description,
      categories: data.categories,
      status: data.status,
      statusNote: text.statusNote,
      // "Desktop" e "Web" usano le etichette tradotte delle categorie; i nomi dei sistemi restano uguali.
      platforms: data.platforms?.map((name) => (name === 'Desktop' ? t.categories.desktop : name === 'Web' ? t.categories.web : name)),
      tech: data.tech,
      skills: data.skills,
      theme: data.theme,
      logo: data.logo,
      fallbackIcon: data.fallbackIcon,
      cover: data.cover ? { src: data.cover, alt: text.coverAlt ?? text.name } : undefined,
      showcase: data.showcase ? { ...data.showcase, alt: text.showcaseAlt ?? text.name } : undefined,
      problem: text.problem,
      goals: text.goals,
      features: (data.featureIcons ?? []).map((icon, i) => ({ icon, ...text.features![i] })),
      decisions: text.decisions,
      screenshots: (data.screenshots ?? []).map((shot, i) => ({ ...shot, ...text.screenshots![i] })),
      screenshotsNote: text.screenshotsNote,
      links: data.links.map((link, i) => ({ ...link, label: text.links![i] })),
      seo: { ...text.seo, image: data.seoImage },
      todo: text.todo,
    }
  })
}

export function findProject(list: Project[], slug: string | undefined): Project | undefined {
  return list.find((project) => project.slug === slug)
}

export function filterProjects(list: Project[], category: ProjectCategory | 'all'): Project[] {
  return category === 'all' ? list : list.filter((project) => project.categories.includes(category))
}

export const projectCategories: ProjectCategory[] = ['mobile', 'web', 'desktop', 'ai']
