import { useI18n } from '../i18n/useI18n'
import type { ProjectStatus } from '../types/content'

const dotColor: Record<ProjectStatus, string> = {
  live: 'bg-emerald-500',
  beta: 'bg-machine',
  development: 'bg-amber-400',
  planned: 'bg-support',
}

export function StatusBadge({ status, className = '' }: { status: ProjectStatus; className?: string }) {
  const { t } = useI18n()
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-13 text-fg-2 ${className}`}>
      <span className={`size-1.5 rounded-full ${dotColor[status]}`} aria-hidden="true" />
      <span>
        <span className="sr-only">{t.a11y.status} </span>
        {t.status[status]}
      </span>
    </span>
  )
}
