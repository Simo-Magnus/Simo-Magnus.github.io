import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'
import { filterProjects, localizeProjects } from './data/projects'
import { en } from './i18n/locales/en'
import { it as itText } from './i18n/locales/it'

const projects = localizeProjects(en)

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

function projectGrid() {
  const section = document.getElementById('projects')!
  return within(section).queryAllByRole('article')
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.classList.remove('dark')
})

describe('home (inglese, predefinita)', () => {
  it('mostra titolo, sezioni e navigazione', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Simo-Magnus')
    for (const id of ['home', 'projects', 'about', 'skills', 'contact']) {
      expect(document.getElementById(id)).not.toBeNull()
    }
    expect(screen.getByRole('navigation', { name: en.a11y.mainNav })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('en')
  })

  it('il riquadro dello sviluppatore porta alla sezione "Chi sono"', () => {
    renderAt('/it/projects/uninotes')
    const logo = screen.getByRole('link', { name: `Simo-Magnus: ${itText.nav.about}` })
    expect(logo).toHaveAttribute('href', '/it/#about')
  })

  it('filtra i progetti per categoria', async () => {
    const user = userEvent.setup()
    renderAt('/')
    expect(projectGrid()).toHaveLength(projects.length)

    await user.click(screen.getByRole('button', { name: /^Web/ }))
    expect(screen.getByRole('button', { name: /^Web/ })).toHaveAttribute('aria-pressed', 'true')
    expect(projectGrid()).toHaveLength(filterProjects(projects, 'web').length)

    await user.click(screen.getByRole('button', { name: new RegExp(`^${en.projectsList.all}`) }))
    expect(projectGrid()).toHaveLength(projects.length)
  })

  it('cambia tema e ricorda la scelta', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: en.a11y.themeToDark }))
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('sm-theme')).toBe('dark')
    await user.click(screen.getByRole('button', { name: en.a11y.themeToLight }))
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('apre e chiude il menu mobile', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const toggle = screen.getByRole('button', { name: en.a11y.openMenu })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(screen.getByRole('button', { name: en.a11y.closeMenu })).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: en.a11y.openMenu })).toHaveAttribute('aria-expanded', 'false')
  })

  it('valida il modulo contatti', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: new RegExp(en.contact.submit) }))
    expect(screen.getByLabelText(en.contact.name)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText(en.contact.errors.nameRequired)).toBeInTheDocument()
    expect(screen.getByLabelText(en.contact.name)).toHaveFocus()

    await user.type(screen.getByLabelText(en.contact.name), 'Mario')
    expect(screen.queryByText(en.contact.errors.nameRequired)).not.toBeInTheDocument()
  })
})

describe('lingue', () => {
  it('mostra la versione italiana sotto /it', () => {
    renderAt('/it/')
    expect(screen.getByText(itText.hero.subtitle)).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: itText.a11y.mainNav })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('it')
  })

  it('gli errori del modulo seguono la lingua anche dopo il cambio', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await user.click(screen.getByRole('button', { name: new RegExp(en.contact.submit) }))
    expect(screen.getByText(en.contact.errors.nameRequired)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /^Language/ }))
    await user.click(screen.getByRole('link', { name: /Italiano/ }))
    expect(screen.queryByText(en.contact.errors.nameRequired)).not.toBeInTheDocument()
    expect(screen.getByText(itText.contact.errors.nameRequired)).toBeInTheDocument()
  })

  it('il selettore porta alla stessa pagina nell’altra lingua', async () => {
    const user = userEvent.setup()
    renderAt('/projects/uninotes')
    await user.click(screen.getByRole('button', { name: /^Language/ }))
    await user.click(screen.getByRole('link', { name: /Italiano/ }))
    expect(screen.getByRole('heading', { name: itText.project.others })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('UniNotes')
  })
})

describe('pagine progetto', () => {
  it.each(projects.map((project) => [project.slug, project.name] as const))('mostra il progetto %s', (slug, name) => {
    renderAt(`/projects/${slug}`)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(name)
    expect(screen.getByRole('heading', { name: en.project.others })).toBeInTheDocument()
    expect(document.title).toContain(name.split(' ')[0])
  })

  it('mostra la pagina 404 per un progetto inesistente', () => {
    renderAt('/projects/non-esiste')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.notFound.title)
  })
})
