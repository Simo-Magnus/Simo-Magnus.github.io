import { Link } from 'react-router-dom'
import avatar from '../assets/brand/sm-avatar.webp'
import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <img
      src={avatar}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-10 ring-1 ring-white/10"
      decoding="async"
    />
  )
}

/**
 * Logo con nome nel riquadro in alto a sinistra: porta alla sezione "Chi sono".
 * `withSubtitle` aggiunge il ruolo in monospaziato (nascosto sugli schermi molto stretti).
 */
export function Logo({ className = '', withSubtitle = false }: { className?: string; withSubtitle?: boolean }) {
  const { t, path } = useI18n()
  return (
    <Link
      to={{ pathname: path('/'), hash: '#about' }}
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-14 ${className}`}
      aria-label={`${site.brand.name}: ${t.nav.about}`}
    >
      <LogoMark size={withSubtitle ? 36 : 32} />
      <span className="leading-none">
        <span className="block font-display text-15 leading-5 font-semibold tracking-tight text-fg">{site.brand.name}</span>
        {withSubtitle && <span className="hidden font-mono text-11 leading-4 text-fg-3 min-[380px]:block">{t.brand.role}</span>}
      </span>
    </Link>
  )
}
