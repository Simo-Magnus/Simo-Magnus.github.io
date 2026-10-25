import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { HeroVisual } from '../components/HeroVisual'
import { SocialLinks } from '../components/SocialLinks'
import { site } from '../data/site'
import { useI18n } from '../i18n/useI18n'

export function Hero() {
  const { t, path } = useI18n()
  const city = site.about.location ? t.about.location.split(',')[0] : null
  const label = [city, t.brand.role].filter(Boolean).join(' · ')

  return (
    <section id="home" tabIndex={-1} aria-labelledby="home-title" className="focus:outline-none">
      <div className="container-page grid items-center gap-14 pt-16 pb-20 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pt-24 lg:pb-28">
        <div className="max-w-xl">
          <p className="label flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-machine" aria-hidden="true" />
            {label}
          </p>
          <h1 id="home-title" className="mt-5 text-34 font-bold text-fg sm:text-48">
            {site.brand.name}
          </h1>
          <p className="mt-5 max-w-md text-17 text-fg-2 sm:text-22 sm:leading-[32px] sm:font-light">{t.hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={{ pathname: path('/'), hash: '#projects' }}>
              {t.hero.primaryCta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink to={{ pathname: path('/'), hash: '#contact' }} variant="secondary">
              {t.hero.secondaryCta}
            </ButtonLink>
          </div>

          <SocialLinks className="mt-8" />
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
