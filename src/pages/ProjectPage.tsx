import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ImageIcon } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buttonClass } from '../components/buttonStyles'
import { UiIcon } from '../components/Icon'
import { PendingNote } from '../components/PendingNote'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectThumb } from '../components/ProjectThumb'
import { Reveal } from '../components/Reveal'
import { StatusBadge } from '../components/StatusBadge'
import { TechList } from '../components/TechList'
import { ThemedImage } from '../components/ThemedImage'
import { findProject } from '../data/projects'
import { site } from '../data/site'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { fmt } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import type { Project, ProjectLink } from '../types/content'
import { NotFoundPage } from './NotFoundPage'

const linkIcon: Record<ProjectLink['kind'], 'globe' | 'download' | 'code' | 'heart' | 'smartphone'> = {
  demo: 'globe',
  site: 'globe',
  repo: 'code',
  download: 'download',
  store: 'smartphone',
  support: 'heart',
}

function Block({ title, children, id }: { title: string; children: ReactNode; id: string }) {
  return (
    <Reveal>
      <section aria-labelledby={id} className="scroll-mt-28">
        <h2 id={id} className="text-22 font-bold">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </section>
    </Reveal>
  )
}

function SideCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="surface p-5">
      <h2 className="card-title">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function ProjectHero({ project }: { project: Project }) {
  const { t, path } = useI18n()
  const { theme } = project
  const [primaryLink, ...otherLinks] = project.links
  return (
    <section
      className="band relative -mt-[70px] overflow-hidden pt-[70px]"
      style={{ background: `radial-gradient(70% 90% at 100% 0%, ${theme.accent}33, transparent 60%), radial-gradient(60% 70% at 0% 100%, ${theme.primary}22, transparent 65%), var(--page)` }}
      aria-labelledby="project-title"
    >
      <div className="container-page grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div>
          <Link
            to={{ pathname: path('/'), hash: '#projects' }}
            className="inline-flex min-h-11 items-center gap-2 rounded-10 text-15 text-fg-2 transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.project.back}
          </Link>

          <div className="mt-8 flex items-center gap-5">
            <div
              data-brand
              className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-22 ring-1 ring-white/15 sm:size-24"
              style={{ backgroundColor: theme.onTile === 'dark' ? '#ffffff' : theme.tile }}
            >
              {project.logo ? (
                <img src={project.logo} alt={fmt(t.project.logoAlt, { name: project.name })} className="size-[86%]" />
              ) : (
                <span style={{ color: theme.onTile === 'dark' ? theme.deep : theme.accent }}>
                  <UiIcon name={project.fallbackIcon ?? 'code'} className="size-10" />
                </span>
              )}
            </div>
            <div>
              <h1 id="project-title" className="text-34 font-bold sm:text-48">
                {project.name}
              </h1>
              {project.nameIsProvisional && <p className="font-mono text-13 text-fg-3">{t.projectsList.provisionalName}</p>}
            </div>
          </div>

          <p className="mt-6 max-w-xl text-17 text-fg-2 sm:text-22 sm:leading-[32px] sm:font-light">{project.tagline}</p>

          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
            <StatusBadge status={project.status} />
            <span className="font-mono text-13 text-fg-3">{project.categories.map((category) => t.categories[category]).join(' · ')}</span>
          </p>

          {primaryLink && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={primaryLink.url} target="_blank" rel="noopener noreferrer" className={buttonClass('primary')}>
                <UiIcon name={linkIcon[primaryLink.kind]} className="size-4" />
                {primaryLink.label}
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
              {otherLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
                  <UiIcon name={linkIcon[link.kind]} className="size-4" />
                  {link.label}
                  <span className="sr-only">{t.a11y.newTab}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className={project.showcase ? '' : 'hidden lg:block'}>
          <figure className="surface p-2">
            {project.showcase ? (
              <ThemedImage
                src={project.showcase.src}
                srcDark={project.showcase.srcDark}
                alt={project.showcase.alt}
                width={1280}
                height={720}
                decoding="async"
                className="block aspect-video w-full rounded-16 object-cover object-top"
              />
            ) : project.cover ? (
              <img src={project.cover.src} alt={project.cover.alt} className="block aspect-[16/10] w-full rounded-16 object-cover" />
            ) : (
              <ProjectThumb project={project} size="lg" className="aspect-[16/10] rounded-16" />
            )}
          </figure>
        </div>
      </div>
    </section>
  )
}

function Screenshots({ project }: { project: Project }) {
  const { t } = useI18n()
  const shots = project.screenshots ?? []
  if (shots.length > 0) {
    const imgClass = 'aspect-[9/20] w-full rounded-[20px] border border-line object-cover'
    return (
      <>
        <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
          {shots.map((shot) => (
            <li key={shot.src} className="w-52 shrink-0 snap-start sm:w-auto">
              <figure>
                {/* Segue il tema del sito: versione chiara o scura della stessa schermata. */}
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={540}
                  height={1200}
                  loading="lazy"
                  decoding="async"
                  className={`${imgClass} ${shot.srcDark ? 'dark:hidden' : ''}`}
                />
                {shot.srcDark && (
                  <img
                    src={shot.srcDark}
                    alt={shot.alt}
                    width={540}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className={`${imgClass} hidden dark:block`}
                  />
                )}
                {shot.caption && <figcaption className="mt-3 text-13 text-fg-2">{shot.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
        {project.screenshotsNote && <p className="mt-4 font-mono text-11 text-fg-3">{project.screenshotsNote}</p>}
      </>
    )
  }
  // Cornici vuote dichiarate come tali: nessuno screenshot inventato.
  return (
    <ul className="grid grid-cols-3 gap-3 sm:gap-4" aria-label={t.a11y.screenshotsUnavailable}>
      {[1, 2, 3].map((n) => (
        <li
          key={n}
          className="flex aspect-[9/17] flex-col items-center justify-center gap-2 rounded-22 border border-dashed border-line-strong p-2 text-center text-fg-3"
        >
          <ImageIcon className="size-6" aria-hidden="true" />
          <span className="text-11 sm:text-13">{t.project.screenshotsSoon}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectPage() {
  const { slug } = useParams()
  const { t, path, projects } = useI18n()
  const project = findProject(projects, slug)

  useDocumentMeta({
    title: project ? (project.seo?.title ?? `${project.name} · ${site.brand.name}`) : undefined,
    description: project ? (project.seo?.description ?? project.summary) : undefined,
    path: project ? path(`/projects/${project.slug}/`) : path('/'),
    image: project?.seo?.image,
  })

  if (!project) return <NotFoundPage />

  const index = projects.findIndex((item) => item.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const others = projects.filter((item) => item.slug !== project.slug)
  const showShots = (project.screenshots?.length ?? 0) > 0 || site.showPlaceholders

  return (
    <article style={{ '--project': project.theme.primary } as CSSProperties}>
      <ProjectHero project={project} />

      <div className="container-page grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div className="min-w-0 space-y-16">
          <Block id="description" title={t.project.about}>
            <div className="space-y-4 text-17 text-fg-2">
              {project.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Block>

          {project.problem && (
            <Reveal>
              <section aria-labelledby="problema" className="surface p-6 sm:p-8">
                <h2 id="problema" className="card-title">
                  {t.project.problem}
                </h2>
                <p className="mt-3 font-display text-22 leading-[32px] font-light text-fg">{project.problem}</p>
              </section>
            </Reveal>
          )}

          {project.goals && project.goals.length > 0 && (
            <Block id="goals" title={t.project.goals}>
              <ul className="space-y-3">
                {project.goals.map((goal) => (
                  <li key={goal} className="flex gap-3 text-17 text-fg-2">
                    <Check className="mt-1.5 size-4 shrink-0" style={{ color: 'var(--project)' }} aria-hidden="true" strokeWidth={2.5} />
                    {goal}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.features && project.features.length > 0 && (
            <Block id="features" title={t.project.features}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature.title} className="surface p-5 pr-20">
                    <span style={{ color: 'var(--project)' }}>
                      <UiIcon name={feature.icon} className="watermark text-current!" />
                    </span>
                    <h3 className="text-17 font-semibold">{feature.title}</h3>
                    <p className="mt-1.5 text-15 text-fg-2">{feature.text}</p>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {showShots && (
            <Block id="screenshots" title={t.project.screenshots}>
              <Screenshots project={project} />
            </Block>
          )}

          {project.decisions && project.decisions.length > 0 && (
            <Block id="decisions" title={t.project.decisions}>
              <dl className="surface divide-y divide-line">
                {project.decisions.map((decision) => (
                  <div key={decision.title} className="p-5 sm:grid sm:grid-cols-[200px_1fr] sm:gap-6">
                    <dt className="text-15 font-semibold text-fg">{decision.title}</dt>
                    <dd className="mt-1 text-15 text-fg-2 sm:mt-0">{decision.text}</dd>
                  </div>
                ))}
              </dl>
            </Block>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start" aria-label={t.a11y.projectSheet}>
          <SideCard title={t.project.status}>
            <StatusBadge status={project.status} />
            {project.statusNote && <p className="mt-2 text-15 text-fg-2">{project.statusNote}</p>}
          </SideCard>

          {project.platforms && (
            <SideCard title={t.project.platforms}>
              <p className="text-15 font-semibold text-fg">{project.platforms.join(' · ')}</p>
            </SideCard>
          )}

          <SideCard title={t.project.technologies}>
            {project.tech.length > 0 ? <TechList items={project.tech} colored /> : <p className="text-15 text-fg-3">{t.project.tbd}</p>}
          </SideCard>

          {project.skills && project.skills.length > 0 && (
            <SideCard title={t.project.skills}>
              <TechList items={project.skills} label={t.a11y.skills} />
            </SideCard>
          )}

          {project.links.length > 0 && (
            <SideCard title={t.project.links}>
              <ul>
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-11 items-center gap-3 rounded-10 text-15 text-fg transition-colors hover:text-action-ink"
                    >
                      <UiIcon name={linkIcon[link.kind]} className="size-4 text-fg-3 group-hover:text-action-ink" />
                      <span className="flex-1">{link.label}</span>
                      <ArrowUpRight className="size-4 text-fg-3" aria-hidden="true" />
                      <span className="sr-only">{t.a11y.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </SideCard>
          )}

          <PendingNote items={project.todo ?? []} />
        </aside>
      </div>

      {others.length > 0 && (
        <section aria-labelledby="more-projects" className="py-16 sm:py-20">
          <div className="container-page">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="more-projects" className="text-34 font-bold">
                  {t.project.others}
                </h2>
              </div>
              <Link to={path(`/projects/${next.slug}`)} className="link inline-flex min-h-11 items-center gap-1.5 text-15">
                {fmt(t.project.next, { name: next.name })}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  )
}
