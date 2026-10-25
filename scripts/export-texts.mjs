// Esporta tutti i testi di una lingua in un file Markdown da rileggere e correggere.
// Uso: node scripts/export-texts.mjs [lingua] [file]   (predefiniti: it, TESTI_PORTFOLIO.md)
// Ogni riga ha il codice del testo in grassetto: serve a riportare le correzioni nel sito.
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [locale = 'it', output = 'TESTI_PORTFOLIO.md'] = process.argv.slice(2)

const sections = [
  ['meta', 'Titolo e descrizione per Google e per le anteprime social'],
  ['brand', 'Marchio (sotto il nome nel riquadro in alto a sinistra e nel footer)'],
  ['nav', 'Barra delle sezioni'],
  ['hero', 'Apertura della pagina (hero)'],
  ['sections', 'Titoli delle sezioni della home'],
  ['projectsList', 'Elenco dei progetti e filtri'],
  ['categories', 'Categorie dei progetti'],
  ['status', 'Stati dei progetti'],
  ['projects', 'Progetti (card e pagine di dettaglio)'],
  ['project', 'Etichette della pagina di dettaglio di un progetto'],
  ['about', 'Chi sono'],
  ['skills', 'Competenze: titoli, descrizioni e note'],
  ['tech', 'Competenze: nomi che si traducono (i nomi di marchi come Flutter o Python restano uguali)'],
  ['contact', 'Contatti e modulo'],
  ['footer', 'Footer'],
  ['pending', 'Riquadri “Da completare” (visibili solo finché il sito non è pubblicato)'],
  ['notFound', 'Pagina non trovata (404)'],
  ['a11y', 'Testi per l’accessibilità (letti dai lettori di schermo, non visibili)'],
]

const server = await createServer({ root, logLevel: 'error', server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { getMessages } = await server.ssrLoadModule('/src/i18n/messages.ts')
  const t = getMessages(locale)
  const lines = []

  const walk = (value, key, depth) => {
    if (typeof value === 'string') {
      lines.push(`- **${key}**: ${value}`)
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, `${key}[${index + 1}]`, depth))
    } else if (value && typeof value === 'object') {
      const entries = Object.entries(value)
      // Nei progetti e nelle competenze ogni voce di secondo livello ha il suo sottotitolo.
      if (depth === 1 && (key === 'projects' || key === 'skills')) {
        for (const [child, inner] of entries) {
          lines.push('', `### ${key === 'projects' ? inner.name : inner.title}`, '')
          walk(inner, `${key}.${child}`, depth + 1)
        }
        return
      }
      for (const [child, inner] of entries) walk(inner, `${key}.${child}`, depth + 1)
    }
  }

  lines.push(
    '# Testi del portfolio Simo-Magnus',
    '',
    `Lingua: **${locale}** · Generato da \`npm run texts:export\` il ${new Date().toLocaleDateString('it-IT')}.`,
    '',
    '## Come correggere',
    '',
    '- Modifica **solo il testo dopo i due punti**; lascia com’è il codice in grassetto (serve a me per ritrovare il punto del sito).',
    '- Per **togliere** un testo cancellalo e scrivi `[ELIMINA]`; per **aggiungerne** uno (es. un interesse o una funzionalità) aggiungi una riga con `[NUOVO]` dopo l’ultima voce dello stesso elenco.',
    '- I segnaposto tra graffe, come `{name}`, `{email}` o `{n}`, vengono sostituiti dal sito: lasciali dove sono.',
    '- Puoi scrivere note per me su una riga che inizia con `>`.',
    '- Le altre lingue (inglese, francese, spagnolo) verranno tradotte da questo testo dopo le tue correzioni.',
    '',
  )

  for (const [key, title] of sections) {
    if (!(key in t)) continue
    lines.push(`## ${title}`, '')
    walk(t[key], key, 1)
    lines.push('')
  }

  await writeFile(join(root, output), `${lines.join('\n').replace(/\n{3,}/g, '\n\n')}\n`, 'utf8')
  console.log(`Testi esportati in ${output}`)
} finally {
  await server.close()
}
