import { describe, expect, it } from 'vitest'
import { en } from '../i18n/locales/en'
import { it as itText } from '../i18n/locales/it'
import { buildMailto, contactErrorText, validateContact } from './contact'

const valid = { name: 'Mario Rossi', email: 'mario@esempio.it', message: 'Ciao, vorrei parlarti di un progetto.' }

describe('validateContact', () => {
  it('accetta valori corretti', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('segnala i campi vuoti con il tipo di errore', () => {
    expect(validateContact({ name: ' ', email: '', message: '' })).toEqual({
      name: 'nameRequired',
      email: 'emailRequired',
      message: 'messageRequired',
    })
  })

  it('rifiuta email non valide', () => {
    for (const email of ['mario', 'mario@', 'mario@esempio', 'mario @esempio.it']) {
      expect(validateContact({ ...valid, email }).email).toBe('emailInvalid')
    }
  })

  it('rifiuta messaggi troppo brevi', () => {
    expect(validateContact({ ...valid, message: 'Ciao' }).message).toBe('messageShort')
  })
})

describe('contactErrorText', () => {
  it('traduce l’errore nella lingua indicata con i limiti al posto dei segnaposto', () => {
    expect(contactErrorText('messageShort', en.contact.errors)).toContain('10')
    expect(contactErrorText('nameRequired', itText.contact.errors)).toBe(itText.contact.errors.nameRequired)
    expect(contactErrorText('nameLong', en.contact.errors)).toContain('80')
  })
})

describe('buildMailto', () => {
  it('compone destinatario, oggetto e testo codificati', () => {
    const url = buildMailto('dev@esempio.it', valid, '[Portfolio] Message from Mario Rossi')
    expect(url.startsWith('mailto:dev@esempio.it?subject=')).toBe(true)
    const params = new URLSearchParams(url.split('?')[1])
    expect(params.get('subject')).toBe('[Portfolio] Message from Mario Rossi')
    expect(params.get('body')).toContain('Ciao, vorrei parlarti di un progetto.')
    expect(params.get('body')).toContain('mario@esempio.it')
  })
})
