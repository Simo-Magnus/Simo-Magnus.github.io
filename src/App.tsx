import { Outlet, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollManager } from './components/ScrollManager'
import { localeList } from './i18n/config'
import { I18nProvider } from './i18n/I18nProvider'
import type { Locale } from './i18n/types'
import { useI18n } from './i18n/useI18n'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'

function Shell() {
  const { t } = useI18n()
  return (
    <>
      <a href="#contenuto" className="btn btn-primary sr-only z-[60] focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {t.a11y.skipToContent}
      </a>
      <ScrollManager />
      <Header />
      <main id="contenuto" tabIndex={-1} className="focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function LocaleLayout({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <Shell />
    </I18nProvider>
  )
}

/**
 * Un gruppo di pagine per ogni lingua attiva: l'inglese alla radice (/), le altre con il
 * proprio prefisso (/it, /fr, /es).
 */
export function App() {
  return (
    <Routes>
      {localeList.map((info) => (
        <Route key={info.code} path={info.prefix || '/'} element={<LocaleLayout locale={info.code} />}>
          <Route index element={<HomePage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      ))}
    </Routes>
  )
}
