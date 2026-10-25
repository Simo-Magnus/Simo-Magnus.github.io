import { activeSocials, site } from '../data/site'
import { fmt } from '../i18n/types'
import { useI18n } from '../i18n/useI18n'
import { Icon } from './Icon'

interface SocialLinksProps {
  /** Include anche il link email. */
  withEmail?: boolean
  className?: string
}

export function SocialLinks({ withEmail = true, className = '' }: SocialLinksProps) {
  const { t } = useI18n()
  const itemClass = 'btn btn-secondary size-11 px-0 text-fg-2 hover:text-fg'
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label={t.a11y.profiles}>
      {activeSocials.map((social) => (
        <li key={social.id}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer me"
            className={itemClass}
            aria-label={`${social.label} ${t.a11y.newTab}`}
            title={social.label}
          >
            <Icon icon={social.icon} className="size-[18px]" />
          </a>
        </li>
      ))}
      {withEmail && (
        <li>
          <a
            href={`mailto:${site.contact.email}`}
            className={itemClass}
            aria-label={fmt(t.a11y.writeTo, { email: site.contact.email })}
            title={t.contact.emailTitle}
          >
            <Icon icon={{ ui: 'mail' }} className="size-[18px]" />
          </a>
        </li>
      )}
    </ul>
  )
}
