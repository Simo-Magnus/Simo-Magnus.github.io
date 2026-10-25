import type { Messages } from '../i18n/types.ts'
import type { SkillCategory, SkillCategoryData } from '../types/content'

/**
 * Competenze per ambito, senza testi (titoli, descrizioni e note sono in `skills[id]` dei file
 * delle lingue). Una categoria senza voci visibili non viene mostrata; per nascondere una voce
 * senza cancellarla usa `visible: false`.
 * Le voci di backend, integrazioni, qualità e prodotto seguono il piano di progettazione di trAIning;
 * quelle di analisi dei dati il programma del Google Data Analytics Professional Certificate.
 */
export const skillData: SkillCategoryData[] = [
  { id: 'linguaggi', icon: 'code', items: [{ tech: 'Dart' }, { tech: 'Python' }, { tech: 'SQL' }, { tech: 'R' }] },
  { id: 'mobile-desktop', icon: 'smartphone', items: [{ tech: 'Flutter' }, { tech: 'offline-first' }] },
  { id: 'database', icon: 'database', items: [{ tech: 'SQLite' }, { tech: 'PostgreSQL' }, { tech: 'FastAPI' }, { tech: 'Supabase' }] },
  { id: 'ai', icon: 'sparkles', items: [{ tech: 'Gemini' }, { tech: 'Whisper' }, { tech: 'constrained-llm' }, { tech: 'model-evaluation' }] },
  {
    id: 'sviluppo-ai',
    icon: 'bot',
    items: [{ tech: 'vibe-coding' }, { tech: 'Claude Code' }, { tech: 'ChatGPT' }, { tech: 'prompt-engineering' }, { tech: 'ai-research' }],
  },
  {
    id: 'dati',
    icon: 'chart',
    items: [{ tech: 'data-analysis' }, { tech: 'data-cleaning' }, { tech: 'spreadsheets' }, { tech: 'BigQuery' }, { tech: 'Tableau' }],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    items: [{ tech: 'OneDrive' }, { tech: 'Google Drive' }, { tech: 'Firebase' }, { tech: 'RevenueCat' }, { tech: 'Brevo' }, { tech: 'Cloudflare' }],
  },
  { id: 'integrazioni', icon: 'heart-pulse', items: [{ tech: 'health-integrations' }, { tech: 'camera-barcode' }] },
  {
    id: 'strumenti',
    icon: 'wrench',
    items: [{ tech: 'Git' }, { tech: 'GitHub' }, { tech: 'GitHub Actions' }, { tech: 'Fastlane' }, { tech: 'Sentry' }, { tech: 'GitHub Pages' }],
  },
  { id: 'qualita', icon: 'flask', items: [{ tech: 'property-testing' }, { tech: 'device-testing' }, { tech: 'encryption' }, { tech: 'accessibility' }] },
  {
    id: 'prodotto',
    icon: 'map',
    items: [{ tech: 'market-analysis' }, { tech: 'pricing' }, { tech: 'roadmap' }, { tech: 'privacy-gdpr' }, { tech: 'store-requirements' }],
  },
  { id: 'design', icon: 'palette', items: [{ tech: 'app-design' }, { tech: 'graphics-2d' }, { tech: 'graphics-3d' }] },
]

/** Categorie con i testi della lingua indicata, senza le voci nascoste. */
export function localizeSkills(t: Messages): SkillCategory[] {
  return skillData
    .map((category) => {
      const text = t.skills[category.id]
      return {
        id: category.id,
        icon: category.icon,
        title: text.title,
        description: text.description,
        items: category.items
          .filter((item) => item.visible !== false)
          .map((item) => ({ tech: item.tech, note: text.notes[item.tech] })),
      }
    })
    .filter((category) => category.items.length > 0)
}
