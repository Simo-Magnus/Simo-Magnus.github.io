import type { ReactNode } from 'react'
import { Link, type To } from 'react-router-dom'
import { buttonClass, type Variant } from './buttonStyles'

interface ButtonLinkProps {
  to?: To
  href?: string
  variant?: Variant
  className?: string
  children: ReactNode
  /** Etichetta accessibile aggiuntiva, ad esempio per i link esterni. */
  ariaLabel?: string
}

/** Link con l'aspetto di un pulsante: interno (React Router) o esterno (nuova scheda). */
export function ButtonLink({ to, href, variant = 'primary', className = '', children, ariaLabel }: ButtonLinkProps) {
  const cls = buttonClass(variant, className)
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}
