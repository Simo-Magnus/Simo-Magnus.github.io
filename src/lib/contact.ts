import { fmt, type Messages } from '../i18n/types'

export interface ContactValues {
  name: string
  email: string
  message: string
}

type ErrorTexts = Messages['contact']['errors']

/** Tipo di errore per campo: il testo si ricava al momento, nella lingua corrente. */
export type ContactErrorCode = keyof ErrorTexts

export type ContactErrors = Partial<Record<keyof ContactValues, ContactErrorCode>>

export const contactLimits = {
  name: { min: 2, max: 80 },
  message: { min: 10, max: 2000 },
} as const

// Controllo volutamente semplice: testo@dominio.estensione, senza spazi.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Valida il modulo e restituisce, per ogni campo sbagliato, il tipo di errore. */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()
  const { name: nameLimit, message: messageLimit } = contactLimits

  if (!name) errors.name = 'nameRequired'
  else if (name.length < nameLimit.min) errors.name = 'nameShort'
  else if (name.length > nameLimit.max) errors.name = 'nameLong'

  if (!email) errors.email = 'emailRequired'
  else if (!emailPattern.test(email)) errors.email = 'emailInvalid'

  if (!message) errors.message = 'messageRequired'
  else if (message.length < messageLimit.min) errors.message = 'messageShort'
  else if (message.length > messageLimit.max) errors.message = 'messageLong'

  return errors
}

/** Testo dell'errore nella lingua indicata, con i limiti di lunghezza al posto dei segnaposto. */
export function contactErrorText(code: ContactErrorCode, texts: ErrorTexts): string {
  const field = code.startsWith('name') ? contactLimits.name : contactLimits.message
  return fmt(texts[code], { min: field.min, max: field.max })
}

/**
 * Costruisce un link mailto con oggetto e testo già compilati.
 * Il sito non ha un backend: il messaggio parte dal programma di posta di chi scrive.
 */
export function buildMailto(to: string, values: ContactValues, subject: string): string {
  const name = values.name.trim()
  const body = `${values.message.trim()}\n\n—\n${name}\n${values.email.trim()}`
  return `mailto:${to}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(body)}`
}
