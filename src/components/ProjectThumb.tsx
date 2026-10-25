import type { Project } from '../types/content'
import { UiIcon } from './Icon'

interface ProjectThumbProps {
  project: Project
  className?: string
  /** Dimensione del logo o dell'icona. */
  size?: 'sm' | 'lg'
}

/**
 * Miniatura del progetto con la sua identità visiva: la copertina se c'è, altrimenti il logo
 * sui colori del progetto; la schermata reale solo per i progetti senza logo, poi un'icona provvisoria.
 */
export function ProjectThumb({ project, className = '', size = 'sm' }: ProjectThumbProps) {
  const { theme } = project
  const image = project.cover ?? (project.logo ? undefined : project.showcase)
  if (image) {
    return (
      <div data-brand className={`relative overflow-hidden ${className}`} style={{ backgroundColor: theme.deep }}>
        <img src={image.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover object-top" />
      </div>
    )
  }

  const light = theme.onTile === 'dark'
  const tileSize = size === 'lg' ? 'size-28 sm:size-32' : 'size-24 sm:size-28'
  return (
    <div
      data-brand
      // Il fondo bianco del logo ha un bordo sottile, per staccarsi dalle card chiare.
      className={`relative flex items-center justify-center overflow-hidden ${light ? 'border border-line' : ''} ${className}`}
      style={{
        background: light
          ? `radial-gradient(90% 80% at 80% 0%, ${theme.primary}1f, transparent 60%), #ffffff`
          : `radial-gradient(90% 90% at 80% 0%, ${theme.accent}2e, transparent 60%), linear-gradient(170deg, ${theme.tile} 0%, ${theme.deep} 100%)`,
      }}
    >
      {project.logo ? (
        <img src={project.logo} alt="" className={`relative ${tileSize}`} loading="lazy" decoding="async" />
      ) : (
        <span style={{ color: theme.accent }}>
          <UiIcon name={project.fallbackIcon ?? 'code'} className={size === 'lg' ? 'size-16' : 'size-12'} />
        </span>
      )}
    </div>
  )
}
