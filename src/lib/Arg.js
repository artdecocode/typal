import { trimD, getPropType } from './'

export default class Arg {
  constructor() {
    /** @type {?string} */
    this.name = null
    /** @type {string} */
    this.type = ''
    /** @type {?boolean} */
    this.optional = null
    /** @type {string} */
    this.description = ''
  }
  fromXML(content,
    { 'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number, 'type': type },
  ) {
    if (!name) throw new Error('Argument does not have a name.')
    this.name = name
    if (content) this.description = trimD(content)
    const t = getPropType({ number, string, boolean, type })
    this.type = t
    if (opt) this.optional = true
  }
}
