import { useId, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { filterProjects, projectCategories } from '../data/projects'
import { fmt } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import type { ProjectCategory } from '../types/content'

type Filter = ProjectCategory | 'all'

export function Projects() {
  const { t, projects } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filterProjects(projects, filter)
  const gridId = useId()
  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: t.projectsList.all },
    ...projectCategories.map((value) => ({ value, label: t.categories[value] })),
  ]
  const { title, description } = t.sections.projects

  return (
    <section id="projects" tabIndex={-1} aria-labelledby="projects-title" className="py-24 focus:outline-none sm:py-28">
      <div className="container-page">
        <SectionHeading id="projects" title={title} description={description}>
          <div
            role="group"
            aria-label={t.projectsList.filterLabel}
            className="glass flex max-w-full gap-1 self-start overflow-x-auto rounded-full p-1 [scrollbar-width:none] md:self-end"
          >
            {filters.map((item) => {
              const pressed = filter === item.value
              const count = filterProjects(projects, item.value).length
              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={pressed}
                  aria-controls={gridId}
                  onClick={() => setFilter(item.value)}
                  className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-15 transition-colors ${
                    pressed ? 'is-active font-semibold' : 'text-fg-3 hover:text-fg'
                  }`}
                >
                  {item.label}
                  <span className="font-mono text-11 opacity-70">{count}</span>
                </button>
              )
            })}
          </div>
        </SectionHeading>

        <p className="sr-only" aria-live="polite">
          {visible.length === 1 ? t.projectsList.shownOne : fmt(t.projectsList.shownMany, { n: visible.length })}
        </p>

        {visible.length > 0 ? (
          // Con un numero pari di progetti la griglia a due colonne evita una card isolata.
          <ul id={gridId} className={`mt-12 grid gap-5 sm:grid-cols-2 ${visible.length % 2 === 0 ? '' : 'lg:grid-cols-3'}`}>
            {visible.map((project, index) => (
              <Reveal as="li" key={project.slug} delay={(index % 3) * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <div id={gridId} className="mt-12 rounded-22 border border-dashed border-line-strong p-10 text-center">
            <p className="text-fg">{t.projectsList.empty}</p>
            <button type="button" onClick={() => setFilter('all')} className="link mt-3 text-15">
              {t.projectsList.showAll}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
