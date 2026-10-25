import { fmt } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'

interface TechListProps {
  items: string[]
  colored?: boolean
  className?: string
  /** Nome accessibile dell'elenco. */
  label?: string
}

/** Elenco di tecnologie o competenze come pillole con il logo. */
export function TechList({ items, colored = false, className = '', label }: TechListProps) {
  const { t, tech } = useI18n()
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label={label ?? t.a11y.technologies}>
      {items.map((id) => {
        const item = tech(id)
        return (
          <li key={id} className="chip">
            <Icon icon={item.icon} colored={colored} className="size-3.5" />
            {item.name}
          </li>
        )
      })}
    </ul>
  )
}

/** Versione testuale compatta, per le card: "Flutter · Dart · Python +4". */
export function TechLine({ items, max = 3 }: { items: string[]; max?: number }) {
  const { t, tech } = useI18n()
  if (items.length === 0) return <p className="font-mono text-13 text-fg-3">{t.projectsList.techTbd}</p>
  const shown = items.slice(0, max).map((id) => tech(id).name)
  const rest = items.length - shown.length
  return (
    <p className="font-mono text-13 text-fg-3">
      <span className="sr-only">{t.a11y.technologies}: </span>
      {shown.join(' · ')}
      {rest > 0 && <span aria-label={fmt(t.a11y.more, { n: rest })}> +{rest}</span>}
    </p>
  )
}
