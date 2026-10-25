import { Icon, UiIcon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'

export function Skills() {
  const { t, skills, tech } = useI18n()
  const { title, description } = t.sections.skills

  return (
    <section id="skills" tabIndex={-1} aria-labelledby="skills-title" className="py-24 focus:outline-none sm:py-28">
      <div className="container-page">
        <SectionHeading id="skills" title={title} description={description} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, index) => (
            <Reveal as="li" key={category.id} delay={(index % 3) * 70}>
              <div className="surface flex h-full flex-col p-6">
                <UiIcon name={category.icon} className="watermark top-10! translate-y-0!" />
                <h3 className="card-title pr-16">{category.title}</h3>
                <p className="mt-2 pr-16 text-13 text-fg-3">{category.description}</p>
                <ul className="mt-5 space-y-1">
                  {category.items.map((item) => {
                    const entry = tech(item.tech)
                    return (
                      <li key={item.tech} className="surface-inner flex items-start gap-3 px-3.5 py-3">
                        <Icon icon={entry.icon} colored className="mt-[3px] size-[18px] shrink-0" />
                        <span className="min-w-0">
                          <span className="block text-15 font-semibold text-fg">{entry.name}</span>
                          {item.note && <span className="block text-13 text-fg-3">{item.note}</span>}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
