import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useI18n } from '../i18n/useI18n'

export function NotFoundPage() {
  const { t, path } = useI18n()
  useDocumentMeta({ title: t.notFound.metaTitle, path: path('/404') })
  return (
    <section className="container-page flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <p className="label">{t.notFound.label}</p>
      <h1 className="mt-3 text-34 font-bold sm:text-48">{t.notFound.title}</h1>
      <p className="mt-4 max-w-md text-17 text-fg-2">{t.notFound.text}</p>
      <ButtonLink to={path('/')} className="mt-8">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t.notFound.back}
      </ButtonLink>
    </section>
  )
}
