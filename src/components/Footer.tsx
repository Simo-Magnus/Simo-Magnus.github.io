import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { fmt } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import { LogoMark } from './Logo'
import { SocialLinks } from './SocialLinks'

const year = new Date().getFullYear()

export function Footer() {
  const { t, path, projects } = useI18n()
  const linkClass = 'inline-flex min-h-9 items-center text-15 text-fg-2 transition-colors hover:text-fg'
  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link to={path('/')} className="inline-flex items-center gap-3 rounded-14" aria-label={fmt(t.a11y.backHome, { name: site.brand.name })}>
            <LogoMark size={40} />
            <span>
              <span className="block font-display text-17 font-semibold">{site.brand.name}</span>
              <span className="block font-mono text-13 text-fg-3">{t.brand.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 text-15 text-fg-2">{t.footer.description}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label={t.a11y.footerSections}>
          <h2 className="card-title">{t.footer.sectionsTitle}</h2>
          <ul className="mt-4">
            {site.nav.map((id) => (
              <li key={id}>
                <Link to={{ pathname: path('/'), hash: `#${id}` }} className={linkClass}>
                  {t.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t.footer.projectsTitle}>
          <h2 className="card-title">{t.footer.projectsTitle}</h2>
          <ul className="mt-4">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={path(`/projects/${project.slug}`)} className={linkClass}>
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-13 text-fg-3 md:flex-row md:items-start md:justify-between">
          <p className="shrink-0 font-mono">
            © {year} {site.brand.name}
          </p>
          <div className="space-y-1 md:text-right">
            {t.footer.legal.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
