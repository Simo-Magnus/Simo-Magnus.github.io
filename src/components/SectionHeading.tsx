import type { ReactNode } from 'react'

interface SectionHeadingProps {
  /** Id della sezione: il titolo riceve l'id "<id>-title", usato anche per lo scorrimento dai link. */
  id: string
  title: string
  description?: ReactNode
  children?: ReactNode
}

export function SectionHeading({ id, title, description, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h2 id={`${id}-title`} className="text-34 font-bold text-fg">
          {title}
        </h2>
        {description && <p className="mt-3 text-17 text-fg-2">{description}</p>}
      </div>
      {children}
    </div>
  )
}
