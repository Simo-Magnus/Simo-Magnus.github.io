import type { ReactNode } from 'react'
import torino800 from '../assets/brand/torino-800.webp'
import torino1400 from '../assets/brand/torino-1400.webp'
import { UiIcon } from '../components/Icon'
import { LogoMark } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'
import type { UiIconName } from '../types/content'

/** Card con titolo piccolo e filigrana dell'area sul lato destro. */
function InfoCard({ title, icon, children, className = '' }: { title: string; icon: UiIconName; children: ReactNode; className?: string }) {
  return (
    <div className={`surface h-full p-6 pr-20 ${className}`}>
      <UiIcon name={icon} className="watermark" />
      <h3 className="card-title">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function About() {
  const { t } = useI18n()
  const show = site.about
  const text = t.about
  const education = show.education ? text.education : []
  const certifications = show.certifications ? text.certifications : []
  const languages = show.languages ? text.languages : []

  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className="py-24 focus:outline-none sm:py-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading id="about" title={t.sections.about.title} />
            <div className="mt-6 space-y-4 text-17 text-fg-2">
              {text.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {show.interests && (
              <div className="mt-9">
                <h3 className="card-title">{text.interestsTitle}</h3>
                <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                  {text.interests.map((interest) => (
                    <li key={interest} className="flex gap-3 border-b border-line py-2.5 text-15 text-fg">
                      <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-machine" aria-hidden="true" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>

          {show.location && (
            <Reveal delay={100}>
              <figure className="surface p-2">
                <img
                  src={torino800}
                  srcSet={`${torino800} 800w, ${torino1400} 1400w`}
                  sizes="(min-width: 1024px) 520px, 100vw"
                  alt={text.photoAlt}
                  width={1400}
                  height={933}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] w-full rounded-16 object-cover"
                />
                <figcaption className="flex items-center justify-between gap-3 px-3 pt-3 pb-1.5">
                  <span className="flex items-center gap-2.5">
                    <LogoMark size={28} />
                    <span className="text-15 font-semibold text-fg">{text.location}</span>
                  </span>
                  <a
                    href="https://unsplash.com/it/foto/una-vista-di-una-citta-con-le-montagne-sullo-sfondo-9f8F30FGrPQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-11 text-fg-3 hover:text-fg"
                  >
                    {text.photoCredit}
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>

        {(education.length > 0 || certifications.length > 0 || languages.length > 0) && (
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {education.length > 0 && (
              <Reveal className="lg:row-span-2">
                <InfoCard title={text.educationTitle} icon="graduation">
                  <ol className="space-y-5">
                    {education.map((entry) => (
                      <li key={`${entry.title}-${entry.institution}`}>
                        <p className="font-mono text-11 text-fg-3">{entry.period}</p>
                        <p className="mt-0.5 text-17 font-semibold text-fg">{entry.title}</p>
                        <p className="text-15 text-fg-2">{entry.institution}</p>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              </Reveal>
            )}
            {certifications.length > 0 && (
              <Reveal delay={70} className="lg:col-span-2">
                <InfoCard title={text.certificationsTitle} icon="shield">
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {certifications.map((cert) => (
                      <li key={cert.name}>
                        <p className="text-15 font-semibold text-fg">
                          {cert.url ? (
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="hover:text-action-ink">
                              {cert.name}
                              <span className="sr-only"> {t.a11y.newTab}</span>
                            </a>
                          ) : (
                            cert.name
                          )}
                        </p>
                        <p className="text-13 text-fg-3">
                          {cert.issuer} · {cert.issued}
                        </p>
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              </Reveal>
            )}
            {languages.length > 0 && (
              <Reveal delay={140} className="lg:col-span-2">
                <InfoCard title={text.languagesTitle} icon="languages">
                  <dl className="grid grid-cols-2 gap-4">
                    {languages.map((language) => (
                      <div key={language.name}>
                        <dt className="text-15 font-semibold text-fg">{language.name}</dt>
                        <dd className="text-13 text-fg-3">{language.level}</dd>
                      </div>
                    ))}
                  </dl>
                </InfoCard>
              </Reveal>
            )}
          </div>
        )}

        {show.philosophy && (
          <div className="mt-20">
            <h3 className="text-22 font-bold">{text.methodTitle}</h3>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {text.philosophy.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 70}>
                  <div className="surface h-full p-6 pr-20">
                    <UiIcon name={show.philosophyIcons[index] ?? 'lightbulb'} className="watermark" />
                    <p className="font-mono text-11 text-fg-3">0{index + 1}</p>
                    <h4 className="mt-2 text-17 font-semibold text-fg">{item.title}</h4>
                    <p className="mt-2 text-15 text-fg-2">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
