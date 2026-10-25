import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'

export function HomePage() {
  useDocumentMeta()
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </>
  )
}
