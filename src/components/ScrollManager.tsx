import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Distanza fra il bordo alto della finestra e il titolo della sezione: barra (70px) più un piccolo stacco. */
const HEADING_OFFSET = 88

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Posizione nella pagina senza le trasformazioni delle animazioni di comparsa. */
function pageTop(element: HTMLElement): number {
  let top = 0
  let node: HTMLElement | null = element
  while (node) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return top
}

/**
 * Gestisce lo scorrimento tra le pagine: in cima per una nuova pagina, alla sezione indicata
 * quando l'indirizzo contiene un'ancora (#projects, #contact…). Il titolo della sezione si ferma
 * appena sotto la barra di navigazione; #home riporta in cima alla pagina.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previousPath = useRef<string | null>(null)

  useLayoutEffect(() => {
    const pathChanged = previousPath.current !== pathname
    const firstRender = previousPath.current === null
    previousPath.current = pathname
    const behavior: ScrollBehavior = pathChanged || prefersReducedMotion() ? 'auto' : 'smooth'

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const section = document.getElementById(id)
      if (section) {
        // Si allinea il titolo della sezione (id "<sezione>-title"), non il bordo della sezione.
        const heading = document.getElementById(`${id}-title`) ?? section
        const top = id === 'home' ? 0 : Math.max(0, pageTop(heading) - HEADING_OFFSET)
        window.scrollTo({ top, behavior })
        // Porta il focus alla sezione per chi naviga da tastiera o con lettore di schermo.
        section.focus({ preventScroll: true })
        return
      }
    }
    if (pathChanged && !firstRender) window.scrollTo(0, 0)
  }, [pathname, hash, key])

  return null
}
