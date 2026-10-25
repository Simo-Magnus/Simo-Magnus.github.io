import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n'
import type { Project } from '../types/content'
import { ProjectThumb } from './ProjectThumb'
import { StatusBadge } from './StatusBadge'
import { TechLine } from './TechList'

/**
 * Card di un progetto. L'intera card è cliccabile tramite il link sul titolo
 * (un solo elemento interattivo, più semplice da usare con tastiera e lettori di schermo).
 */
export function ProjectCard({ project }: { project: Project }) {
  const { t, path } = useI18n()
  return (
    <article className="surface group flex h-full flex-col p-2 transition-transform duration-300 ease-out-soft hover:-translate-y-1 focus-within:ring-2 focus-within:ring-ring">
      <ProjectThumb project={project} className="aspect-[16/10] rounded-16" />

      <div className="flex flex-1 flex-col px-4 pt-5 pb-4">
        <div className="flex items-center justify-between gap-3">
          <StatusBadge status={project.status} />
          <ArrowUpRight
            className="size-5 text-fg-3 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-3 text-22 font-bold">
          <Link to={path(`/projects/${project.slug}`)} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        {project.nameIsProvisional && <p className="font-mono text-11 text-fg-3">{t.projectsList.provisionalName}</p>}
        <p className="mt-2 text-15 text-fg-2">{project.summary}</p>

        <div className="mt-auto space-y-1 border-t border-line pt-4">
          <TechLine items={project.tech} />
          <p className="text-13 text-fg-3">{project.categories.map((category) => t.categories[category]).join(' · ')}</p>
        </div>
      </div>
    </article>
  )
}
