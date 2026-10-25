import { useEffect, useState } from 'react'

/**
 * Nasconde un elemento quando la pagina scorre verso il basso e lo mostra
 * appena si torna a scorrere verso l'alto (o si è in cima alla pagina).
 */
export function useHideOnScroll({ offset = 96, threshold = 6 } = {}) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      if (y <= offset) setHidden(false)
      else if (y > last + threshold) setHidden(true)
      else if (y < last - threshold) setHidden(false)
      else return
      last = y
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [offset, threshold])

  return [hidden, setHidden] as const
}
