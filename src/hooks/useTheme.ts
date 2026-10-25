import { useCallback, useEffect, useState } from 'react'
import { site } from '../data/site'
import type { ThemePreference } from '../types/content'

type ResolvedTheme = 'light' | 'dark'

const media = () => window.matchMedia('(prefers-color-scheme: dark)')

function readStored(): ThemePreference | null {
  try {
    const value = localStorage.getItem(site.theme.storageKey)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

/**
 * Tema chiaro/scuro: la scelta esplicita viene salvata nel browser,
 * altrimenti si segue la preferenza predefinita della configurazione (o del sistema).
 */
export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(() => readStored() ?? site.theme.default)
  const [systemDark, setSystemDark] = useState(() => media().matches)
  const theme: ResolvedTheme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference

  // Segue i cambi di tema del sistema operativo.
  useEffect(() => {
    const query = media()
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  const toggle = useCallback(() => {
    const next: ResolvedTheme = theme === 'dark' ? 'light' : 'dark'
    setPreference(next)
    try {
      localStorage.setItem(site.theme.storageKey, next)
    } catch {
      // Archiviazione non disponibile (es. navigazione privata): il tema vale solo per la sessione.
    }
  }, [theme])

  return { theme, toggle }
}
