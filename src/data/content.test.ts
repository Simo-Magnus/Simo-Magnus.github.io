import { describe, expect, it } from 'vitest'
import { localeList } from '../i18n/config'
import { en } from '../i18n/locales/en'
import { getMessages } from '../i18n/messages'
import { brandIcons } from './brandIcons'
import { filterProjects, findProject, localizeProjects, projectCategories, projectData } from './projects'
import { site } from './site'
import { skillData } from './skills'
import { getTechnology, technologyIds } from './technologies'

/** Forma di un oggetto (chiavi e lunghezze degli elenchi), per confrontare le lingue tra loro. */
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => [k, shape(v)]))
  }
  return typeof value
}

// Controlli sui dati: evitano link rotti e riferimenti mancanti quando si modificano i contenuti.
describe('progetti', () => {
  it('hanno slug unici e validi per un indirizzo', () => {
    const slugs = projectData.map((project) => project.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  })

  it('usano solo categorie, tecnologie e competenze conosciute', () => {
    for (const project of projectData) {
      expect(project.categories.length).toBeGreaterThan(0)
      for (const category of project.categories) expect(projectCategories).toContain(category)
      for (const id of [...project.tech, ...(project.skills ?? [])]) expect(technologyIds, `${project.slug}: ${id}`).toContain(id)
    }
  })

  it('hanno link esterni completi', () => {
    for (const link of projectData.flatMap((project) => project.links)) expect(link.url).toMatch(/^https:\/\//)
  })

  it('vengono filtrati per categoria', () => {
    const projects = localizeProjects(en)
    expect(filterProjects(projects, 'all')).toHaveLength(projects.length)
    expect(filterProjects(projects, 'web').every((project) => project.categories.includes('web'))).toBe(true)
    expect(findProject(projects, 'non-esiste')).toBeUndefined()
  })
})

describe('lingue', () => {
  it.each(localeList.map((info) => info.code))('%s ha la stessa struttura dell’inglese', (code) => {
    expect(shape(getMessages(code))).toEqual(shape(en))
  })

  it.each(localeList.map((info) => info.code))('%s ha i testi di ogni progetto, elenco per elenco', (code) => {
    const t = getMessages(code)
    for (const data of projectData) {
      const text = t.projects[data.slug]
      expect(text, data.slug).toBeDefined()
      expect(text.features?.length ?? 0, `${data.slug}: features`).toBe(data.featureIcons?.length ?? 0)
      expect(text.screenshots?.length ?? 0, `${data.slug}: screenshots`).toBe(data.screenshots?.length ?? 0)
      expect(text.links?.length ?? 0, `${data.slug}: links`).toBe(data.links.length)
    }
    expect(t.about.philosophy).toHaveLength(site.about.philosophyIcons.length)
  })

  it.each(localeList.map((info) => info.code))('%s ha titoli, note e nomi di tutte le competenze', (code) => {
    const t = getMessages(code)
    for (const category of skillData) {
      expect(t.skills[category.id], category.id).toBeDefined()
      for (const item of category.items) expect(t.skills[category.id].notes[item.tech], `${category.id}: ${item.tech}`).toBeTruthy()
    }
    const used = [...skillData.flatMap((c) => c.items.map((i) => i.tech)), ...projectData.flatMap((p) => p.skills ?? [])]
    // Gli id delle competenze non di marca sono in minuscolo e devono avere un nome tradotto.
    for (const id of used) if (id[0] === id[0].toLowerCase()) expect(t.tech[id], id).toBeTruthy()
  })
})

describe('configurazione', () => {
  it('le icone dei marchi esistono', () => {
    const refs = [...technologyIds.map((id) => getTechnology(id).icon), ...site.socials.map((social) => social.icon)]
    for (const ref of refs) if ('brand' in ref) expect(brandIcons).toHaveProperty(ref.brand)
  })

  it('i social hanno un indirizzo https oppure null', () => {
    for (const social of site.socials) if (social.url !== null) expect(social.url).toMatch(/^https:\/\//)
    expect(site.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  })

  it('il progetto in evidenza esiste', () => {
    expect(projectData.some((project) => project.slug === site.hero.featuredProjectSlug)).toBe(true)
  })
})
