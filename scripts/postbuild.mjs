// Dopo `vite build`: crea una pagina HTML statica per ogni lingua attiva e per ogni progetto
// (titolo, descrizione, lingua e anteprima social dedicati, con i collegamenti hreflang tra le
// versioni), la pagina 404 per GitHub Pages, sitemap.xml e robots.txt.
// I dati arrivano da src/data e src/i18n, caricati tramite Vite: nessuna informazione duplicata.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const server = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})

try {
  const { site } = await server.ssrLoadModule('/src/data/site.ts')
  const { localizeProjects } = await server.ssrLoadModule('/src/data/projects.ts')
  const { localeList, localePath } = await server.ssrLoadModule('/src/i18n/config.ts')
  const { getMessages } = await server.ssrLoadModule('/src/i18n/messages.ts')
  const template = await readFile(join(dist, 'index.html'), 'utf8')

  const escape = (value) =>
    value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const absolute = (path) => new URL(path, site.url).href

  /** Collegamenti alle altre lingue della stessa pagina (path senza prefisso di lingua). */
  const alternates = (path) =>
    [
      ...localeList.map((info) => `    <link rel="alternate" hreflang="${info.htmlLang}" href="${absolute(localePath(info.code, path))}" />`),
      `    <link rel="alternate" hreflang="x-default" href="${absolute(path)}" />`,
    ].join('\n')

  /** Sostituisce i metadati della home inglese con quelli della pagina indicata. */
  const withMeta = (html, { info, title, description, url, image, path, noindex = false }) => {
    let out = html
      .replace(/<html lang="[^"]*">/, `<html lang="${info.htmlLang}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(description)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
      .replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${info.ogLocale}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escape(description)}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escape(description)}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`)
    const extra = [path ? alternates(path) : '', noindex ? '    <meta name="robots" content="noindex" />' : ''].filter(Boolean)
    if (extra.length) out = out.replace('</head>', `${extra.join('\n')}\n  </head>`)
    return out
  }

  const write = async (path, html) => {
    const dir = join(dist, path)
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, 'index.html'), html)
  }

  const urls = []
  let pages = 0
  for (const info of localeList) {
    const t = getMessages(info.code)
    const projects = localizeProjects(t)

    const homePath = localePath(info.code, '/')
    await write(
      homePath,
      withMeta(template, {
        info,
        title: t.meta.title,
        description: t.meta.description,
        url: absolute(homePath),
        image: absolute(site.seo.ogImage),
        path: '/',
      }),
    )
    urls.push(absolute(homePath))
    pages++

    for (const project of projects) {
      const neutral = `/projects/${project.slug}/`
      const path = localePath(info.code, neutral)
      await write(
        path,
        withMeta(template, {
          info,
          title: project.seo?.title ?? `${project.name} · ${site.brand.name}`,
          description: project.seo?.description ?? project.summary,
          url: absolute(path),
          image: absolute(project.seo?.image ?? site.seo.ogImage),
          path: neutral,
        }),
      )
      urls.push(absolute(path))
      pages++
    }
  }

  // GitHub Pages mostra 404.html per gli indirizzi inesistenti: l'app visualizza la pagina "non trovata".
  const en = getMessages('en')
  await writeFile(
    join(dist, '404.html'),
    withMeta(template, {
      info: localeList[0],
      title: en.notFound.metaTitle,
      description: en.meta.description,
      url: absolute('/'),
      image: absolute(site.seo.ogImage),
      noindex: true,
    }),
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`
  await writeFile(join(dist, 'sitemap.xml'), sitemap)
  await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`)
  // Evita che GitHub Pages elabori il sito con Jekyll.
  await writeFile(join(dist, '.nojekyll'), '')

  console.log(
    `postbuild: ${pages} pagine in ${localeList.length} lingue (${localeList.map((info) => info.code).join(', ')}), 404.html, sitemap.xml e robots.txt generati.`,
  )
} finally {
  await server.close()
}
