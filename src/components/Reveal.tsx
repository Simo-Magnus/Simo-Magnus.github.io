import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Ritardo in millisecondi, per far comparire gli elementi in sequenza. */
  delay?: number
  as?: 'div' | 'li'
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useReveal<HTMLDivElement & HTMLLIElement>()
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag>
  )
}
