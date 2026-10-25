import { Check, Copy, Send } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { buttonClass } from '../components/buttonStyles'
import { Icon, UiIcon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { activeSocials, site } from '../data/site'
import { fmt } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import {
  buildMailto,
  contactErrorText,
  contactLimits,
  validateContact,
  type ContactErrorCode,
  type ContactErrors,
  type ContactValues,
} from '../lib/contact'

const empty: ContactValues = { name: '', email: '', message: '' }

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 text-13 text-red-700 dark:text-red-400">
      {message}
    </p>
  )
}

export function Contact() {
  const { t } = useI18n()
  const text = t.contact
  const [values, setValues] = useState<ContactValues>(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<'idle' | 'opened'>('idle')
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (field: keyof ContactValues) => (event: { target: { value: string } }) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    // Dopo il primo invio gli errori si aggiornano mentre si scrive.
    if (submitted) setErrors(validateContact(next))
    setStatus('idle')
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    const found = validateContact(values)
    setErrors(found)
    const firstInvalid = (Object.keys(found) as (keyof ContactValues)[])[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    const subject = `${site.contact.subjectPrefix} ${fmt(text.mailSubject, { name: values.name.trim() })}`
    window.location.href = buildMailto(site.contact.email, values, subject)
    setStatus('opened')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  // Gli errori sono memorizzati come tipo, non come testo: cambiando lingua si traducono subito.
  const errorText = (code?: ContactErrorCode) => (code ? contactErrorText(code, text.errors) : undefined)

  const describedBy = (field: keyof ContactValues, hint?: string) =>
    [errors[field] ? `${field}-error` : null, hint].filter(Boolean).join(' ') || undefined

  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="py-24 focus:outline-none sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading id="contact" title={t.sections.contact.title} description={t.sections.contact.intro} />

          <div className="surface mt-8 p-5 pr-20">
            <UiIcon name="mail" className="watermark" />
            <p className="card-title">{text.emailTitle}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <a href={`mailto:${site.contact.email}`} className="text-17 font-semibold break-all text-fg hover:text-action-ink">
                {site.contact.email}
              </a>
              <button type="button" onClick={copyEmail} className="btn btn-secondary min-h-9 gap-1.5 rounded-10 px-3 text-13">
                {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
                {copied ? text.copied : text.copy}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? text.copiedLive : ''}
              </span>
            </div>
          </div>

          {activeSocials.length > 0 && (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {activeSocials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="surface-inner flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:border-line-strong"
                  >
                    <Icon icon={social.icon} colored className="size-5" />
                    <span className="min-w-0">
                      <span className="block text-15 font-semibold text-fg">{social.label}</span>
                      {social.handle && <span className="block truncate font-mono text-11 text-fg-3">{social.handle}</span>}
                    </span>
                    <span className="sr-only">{t.a11y.newTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={100}>
          <form ref={formRef} onSubmit={onSubmit} noValidate className="surface p-6 sm:p-8" aria-describedby="form-note">
            <p className="card-title">{text.formTitle}</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-15 font-semibold text-fg">
                  {text.name}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update('name')}
                  maxLength={contactLimits.name.max}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy('name')}
                  className="field"
                  placeholder={text.namePlaceholder}
                />
                <FieldError id="name-error" message={errorText(errors.name)} />
              </div>
              <div>
                <label htmlFor="email" className="text-15 font-semibold text-fg">
                  {text.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy('email')}
                  className="field"
                  placeholder={text.emailPlaceholder}
                />
                <FieldError id="email-error" message={errorText(errors.email)} />
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <label htmlFor="message" className="text-15 font-semibold text-fg">
                  {text.message}
                </label>
                <span id="message-count" className="font-mono text-11 text-fg-3 tabular-nums">
                  {values.message.length}/{contactLimits.message.max}
                </span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={values.message}
                onChange={update('message')}
                maxLength={contactLimits.message.max}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy('message', 'message-count')}
                className="field resize-y"
                placeholder={text.messagePlaceholder}
              />
              <FieldError id="message-error" message={errorText(errors.message)} />
            </div>

            <button type="submit" className={buttonClass('primary', 'mt-6 w-full')}>
              {text.submit}
              <Send className="size-4" aria-hidden="true" />
            </button>

            <p id="form-note" className="mt-4 text-center text-13 text-fg-3">
              {text.note}
            </p>
            <p role="status" className="mt-2 text-center text-13 font-semibold text-action-ink empty:hidden">
              {status === 'opened' && fmt(text.opened, { email: site.contact.email })}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
