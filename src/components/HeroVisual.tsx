import { Link } from 'react-router-dom'
import { findProject } from '../data/projects'
import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'
import { StatusBadge } from './StatusBadge'
import { ThemedImage } from './ThemedImage'

/**
 * Composizione della hero con schermate reali del progetto in evidenza:
 * la versione desktop e quella per telefono, che segue il tema del sito.
 */
export function HeroVisual() {
  const { t, path, projects } = useI18n()
  const project = findProject(projects, site.hero.featuredProjectSlug)
  const desktop = project?.showcase
  const phone = project?.screenshots?.[0]
  if (!project || !desktop) return null

  return (
    <div className="relative mx-auto w-full max-w-[600px] pb-16 pl-8 sm:pl-12">
      <figure className="surface p-2">
        <div aria-hidden="true" className="flex items-center gap-1.5 px-2.5 pt-1 pb-2.5">
          <span className="size-2 rounded-full bg-fg-3/40" />
          <span className="size-2 rounded-full bg-fg-3/40" />
          <span className="size-2 rounded-full bg-fg-3/40" />
        </div>
        <ThemedImage
          src={desktop.src}
          srcDark={desktop.srcDark}
          alt={desktop.alt}
          width={1280}
          height={720}
          decoding="async"
          fetchPriority="high"
          className="block aspect-video w-full rounded-16 object-cover object-top"
        />
      </figure>

      {phone && (
        <div className="absolute bottom-0 left-0 w-[21%] min-w-[84px]" aria-hidden="true">
          <img
            src={phone.src}
            alt=""
            width={540}
            height={1200}
            decoding="async"
            className={`block w-full rounded-[18px] border border-line shadow-[0_24px_40px_-20px_rgb(0_0_0/0.55)] ${phone.srcDark ? 'dark:hidden' : ''}`}
          />
          {phone.srcDark && (
            <img
              src={phone.srcDark}
              alt=""
              width={540}
              height={1200}
              decoding="async"
              className="hidden w-full rounded-[18px] border border-line shadow-[0_24px_40px_-20px_rgb(0_0_0/0.8)] dark:block"
            />
          )}
        </div>
      )}

      <Link
        to={path(`/projects/${project.slug}`)}
        className="glass absolute -top-4 right-3 flex items-center gap-3 rounded-14 px-3.5 py-2 transition-transform hover:-translate-y-0.5 sm:right-6"
      >
        {project.logo && <img src={project.logo} alt="" className="size-7" />}
        <span>
          <span className="block text-15 font-semibold text-fg">{project.name}</span>
          <StatusBadge status={project.status} className="text-11! leading-4!" />
        </span>
        <span className="sr-only">: {t.a11y.openProject}</span>
      </Link>
    </div>
  )
}
