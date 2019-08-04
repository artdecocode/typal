import parse from '@typedefs/parser'
import { getPropType, getNameWithDefault, makeOptional, trimD } from './'
import Arg from './Arg' // eslint-disable-line
import serialise from './serialise'

/**
 * Representation of a property of a type.
 */
export default class Property {
  /**
   * @param {!Array<!Arg>} [args] If a property was written as a function with inner
   * <arg> elements, this array will contain parsed entries.
   */
  constructor(args = []) {
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
    /**
     * What aliases the property has.
     * @type {!Array<string>}
     */
    this.aliases = []

    /**
     * The parsed type.
     */
    this.parsed = undefined

    /**
     * Whether to skip function params serialisation (e.g., in case it's working incorrectly).
     */
    this.noParams = false
    this.parsed = null

    this.args = args

    /**
     * Whether this property is a static method.
     */
    this.staticMethod = false
  }
  static fromXML(...args) {
    const prop = new Property()
    prop.fromXML(...args)
    return prop
  }
  fromXML(content,
    { 'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number, 'type': type, 'default': def, 'closure': closure, 'alias': alias, 'aliases': aliases, 'noParams': noParams },
  ) {
    if (!name) throw new Error('Property does not have a name.')
    this.name = name
    if (content) this.description = trimD(content)
    const t = getPropType({ number, string, boolean, type })
    this.type = t
    if (closure) this.closureType = closure
    else this.closureType = this.type
    if (def !== undefined) this.hasDefault = true
    if (this.hasDefault) this.default = def
    if (opt || this.hasDefault) this.optional = true
    if (alias) this.aliases = [alias]
    if (aliases) this.aliases = aliases.split(/\s*,\s*/)

    if (noParams) this.noParams = noParams

    // if optional, we want to keep "| undefined" on records
    if (!this.optional && !this.noParams) {
      try {
        this.parsed = parse(this.closureType)
      } catch (err) { /* ok */
      }
    }
  }
  /**
   */
  toJSDoc(parentParam = null, closure = false, useNamespace = closure) {
    if (!this.name) throw new Error('Property does not have a name. Has it been constructed using fromXML?')
    const nameWithDefault = getNameWithDefault(this.name, this.default, this.type, parentParam)
    const name = this.optional ? `[${nameWithDefault}]` : nameWithDefault
    const dd = this.description ? ` ${this.description}` : ''
    const d = this.hasDefault ? ` Default \`${this.default}\`.` : ''
    const t = `${dd}${d}`
    const type = this.getTypedefType(closure, useNamespace)
    const s = `{${type}} ${name}${t}`
    return s
  }
  toProp(closure = false, useNamespace = closure) {
    const jsdoc = this.toJSDoc(null, closure, useNamespace)
    const t = indentWithAster(jsdoc, true)
    const p = ` * @prop ${t}`
    return p
  }
  /**
   * If the property is function, returns the heading above it for jsdoc.
   */
  toHeading() {
    const pp = []
    const { function: { args, return: ret } } = this.parsed
    const a = args.map(serialise)
    a.forEach((s, i) => {
      const { optional } = args[i]
      const { name = `arg${i}`, description } = this.args[i] || {}
      const arg = optional ? `[${name}]` : name
      const d = description ? ` ${description}` : ''

      pp.push(` * @param {${s}${optional ? '=' : ''}} ${arg}${d}`)
    })
    if (ret.name != 'void') {
      const r = serialise(ret)
      pp.push(` * @return {${r}}`)
    }
    return pp
  }
  /**
   * Generates string to append to methods when assigning to variables in externs.
   * Only works for functions.
   * E.g., `= function(arg1, arg2) {}`.
   */
  toExternsAssignment() {
    if (this.isParsedFunction) {
      const { function: { args } } = this.parsed
      const a = args.map((_, i) => {
        const { name = `arg${i}` } = this.args[i] || {}
        return name
      })
      return ` = function(${a.join(', ')}) {}`
    } else if (this.type.startsWith('function(')) { // if couldn't parse
      return ' = function() {}'
    }
    return ''
  }
  get isParsedFunction() {
    return this.parsed && this.parsed.name == 'function'
  }
  /**
   * Used to generate types of **functions** when the property is a function.
   * If closure flag was set, it will override it.
   * For non-methods, simply returns Object.
   * @todo decouple closure and usage of namespaces.
   * @param {boolean} [closure]
   * @param {boolean} [useNamespace]
   */
  getTypedefType(closure = false, useNamespace = closure) {
    // if (!this._isMethod) return 'Object'
    if (closure) return this.closureType
    if (!this.isParsedFunction) return this.type

    // const ret = this.parsed.function.return.name
    const { function: { args, return: ret } } = this.parsed
    const a = args
      .map(serialise)
      .map((type, i) => {
        const { optional } = args[i]
        const { name: argName = `arg${i}` } = this.args[i] || {}
        return `${argName}${optional ? '?' : ''}: ${type}`
      })
    const s = a.join(', ')
    const r = serialise(ret)

    return `(${s}) => ${r}`
  }
  toExtern(ws = '') {
    let pp = []
    if (this.description) {
      let d = indentWithAster(this.description)
      if (this.default) d += ` Default \`${this.default}\`.`
      pp.push(d)
    }
    if (this.isParsedFunction) {
      const lines = this.toHeading()
      pp.push(...lines)
    } else {
      const t = this.optional ? makeOptional(this.closureType) : this.closureType
      pp.push(` * @type {${t}}`)
    }
    if (ws) pp = pp.map(p => `${ws}${p}`)
    return pp.join('\n')
  }
  toParam(parentParam, ws = '', closure = false) {
    const s = this.toJSDoc(parentParam, closure)
    const p = `${ws} * @param ${s}`
    return p
  }
  makeAlias(name) {
    const clone = /** @type {!Property} */ (Object.assign(Object.create(Object.getPrototypeOf(this)), this))
    clone.description = `An alias for \`${this.name}\`.`
    clone.name = name
    return clone
  }
}

const indentWithAster = (description, skipFirst = false) => {
  const d = description.split('\n').map((l, i) => {
    if (skipFirst && !i) return l
    let s = ' *'
    if (l.length) s += ' '
    s += l
    return s
  }).join('\n')
  return d
}