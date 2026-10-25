import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import { useHideOnScroll } from '../hooks/useHideOnScroll'
import { useTheme } from '../hooks/useTheme'
import { splitLocale } from '../i18n/config'
import { useI18n } from '../i18n/useI18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Logo } from './Logo'

/**
 * Intestazione in tre riquadri separati. Logo (angolo in alto a sinistra) e tema con lingua
 * (angolo in alto a destra, con il menu sugli schermi stretti) restano sempre fissi; la barra
 * delle sezioni al centro si nasconde scorrendo verso il basso e riappare scorrendo verso l'alto.
 */
export function Header() {
  const { pathname } = useLocation()
  const { t, path } = useI18n()
  const isHome = splitLocale(pathname).rest === '/'
  const active = useActiveSection(site.nav, isHome)
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useHideOnScroll()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Chiude il menu mobile cambiando pagina.
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Con il menu aperto o il focus da tastiera dentro l'intestazione, resta sempre visibile.
  const isHidden = hidden && !open

  const box = 'glass pointer-events-auto flex h-[58px] items-center rounded-full'

  return (
    // Occupa nel flusso l'altezza della barra; i riquadri sono fissati alla finestra.
    <header onFocusCapture={() => setHidden(false)} className="pointer-events-none relative z-50 h-[70px]">
      <div className="corner pointer-events-auto fixed top-3 left-3 flex h-[58px] items-center pr-4 pl-2.5 sm:left-4">
        <Logo withSubtitle />
      </div>

      <nav
        aria-label={t.a11y.mainNav}
        className={`${box} fixed top-3 left-1/2 hidden -translate-x-1/2 px-1.5 transition-transform duration-300 ease-out-soft motion-reduce:transition-none lg:flex ${
          isHidden ? '-translate-y-[calc(100%+12px)]' : 'translate-y-0'
        }`}
      >
        <ul className="flex items-center gap-0.5">
          {site.nav.map((id) => {
            const isActive = isHome && active === id
            return (
              <li key={id}>
                <Link
                  to={{ pathname: path('/'), hash: `#${id}` }}
                  aria-current={isActive ? 'location' : undefined}
                  className={`inline-flex h-11 items-center rounded-full px-4 text-15 transition-colors ${
                    isActive ? 'is-active font-semibold' : 'text-fg-3 hover:text-fg'
                  }`}
                >
                  {t.nav[id]}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="corner pointer-events-auto fixed top-3 right-3 flex h-[58px] items-center gap-0.5 px-1.5 sm:right-4">
        <LanguageSwitcher />
        <button
          type="button"
          onClick={toggle}
          className="corner-button"
          aria-label={theme === 'dark' ? t.a11y.themeToLight : t.a11y.themeToDark}
          title={theme === 'dark' ? t.a11y.themeLight : t.a11y.themeDark}
        >
          {theme === 'dark' ? <Sun className="size-5" aria-hidden="true" /> : <Moon className="size-5" aria-hidden="true" />}
        </button>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="corner-button lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? t.a11y.closeMenu : t.a11y.openMenu}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        ref={menuRef}
        hidden={!open}
        className="glass pointer-events-auto fixed top-[76px] right-3 left-3 rounded-22 p-2 sm:right-4 sm:left-4 lg:hidden"
      >
        <nav aria-label={t.a11y.mobileNav}>
          <ul className="flex flex-col gap-0.5">
            {site.nav.map((id) => (
              <li key={id}>
                <Link
                  to={{ pathname: path('/'), hash: `#${id}` }}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center rounded-14 px-4 text-17 ${
                    isHome && active === id ? 'is-active font-semibold' : 'text-fg'
                  }`}
                >
                  {t.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
