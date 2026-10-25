import type { Technology } from '../types/content'

/**
 * Catalogo dei marchi (linguaggi, framework, servizi): progetti e competenze vi fanno riferimento per nome.
 * Aggiungi qui una tecnologia prima di usarla altrove.
 */
const technologies: Record<string, Technology> = {
  Flutter: { name: 'Flutter', icon: { brand: 'flutter' } },
  Dart: { name: 'Dart', icon: { brand: 'dart' } },
  Python: { name: 'Python', icon: { brand: 'python' } },
  SQLite: { name: 'SQLite', icon: { brand: 'sqlite' } },
  Git: { name: 'Git', icon: { brand: 'git' } },
  GitHub: { name: 'GitHub', icon: { brand: 'github' } },
  'GitHub Actions': { name: 'GitHub Actions', icon: { brand: 'githubactions' } },
  'GitHub Pages': { name: 'GitHub Pages', icon: { brand: 'github' } },
  Gemini: { name: 'Gemini', icon: { brand: 'googlegemini' } },
  Whisper: { name: 'Whisper', icon: { brand: 'openai' } },
  OneDrive: { name: 'OneDrive', icon: { brand: 'microsoftonedrive' } },
  'Google Drive': { name: 'Google Drive', icon: { brand: 'googledrive' } },
  React: { name: 'React', icon: { brand: 'react' } },
  TypeScript: { name: 'TypeScript', icon: { brand: 'typescript' } },
  Vite: { name: 'Vite', icon: { brand: 'vite' } },
  'Tailwind CSS': { name: 'Tailwind CSS', icon: { brand: 'tailwindcss' } },
  Firebase: { name: 'Firebase', icon: { brand: 'firebase' } },
  PostHog: { name: 'PostHog', icon: { brand: 'posthog' } },
  Supabase: { name: 'Supabase', icon: { brand: 'supabase' } },
  Brevo: { name: 'Brevo', icon: { brand: 'brevo' } },
  Blender: { name: 'Blender', icon: { brand: 'blender' } },
  Stripe: { name: 'Stripe', icon: { brand: 'stripe' } },
  RevenueCat: { name: 'RevenueCat', icon: { brand: 'revenuecat' } },
  SQL: { name: 'SQL', icon: { ui: 'database' } },
  'Claude Code': { name: 'Claude Code', icon: { brand: 'claude' } },
  ChatGPT: { name: 'ChatGPT', icon: { brand: 'openai' } },
  R: { name: 'R', icon: { brand: 'r' } },
  Tableau: { name: 'Tableau', icon: { brand: 'tableau' } },
  BigQuery: { name: 'BigQuery', icon: { brand: 'googlebigquery' } },
  FastAPI: { name: 'FastAPI', icon: { brand: 'fastapi' } },
  Cloudflare: { name: 'Cloudflare', icon: { brand: 'cloudflare' } },
  Sentry: { name: 'Sentry', icon: { brand: 'sentry' } },
  Fastlane: { name: 'Fastlane', icon: { brand: 'fastlane' } },
  PostgreSQL: { name: 'PostgreSQL', icon: { brand: 'postgresql' } },
}

/**
 * Competenze che non sono marchi: la chiave è un id stabile, il nome si traduce in
 * `tech[id]` dei file delle lingue; qui c'è solo l'icona.
 */
const concepts: Record<string, Technology['icon']> = {
  'vibe-coding': { ui: 'sparkles' },
  'prompt-engineering': { ui: 'brain' },
  'ai-research': { ui: 'search' },
  'data-analysis': { ui: 'chart' },
  'data-cleaning': { ui: 'layers' },
  spreadsheets: { brand: 'googlesheets' },
  'app-design': { ui: 'pen-tool' },
  'graphics-2d': { ui: 'palette' },
  'graphics-3d': { brand: 'blender' },
  'health-integrations': { ui: 'heart-pulse' },
  'camera-barcode': { ui: 'scan' },
  'offline-first': { ui: 'server' },
  encryption: { ui: 'lock' },
  'constrained-llm': { ui: 'bot' },
  'model-evaluation': { ui: 'flask' },
  'property-testing': { ui: 'flask' },
  'device-testing': { ui: 'smartphone' },
  accessibility: { ui: 'accessibility' },
  'privacy-gdpr': { ui: 'shield' },
  'store-requirements': { brand: 'apple' },
  'market-analysis': { ui: 'trending' },
  pricing: { ui: 'coins' },
  roadmap: { ui: 'map' },
}

/** Id di tutte le tecnologie e competenze conosciute. */
export const technologyIds = [...Object.keys(technologies), ...Object.keys(concepts)]

/** Tecnologia o competenza con il nome nella lingua indicata (i marchi non si traducono). */
export function getTechnology(id: string, names?: Record<string, string>): Technology {
  if (id in concepts) return { name: names?.[id] ?? id, icon: concepts[id] }
  return technologies[id] ?? { name: id, icon: { ui: 'code' } }
}
