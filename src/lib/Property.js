import parse from '@typedefs/parser'
import { getPropType, getNameWithDefault, makeOptional, trimD } from './'
import Arg from './Arg' // eslint-disable-line
import serialise from './serialise'
import { readFileSync } from 'fs'
import { EOL } from 'os'

/**
 * Apply ` * ` indentation.
 * @param {string} string The string to indent.
 */
export const indentWithAster = (string, skipFirst = false) => {
  const d = string.split(EOL).map((l, i) => {
    if (skipFirst && !i) return l
    let s = ' *'
    if (l.length) s += ' '
    s += l
    return s
  }).join(EOL)
  return d
}

// from documentary
const getPartial = (boundExample) => {
  const s = boundExample
    .replace(/^\s*\r?\n/gm, '') // remove empty lines
  const minLength = s
    .split(EOL)
    .reduce((acc, current) => {
      const [{ length = 0 } = {}] = /^\s*/.exec(current) || []
      if (length < acc) return length
      return acc
    }, Infinity)
  const e = boundExample
    .replace(new RegExp(`^ {${minLength}}`, 'gm'), '')
  return e
}

/**
 * Representation of a property of a type.
 * @implements {_typal.Property}
 */
export default class Property {
  /**
   * @param {Array<!Arg>} [args] If a property was written as a function with inner
   * <arg> elements, this array will contain parsed entries.
   */
  constructor(args = null) {
    /**
     * The name of the property.
     * @suppress {checkTypes}
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

    /**
     * @type {!Array<string>}
     */
    this.examples = []

    this.templateNoReturn = false
  }
  /**
   * For README documentation.
   * Serialises functions to TypeScript, e.g.,
   * (param: string) => void
   */
  toTypeScriptFunction(serialiseType) {
    if (!this.parsed) throw new Error('The property was not parsed.')
    let { function: { new: ne, args, return: ret, this: thisType, variableArgs } } = this.parsed
    if (ne) ret = ne
    const a = args
      .map((ar) => serialiseType(ar))
      .map((type, i) => {
        const { optional: argOptional } = args[i]
        let {
          name = `arg${i}`, optional = argOptional,
        } = this.argsWithoutThis[i] || {}
        name = `${name}${optional ? '?' : ''}`
        return `${name}: ${type}`
      })
    if (thisType) {
      const tt = serialiseType(thisType)
      a.unshift(`this: ${tt}`)
    }
    if (variableArgs) {
      const tt = serialiseType(variableArgs)
      let n = '...args'
      try {
        n = `${this.args[this.args.length - 1].name}`
      } catch (er) { /* */ }
      a.push(`${n}: ${tt}[]`)
    }
    const j = a.join(', ')
    const r = ret ? serialiseType(ret) : '?'
    let typeName = `(${j}) => ${r}`
    if (ne) typeName = 'new ' + typeName
    return typeName
  }
  clearNamespace(namespace, s = new RegExp(`([!?])?${namespace}\\.`, 'g')) {
    if (!namespace) return
    if (this._closure) this._closure = this._closure.replace(s, '$1')
    this.type = this.type.replace(s, '$1')
    return s
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
      'type': type, 'default': def, 'closure': closure, 'alias': alias,
      'aliases': aliases, 'example': example, 'example-override': exampleOverride = '',
      'noParams': noParams, 'static': Static, 'initial': initial,
      'template-no-return': templateNoReturn,
    },
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
    if (example) this.examples = Property.readExamples(example, exampleOverride)
    if (templateNoReturn) this.templateNoReturn = true
  }
  static readExamples(Example, exampleOverride = '') {
    const overrides = exampleOverride.split(/\s*,\s*/)
    const examples = Example.split(/\s*,\s*/)
    return examples.map((example) => {
      const f = readFileSync(example, 'utf8')
      let ff = f
      const fre = /\/\* start example \*\/\r?\n([\s\S]+?)\r?\n\s*\/\* end example \*\//
        .exec(f)
      if (fre) {
        const [, boundExample] = fre
        ff = getPartial(boundExample)
      }
      overrides.forEach((o) => {
        const [from, to] = o.split(/\s*=>\s*/)
        ff = ff.replace(`'${from}'`, `'${to}'`)
        ff = ff.replace(`"${from}"`, `"${to}"`)
      })
      ff = ff.replace(/@/g, '＠')
      return ff
    })
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
        if (this.isParsedFunction && !this.args) this.args = []
      } catch (err) { /* ok */
        this.parsed = null
      }
    }
  }
  /**
   * Returns the first line of JSDoc, e.g., `{type} Description`, and examples if present.
   */
  toJSDoc(parentParam = null, closure = false, useNamespace = closure, includeExamples = false) {
    if (!this.name) throw new Error('Property does not have a name. Has it been constructed using fromXML?')
    const nameWithDefault = getNameWithDefault(this.name, this.optional ? this.default : null, this.type, parentParam)
    const name = this.optional ? `[${nameWithDefault}]` : nameWithDefault
    const { descriptionWithDefault } = this
    const t = descriptionWithDefault ? ` ${descriptionWithDefault}` : ''

    const type = this.getTypedefType(closure, useNamespace)
    let s = `{${type}} ${name}${t}`
    if (includeExamples) {
      const exampleLines = Property.getExampleLines(this.examples, {
        addExample: false, indent: false,
      })
      const e = exampleLines.join(EOL)
        .replace(/\*/g, '＊')
      if (e) s += `${EOL}${e}`
    }
    return s
  }
  get descriptionWithDefault() {
    let s = this.description || ''
    const d = this.hasDefault ? `${/``` */.test(this.description) ? EOL :
      (s ? ' ' : '')}Default \`${this.default}\`.` : ''
    return `${s}${d}`
  }
  /**
   * Used in `@typedefs`.
   */
  toProp(closure = false, useNamespace = closure) {
    const jsdoc = this.toJSDoc(null, closure, useNamespace, true)
    const t = indentWithAster(jsdoc, true)
    const p = ` * @prop ${t}`
    return p
  }
  /**
   * If the property is function, returns the heading above it for jsdoc.
   */
  toHeading(fromTemplate) {
    const pp = []
    const { function: { args, return: ret, variableArgs, this: thisType } } = this.parsed
    const a = args.map(ar => serialise(ar))
    a.forEach((s, i) => {
      const { optional } = args[i]
      const { name = `arg${i}`, description } = this.args[i] || {}
      const arg = optional ? `[${name}]` : name
      const d = description ? ` ${description}` : ''

      pp.push(` * @param {${s}${optional ? '=' : ''}} ${arg}${d}`)
    })
    if (variableArgs) {
      const { varArgsName, varArgsDesc } = getVarArgsName(this.args || [])
      const l = [varArgsName, varArgsDesc].filter(Boolean).join(' ')
      pp.push(` * @param {...${serialise(variableArgs)}} ${l}`)
    }
    if (thisType) pp.push(` * @this {${serialise(thisType)}}`)

    if (ret && ret.name != 'void') { // vs code assumes void with no return
      if (fromTemplate && this.templateNoReturn) return pp
      const r = serialise(ret)
      pp.push(` * @return {${r}}`)
    }
    return pp
  }
  /**
   * When args are assigned, this returns the array without the first arg.
   */
  get argsWithoutThis() {
    let argsWithoutThis = this.args
    if (this.args && this.args[0] && this.args[0].name == 'this') {
      const [, ...args] = this.args
      return args
    }
    return argsWithoutThis
  }
  /**
   * Generates string to append to methods when assigning to variables in externs.
   * Only works for functions.
   * E.g., `= function(arg1, arg2) {}`.
   */
  toExternsAssignment() {
    if (this.isParsedFunction) {
      const { function: { args, variableArgs } } = this.parsed
      const a = args.map((_, i) => {
        const { name = `arg${i}` } = this.argsWithoutThis[i] || {}
        return name
      })
      if (variableArgs) {
        const { varArgsName } = getVarArgsName(this.args || [])
        a.push(`...${varArgsName}`)
      }
      return ` = function(${a.join(', ')}) {}`
    } else if (this.type.startsWith('function(')) { // if couldn't parse
      return ' = function() {}'
    }
    return ''
  }
  get isParsedFunction() {
    return !!this.parsed && this.parsed.name == 'function'
  }
  /**
   * Create type for VSCode.
   * Used to generate types of **functions**, e.g., when the property is `function` or `fn`.
   * If closure FLAG was set, it will override it.
   * @param {boolean} [closure]
   * @param {boolean} [useNamespace]
   */
  getTypedefType(closure = false, useNamespace = closure) {
    if (closure) return this.closureType
    if (!this.isParsedFunction) return this.type

    return this.toTypeScriptFunction(serialise)
  }
  /**
   * The heading for externs (and template functions)
   */
  toExtern(ws = '', fromTemplate = false) {
    let pp = []
    const { descriptionWithDefault } = this
    if (descriptionWithDefault) {
      const d = indentWithAster(descriptionWithDefault)
      pp.push(...d.split(EOL))
    }
    if (!this.optional && this.isParsedFunction) {
      const lines = this.toHeading(fromTemplate)
      pp.push(...lines)
    } else {
      const t = this.optional ? makeOptional(this.closureType) : this.closureType
      pp.push(` * @type {${t}}`)
    }
    if (fromTemplate && this.examples.length) {
      const el = Property.getExampleLines(this.examples)
      pp.push(...el)
    }
    if (ws) pp = pp.map(p => `${ws}${p}`)
    return pp.join(EOL)
  }
  /**
   * @param {!Array<string>} examples The examples.
   */
  static getExampleLines(examples, { addExample = true, indent = true } = {}) {
    const pp = []
    if (addExample) pp.push(' * @example')
    examples.forEach((example) => {
      const exampleLines = example.split(EOL)
      let currentComment = [], currentBlock = []
      let state = '', newState
      let eg = exampleLines.reduce((acc, current) => {
        if (current.startsWith('///')) {
          newState = 'comment'
          currentComment.push(current)
        } else {
          newState = 'block'
          currentBlock.push(current)
        }
        if (!state) state = newState
        if (newState != state) {
          if (newState == 'block') {
            acc.push(currentComment.join(EOL))
            currentComment = []
          } else {
            acc.push(currentBlock.join(EOL))
            currentBlock = []
          }
          state = newState
        }
        return acc
      }, [])
      if (currentComment.length) {
        eg.push(currentComment.join(EOL))
      } else if (currentBlock.length) {
        eg.push(currentBlock.join(EOL))
      }
      eg = eg.reduce((acc, e) => {
        if (e.startsWith('///')) {
          e = e.replace(/^\/\/\/\s+/gm, '')
          acc.push(...e.split(EOL))
        } else {
          acc.push('```js')
          acc.push(...e.split(EOL))
          acc.push('```')
        }
        return acc
      }, [])
      if (indent) eg = eg.map(e => indentWithAster(e))
      pp.push(...eg)
    })
    return pp
  }
  toParam(parentParam, ws = '', closure = false, useNamespace = false) {
    const s = this.toJSDoc(parentParam, closure, useNamespace)
    const [firstLine, ...rest] = s.split(EOL)
    const m = [`@param ${firstLine}`, ...rest].map(l => `${ws} * ${l}`)
    const p = m.join(EOL)
    return p
  }
  makeAlias(name) {
    const clone = /** @type {!Property} */ (Object.assign(Object.create(Object.getPrototypeOf(this)), this))
    clone.description = `An alias for \`${this.name}\`.`
    clone.name = name
    return clone
  }
}

/**
 * @param {!Array<!Arg>} args
 */
const getVarArgsName = (args) => {
  let varArgsName = 'args'
  const { name: lastArgName = '', description } = args[args.length - 1] || {}
  if (lastArgName.startsWith('...')) varArgsName = lastArgName.replace('...', '')
  return { varArgsName, varArgsDesc: description }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */