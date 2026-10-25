import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vitest/config'
import { site } from './src/data/site.ts'
import { localeInfo } from './src/i18n/config.ts'
import { en } from './src/i18n/locales/en.ts'

/** Inserisce in index.html i metadati della lingua predefinita (inglese) e della configurazione del sito. */
function siteMeta(): Plugin {
  const values: Record<string, string> = {
    SITE_TITLE: en.meta.title,
    SITE_DESCRIPTION: en.meta.description,
    SITE_URL: site.url,
    SITE_NAME: site.brand.name,
    SITE_OG_IMAGE: new URL(site.seo.ogImage, site.url).href,
    SITE_LOCALE: localeInfo.en.ogLocale,
    SITE_LANG: localeInfo.en.htmlLang,
    THEME_DEFAULT: site.theme.default,
    THEME_STORAGE_KEY: site.theme.storageKey,
  }
  return {
    name: 'site-meta',
    transformIndexHtml: (html) =>
      html.replace(/__([A-Z_]+)__/g, (match, key: string) => values[key] ?? match),
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Sito utente su GitHub Pages (simo-magnus.github.io): pubblicato alla radice.
  base: '/',
  plugins: [react(), tailwindcss(), siteMeta()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
