const parse = require('@typedefs/parser');
const { getPropType, getNameWithDefault, makeOptional, trimD } = require('./');
const Arg = require('./Arg'); // eslint-disable-line
const serialise = require('./serialise');

/**
 * Representation of a property of a type.
 * @implements {_typal.Property}
 */
class Property {
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
     * @type {?string}
     */
    this._type = null
    /**
     * The override on the type in externs.
     * @type {string}
     */
    this.closureType = ''
    /**
     * The actual `closure` attribute.
     * @type {?string}
     */
    this._closure = null
    /**
     * The default value of the property. If the default is given as null, it will be record not as `null` but as `"null"` here.
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
     * Whether to skip function params serialisation (e.g., in case it's working incorrectly).
     */
    this.noParams = false
    /**
     * The parsed type.
     * @type {?_typedefsParser.Type}
     */
    this.parsed = null

    this.args = args

    /**
     * Whether this property is a static method.
     * @type {boolean}
     */
    this._static = false
  }
  /**
   * Serialises functions to TypeScript, e.g.,
   * (param: string) => void
   */
  toTypeScriptType(getLinks) {
    if (!this.parsed) throw new Error('The property was not parsed.')
    const { function: { args, return: ret } } = this.parsed
    const a = args.map(({ name: typeName }, i) => {
      let { name = `arg${i}`, type: t = typeName, optional } = this.args[i] || {}
      name = `${name}${optional ? '?' : ''}`
      if (t) t = getLinks(t)
      return `${name}${t ? `: ${t}` : ''}`
    })
    const j = a.join(', ')
    const r = getLinks(ret ? ret.name || '*' : '*')
    const typeName = `(${j}) => ${r}`
    return typeName.replace(/\*/g, '\\*')
  }
  /**
   * When writing externs, this will prevent adding `.prototype`, e.g.,
   * `Type.static` instead of `Type.prototype.static`.
   */
  get static() {
    return this._static
  }
  static fromXML(...args) {
    const prop = new Property()
    prop.fromXML(...args)
    return prop
  }
  /**
   * Whether the property has the default value.
   * @type {boolean}
   */
  get hasDefault() {
    return this.default !== null
  }
  fromXML(content,
    {
      'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number,
      'type': type, 'default': def, 'closure': closure, 'alias': alias, 'aliases': aliases,
      'noParams': noParams, 'static': Static, 'initial': initial },
  ) {
    if (!name) throw new Error('Property does not have a name.')
    this.name = name
    if (content) this.description = trimD(content)
    const t = getPropType({ number, string, boolean, type })

    if (noParams) this.noParams = noParams

    if (closure) this._closure = closure

    this.type = t

    if (def !== undefined) this.default = def
    else if (initial !== undefined) this.default = initial

    if (opt || def !== undefined /* but not initial */) this.optional = true
    if (alias) this.aliases = [alias]
    if (aliases) this.aliases = aliases.split(/\s*,\s*/)

    if (Static) this._static = true
  }
  get type() {
    return this._type || '*'
  }
  /**
   * Type can be overridden when removing namespace from properties.
   */
  set type(value) {
    this._type = value || null
    this.closureType = this._closure || this._type || ''
    // can also check if closure changed or just type
    if (!this.noParams) {
      try {
        this.parsed = parse(this.closureType)
      } catch (err) { /* ok */
        this.parsed = null
      }
    }
  }
  /**
   * Returns the first line of JSDoc, e.g., `{type} Description`.
   */
  toJSDoc(parentParam = null, closure = false, useNamespace = closure) {
    if (!this.name) throw new Error('Property does not have a name. Has it been constructed using fromXML?')
    const nameWithDefault = getNameWithDefault(this.name, this.default, this.type, parentParam)
    const name = this.optional ? `[${nameWithDefault}]` : nameWithDefault
    const { descriptionWithDefault } = this
    const t = descriptionWithDefault ? ` ${descriptionWithDefault}` : ''

    const type = this.getTypedefType(closure, useNamespace)
    const s = `{${type}} ${name}${t}`
    return s
  }
  get descriptionWithDefault() {
    let s = this.description || ''
    const d = this.hasDefault ? `${/``` */.test(this.description) ? '\n' :
      (s ? ' ' : '')}Default \`${this.default}\`.` : ''
    return `${s}${d}`
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
    const a = args.map(ar => serialise(ar))
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
   * Used to generate types of **functions**, e.g., when the property is `function` or `fn`.
   * If closure FLAG was set, it will override it.
   * @param {boolean} [closure]
   * @param {boolean} [useNamespace]
   */
  getTypedefType(closure = false, useNamespace = closure) {
    if (closure) return this.closureType
    if (!this.isParsedFunction) return this.type

    // const ret = this.parsed.function.return.name
    const { function: { args, return: ret } } = this.parsed
    const a = args
      .map((ar) => serialise(ar))
      .map((type, i) => {
        const { optional } = args[i]
        const { name: argName = `arg${i}` } = this.args[i] || {}
        return `${argName}${optional ? '?' : ''}: ${type}`
      })
    const s = a.join(', ')
    const r = ret ? serialise(ret) : 'void'

    return `(${s}) => ${r}`
  }
  toExtern(ws = '') {
    let pp = []
    const { descriptionWithDefault } = this
    if (descriptionWithDefault) {
      const d = indentWithAster(descriptionWithDefault)
      pp.push(d)
    }
    if (!this.optional && this.isParsedFunction) {
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

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */

module.exports = Property