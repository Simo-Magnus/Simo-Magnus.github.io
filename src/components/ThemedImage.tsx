import type { ImgHTMLAttributes } from 'react'

interface ThemedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  /** Versione per il tema scuro: se c'è, si alterna a `src` seguendo il tema del sito. */
  srcDark?: string
}

/**
 * Immagine che segue il tema del sito: mostra `src` nel tema chiaro e `srcDark` in quello scuro.
 * L'immagine nascosta non viene scaricata se ha `loading="lazy"`.
 */
export function ThemedImage({ src, srcDark, className = '', alt, ...rest }: ThemedImageProps) {
  if (!srcDark) return <img src={src} alt={alt} className={className} {...rest} />
  return (
    <>
      <img src={src} alt={alt} className={`${className} dark:hidden`} {...rest} />
      <img src={srcDark} alt={alt} className={`${className} hidden dark:block`} {...rest} />
    </>
  )
}
