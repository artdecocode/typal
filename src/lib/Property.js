import { getPropType, getNameWithDefault, makeOptional } from './'

/**
 * Representation of a property of a type.
 */
export default class Property {
  constructor() {
    /**
     * The name of the property.
     * @type {?string}
     */
    this.name = null
    /**
     * The description of the property.
     * @type {?string}
     */
    this.description = null
    /**
     * The type of the property.
     * @type {string}
     */
    this.type = '*'
    /**
     * The override on the type in externs.
     * @type {string}
     */
    this.closureType = ''
    /**
     * Whether the property has the default value.
     * @type {boolean}
     */
    this.hasDefault = false
    /**
     * The default value of the property.
     * @type {?(string|boolean|number)}
     */
    this.default = null
    /**
     * If the property is optional.
     * @type {boolean}
     */
    this.optional = false
  }
  static fromXML(...args) {
    const prop = new Property()
    prop.fromXML(...args)
    return prop
  }
  fromXML(content,
    { 'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number, 'type': type, 'default': def, 'closure': closure },
  ) {
    if (!name) throw new Error('Property does not have a name.')
    this.name = name
    if (content) this.description = content.trim()
    const t = getPropType({ number, string, boolean, type })
    this.type = t
    if (closure) this.closureType = closure
    else this.closureType = this.type
    if (def !== undefined) this.hasDefault = true
    if (this.hasDefault) this.default = def
    if (opt || this.hasDefault) this.optional = true
  }
  toJSDoc(parentParam = null, closure = false) {
    if (!this.name) throw new Error('Property does not have a name. Has it been constructed using fromXML?')
    const nameWithDefault = getNameWithDefault(this.name, this.default, this.type, parentParam)
    const name = this.optional ? `[${nameWithDefault}]` : nameWithDefault
    const dd = this.description ? ` ${this.description}` : ''
    const d = this.hasDefault ? ` Default \`${this.default}\`.` : ''
    const t = `${dd}${d}`
    const s = `{${closure ? this.closureType : this.type}} ${name}${t}`
    return s
  }
  toProp(closure = false) {
    const s = this.toJSDoc(null, closure)
    const p = ` * @prop ${s}`
    return p
  }
  toExtern() {
    const pp = []
    if (this.description) {
      let d = ` * ${this.description}`
      if (this.default) d += ` Default \`${this.default}\`.`
      pp.push(d)
    }
    const t = this.optional ? makeOptional(this.closureType) : this.closureType
    pp.push(` * @type {${t}}`)
    return pp.join('\n')
  }
  toParam(parentParam, ws = '', closure = false) {
    const s = this.toJSDoc(parentParam, closure)
    const p = `${ws} * @param ${s}`
    return p
  }
}