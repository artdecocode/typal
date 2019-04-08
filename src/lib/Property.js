import { getPropType, getNameWithDefault } from '.'

/**
 * Representation of a property of a type.
 */
export default class Property {
  static fromXML(...args) {
    const prop = new Property()
    prop.fromXML(...args)
    return prop
  }
  fromXML(content,
    { 'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number, 'type': type, 'default': def },
  ) {
    if (!name) throw new Error('Property does not have a name.')
    this.name = name
    if (content) this.description = content.trim()
    const t = getPropType({ number, string, boolean, type })
    this.type = t
    if (def !== undefined) this.hasDefault = true
    if (this.hasDefault) this.default = def
    if (opt || this.hasDefault) this.optional = true
  }
  toJSDoc(parentParam, externs = false) {
    const nameWithDefault = getNameWithDefault(this.name, this.default, this.type, parentParam)
    const name = this.optional ? `[${nameWithDefault}]` : nameWithDefault
    const dd = this.description ? ` ${this.description}` : ''
    const d = this.hasDefault ? ` Default \`${this.default}\`.` : ''
    const t = `${dd}${d}`
    const s = `{${this.type}} ${name}${externs ? '' : t}`
    return s
  }
  toProp(externs = false) {
    const s = this.toJSDoc(undefined, externs)
    const p = ` * @prop ${s}`
    return p
  }
  toParam(parentParam, ws = '') {
    const s = this.toJSDoc(parentParam)
    const p = `${ws} * @param ${s}`
    return p
  }
}