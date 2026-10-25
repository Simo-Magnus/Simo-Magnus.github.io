import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'

interface PendingNoteProps {
  title?: string
  items: string[]
  className?: string
}

/**
 * Segnala in modo trasparente i contenuti non ancora inseriti.
 * Si nasconde impostando `showPlaceholders: false` in src/data/site.ts.
 */
export function PendingNote({ title, items, className = '' }: PendingNoteProps) {
  const { t } = useI18n()
  if (!site.showPlaceholders || items.length === 0) return null
  const heading = title ?? t.pending.title
  return (
    <aside className={`rounded-16 border border-dashed border-line-strong p-5 ${className}`} aria-label={heading}>
      <p className="card-title">{heading}</p>
      <ul className="mt-3 space-y-1.5 text-15 text-fg-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-[11px] h-px w-3 shrink-0 bg-fg-3" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}
