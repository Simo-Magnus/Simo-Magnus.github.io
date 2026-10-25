import { Check, Languages } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { localeList, localePath, splitLocale } from '../i18n/config'
import { useI18n } from '../i18n/useI18n'

/** Selettore della lingua: porta alla stessa pagina (e sezione) nella lingua scelta. */
export function LanguageSwitcher() {
  const { t, locale } = useI18n()
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const { rest } = splitLocale(pathname)
  const current = localeList.find((info) => info.code === locale)

  // Chiude il menu cambiando pagina.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (localeList.length < 2) return null

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t.a11y.language}: ${current?.label ?? locale}`}
        className="corner-button w-auto gap-1.5 px-2.5 font-mono text-13"
      >
        <Languages className="size-[18px]" aria-hidden="true" />
        {current?.short}
      </button>

      <div id={listId} hidden={!open} className="corner absolute top-[calc(100%+14px)] right-[-7px] min-w-44 p-1.5">
        <ul aria-label={t.a11y.language}>
          {localeList.map((info) => {
            const active = info.code === locale
            return (
              <li key={info.code}>
                <Link
                  to={{ pathname: localePath(info.code, rest), hash }}
                  hrefLang={info.htmlLang}
                  lang={info.htmlLang}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center justify-between gap-4 rounded-10 px-3 text-15 transition-colors ${
                    active ? 'is-active font-semibold' : 'text-fg hover:bg-[var(--inner-bg)]'
                  }`}
                >
                  {info.label}
                  {active ? <Check className="size-4" aria-hidden="true" /> : <span className="font-mono text-11 text-fg-3">{info.short}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
