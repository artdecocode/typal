import extractTags from 'rexml'
import Property from './Property'
import { addSuppress, makeBlock, getExternDeclaration, makeOptional } from './'
import { trimD } from './'
import Arg, { extractArgs } from './Arg' // eslint-disable-line
import { getLinks } from './get-links'
import makePropsTable from './make-props-table'

/**
 * A representation of a type.
 * @implements {_typal.Type}
 */
export default class Type {
  constructor() {
    /**
     * The name of the type.
     * @type {string}
     */
    this.name = ''
    /** @type {?string} */
    this.type = null
    /**
     * An overriding type for closure to generate externs, e.g.,
     * `function(string): boolean` instead of `(s:string) => boolean`.
     * @type {?string}
     * @deprecated
     */
    this.closureType = null
    /** @type {?string} */
    this.description = null
    /** @type {boolean} */
    this.noToc = false
    /** @type {boolean} */
    this.spread = false
    /** @type {boolean} */
    this.noExpand = false
    /** @type {boolean} */
    this.import = false
    /** @type {?string} */
    this.link = null
    /** @type {!Array<!Property>} */
    this.properties = []
    /**
     * The type's namespace, e.g., `typal`.
     * @type {?string}
     */
    this.namespace = null
    /**
     * @type {boolean}
     * Whether the externs should have the form of
```js
/＊＊ @constructor ＊/
_ns.Type
/＊＊ @boolean ＊/
_ns.Type.prototype.isConstructor
```
     */
    this.isConstructor = false
    /**
     * @type {boolean}
     * Same as `constructor`, but with `@interface` annotation.
     */
    this.isInterface = false

    /**
     * @type {boolean}
     * Same as `constructor`, but with `@record` annotation.
     */
    this.isRecord = false
    /**
     * Types `@constructor`, `@interface` and `@record` can inherit properties from other types using `@extends`.
     * @see https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#extends-type
     * @type {?string}
     */
    this.extends = null

    /**
     * @type {Array<!Arg>}
     */
    this.args = null
  }
  /**
   * Create type from the xml content and properties parsed with `rexml`.
   */
  fromXML(content, {
    'name': name, 'type': type, 'desc': desc, 'noToc': noToc, 'spread': spread,
    'noExpand': noExpand, 'import': i, 'link': link, 'closure': closure,
    'constructor': isConstructor, 'extends': ext, 'interface': isInterface,
    'record': isRecord,
  }, namespace, rootNamespace = null) {
    if (!name) throw new Error('Type does not have a name.')
    this.name = name

    if (type) this.type = type
    if (closure) this.closureType = closure
    else this.closureType = this.type
    if (desc) this.description = trimD(desc)
    this.noToc = !!noToc
    this.spread = !!spread
    this.noExpand = !!noExpand
    this.import = !!i
    if (link) this.link = link
    if (isConstructor === true) this.isConstructor = isConstructor
    if (isInterface === true) this.isInterface = isInterface
    if (isRecord === true) this.isRecord = isRecord
    if (ext) this.extends = ext

    if (content) {
      const ps = extractTags('prop', content)
      const props = ps.map(({ content: c, props: p }) => {
        const pr = new Property()
        pr.fromXML(c, p)
        return pr
      })
      const functions = extractTags(['function', 'fn', 'static'], content)

      const fnProps = functions.map(({ content: c, props: p, tag }) => {
        const isStatic = tag == 'static'
        const { newContent, argsArgs } = extractArgs(c, rootNamespace)

        const { 'async': async, 'return': ret = '', ...rest } = p
        let { 'args': args = '' } = p

        if (!args) {
          args = argsArgs.map(({ fullType }) => fullType).join(',')
        }

        let r = ret.replace(/\n\s*/g, ' ')
        if (async && r) r = `!Promise<${r}>`
        else if (async) r = '!Promise'
        // generate function string which will be parsed
        // a hack to convert args into _typedefParser.Type
        let fnType = `function(${args})`
        if (r) fnType += `: ${r}`
        rest['type'] = fnType // e.g., a prop will have type `function()`
        const pr = new Property(argsArgs)

        pr.fromXML(newContent, rest)
        if (isStatic) pr._static = true
        return pr
      })
      const all = [...props, ...fnProps]
      const { s, n } = all.reduce((acc, p) => {
        if (p.static) acc.s.push(p)
        else acc.n.push(p)
        return acc
      }, { s: [], n: [] })
      this.properties = [...s, ...n]
    }
    if (namespace) this.namespace = namespace
  }
  get shouldPrototype() {
    return this.isConstructor || this.isInterface || this.isRecord
  }
  /**
   * When printing to externs, this is the right-hand part.
   * Used in constructors, interfaces.
   * @example
   * _ns.Type = function(paramA, paramB)
   * @param {!Array<!Arg>} array The parsed arguments
   */
  // * @param {string} string The inner arguments part as string
  setAssignment(array) {
    // this._assignmentString = string
    this.args = array
  }
  toExtern() {
    let s
    if (this.closureType) { //  && !(this.isConstructor || this.isInterface)
      s = ` * @typedef {${this.closureType}}`
    } else if (!this.shouldPrototype) {
      const nn = getSpread(this.properties, true)
      s = ` * @typedef {${nn}}`
    }
    if (s) {
      if (this.description) s = ` * ${this.description}\n${s}`
      s = makeBlock(s)
      s = s + getExternDeclaration(this.namespace, this.name)
      return s
    }
    // constructor
    return this.toPrototype()
  }
  /**
   * @param {boolean} [useNamespace=false]
   */
  getFullNameForExtends(useNamespace = false) {
    const name = `${this.extends ? '$' : ''}${this.name}`
    const n = useNamespace ? `${this.ns}${name}` : name
    return n
  }
  getTypedefType() {
    return 'Object'
  }
  /**
   * Removes the namespace from the type.
   * @param {string} rootNamespace
   * @param {!RegExp} [s] Constructed regex.
   */
  clearNamespace(rootNamespace, s = new RegExp(`([!?])?${rootNamespace}\\.`, 'g')) {
    if (this.type) this.type = this.type.replace(s, '$1')
    if (this.extends) this.extends = this.extends.replace(s, '$1')
    return s
  }
  /**
   * Used to generate typedefs, but not externs.
   * This covers both when extending and when not.
   * @param {boolean} [closure=false]
   * @param {boolean} [noSuppress=false]
   * @param {boolean} [useNamespace=false]
   */
  toNaturalTypedef(closure = false, noSuppress = false, useNamespace = closure) {
    const t = (closure ? this.closureType : this.type) || this.getTypedefType()
    const dd = ` ${this.getFullNameForExtends(useNamespace)}${this.descriptionWithTag}`
    const s = ` * @typedef {${t}}${dd}`
    /**
     * @type {!Array<!Property>}
     */
    const properties = this.properties ? this.properties.reduce((acc, p) => {
      if (p._static) return acc
      acc.push(p)
      const a = p.aliases.map(al => p.makeAlias(al))
      acc.push(...a)
      return acc
    }, []) : []
    const p = properties.map((pr) => {
      const sp = pr.toProp(closure, useNamespace)
      return sp
    })
    let typedef = [s, ...p].join('\n')
    if (closure && !noSuppress) typedef = addSuppress(typedef)
    typedef = makeBlock(typedef)
    return typedef
  }
  get descriptionWithTag() {
    const d = this.description ? ` ${this.description}` : ''
    const t = this.tag ? ` \`＠${this.tag}\`` : ''
    return `${t}${d}`
  }
  /**
   * Generate `@typedef` block comment for the type.
   * @param {boolean} [closure=false]
   * @param {boolean} [noSuppress=false]
   * @param {boolean} [useNamespace=false]
   */
  toTypedef(closure = false, noSuppress = false, useNamespace = closure) {
    const hasExtends = !!this.extends
    const natural = this.toNaturalTypedef(closure, noSuppress, useNamespace)

    const parts = []
    // need this to be able to import types from other programs,
    // /⁎⁎
    //  ⁎ @typedef {ns.Type} Type The type (that can be imported)
    //  ⁎ @typedef {Object} ns.Type The type (to use in current file)
    //  ⁎/
    // let pre = ''

    if (this.namespace && closure) {
      let td = ` * @typedef {${this.fullName}} ${this.name}${this.descriptionWithTag}`
      if (closure && !noSuppress) td = addSuppress(td)
      td = makeBlock(td)
      parts.push(td)
    } else if (this.namespace && useNamespace) {
      let td = ` * @typedef {${this.fullName}} ${this.name}${this.descriptionWithTag}`
      td = makeBlock(td)
      parts.push(td)
    }
    if (hasExtends) {
      let extended = ` * @typedef {${this.extends} & ${this.getFullNameForExtends(useNamespace)}} ${useNamespace ? this.fullName : this.name}${this.descriptionWithTag}`
      if (closure && !noSuppress) extended = addSuppress(extended)
      extended = makeBlock(extended)
      parts.push(extended)
    }
    parts.push(natural)

    return parts.join('')
  }
  get prototypeAnnotation() {
    const tag = this.tag
    if (!tag)
      throw new Error('Unknown prototype type (not constructor or interface).')
    return tag
  }
  get tag() {
    if (this.isConstructor) return 'constructor'
    if (this.isInterface) return 'interface'
    if (this.isRecord) return 'record'
    return ''
  }

  /**
   * To heading above declaration bodies. Can be used in externs.
   */
  toHeading(ws = '', includePrototypeTag = true) {
    let lines = []
    if (this.description) lines.push(` * ${this.description}`)
    if (this.extends) lines.push(` * @extends {${this.extends}}`)
    if (this.args) this.args.forEach((s) => {
      let { name, description, optional, type } = s
      if (name.startsWith('...')) {
        name = name.slice(3)
        type = `...${type}`
      }
      const arg = optional ? `[${name}]` : name
      const d = description ? ` ${description}` : ''

      lines.push(` * @param {${type}${optional ? '=' : ''}} ${arg}${d}`)
    })
    if (includePrototypeTag) lines.push(` * @${this.prototypeAnnotation}`)
    if (ws) lines = lines.map(p => `${ws}${p}`)
    return lines
  }
  /**
   * Used to place interfaces/constructor declarations in externs.
   */
  get constr() {
    return this.args ? `function(${
      this.args.map(({ name }) => name).join(', ')
    }) {}` : null
  }
  /**
   * Only used in externs.
   */
  toPrototype() {
    const pp = this.toHeading()
    // if (this.closureType) pp.push(` * @type {${this.closureType}}`)  // todo <arg>new</arg>
    let s = makeBlock(pp.join('\n'))
    s = s + getExternDeclaration(this.namespace, this.name, this.constr)
    /** @type {!Array<!Property>} */
    const properties = this.properties.reduce((acc, p) => {
      acc.push(p)
      const a = p.aliases.map(al => p.makeAlias(al))
      acc.push(...a)
      return acc
    }, [])
    const t = properties.filter(({ isConstructor }) => !isConstructor).map((p) => {
      let r = p.toExtern()
      r = makeBlock(r)
      const prototype = p.static ? '' : '.prototype'
      r = r + getExternDeclaration(`${this.fullName}${prototype}`,
        /** @type {string} */ (p.name))
      r += p.toExternsAssignment()
      return r
    })
    const j = [s, ...t].join('\n')
    return j
  }
  /**
   * The namespace.
   */
  get ns() {
    if (this.namespace) return `${this.namespace}.`
    return ''
  }
  get fullName() {
    return `${this.ns}${this.name}`
  }
  /**
   * Makes JSDoc for a function.
   * @param {string} paramName The name of the argument.
   * @param {boolean|undefined} optional Whether the argument is optional (wrapped in [argument])
   * @param {string} ws The whitespace prior to the param.
   * @param {boolean|undefined} nullable Whether the argument had ! or ?.
   */
  toParam(paramName, optional, ws, nullable, closure = false) {
    let n = ''
    if (nullable === true) n = '?'
    else if (nullable === false) n = '!'
    const d = this.description ? ` ${this.description}` : ''
    const nn = this.spread ? getSpread(this.properties) : (closure ? this.fullName : this.name)
    const pn = optional ? `[${paramName}]` : paramName
    const s = `${ws || ''} * @param {${n}${nn}} ${pn}${d}`
    const p = this.properties && !this.noExpand ? this.properties.map((pr) => {
      const sp = pr.toParam(paramName, ws, closure)
      return sp
    }) : []
    const st = [s, ...p].join('\n')
    return st
  }

  /**
   * Converts a type to a markdown string.
   * @param {!Array<!Type>} [allTypes]
   * @param {Object} [opts]
   * @param {boolean} [opts.narrow] If to combine type and description table for less width tables (e.g., in Wikis).
   * @param {boolean} [opts.flatten] Whether to follow the links of referenced types. This will exclude them from printing in imports when using documentation.
   * @param {function()} [opts.link] A function to call for extra processing of links.
   * @param {!Array<string>} [opts.details] An array of types that should be displayed as details.
   * @todo open-details
   */
  toMarkdown(allTypes = [], opts = {}) {
    const { narrow, flatten, preprocessDesc, link, details = [] } = opts
    const displayInDetails = details.includes(this.name)
    const t = this.type ? `\`${this.type}\`` : ''
    let typeWithLink = t, useCode = false
    if (this.link) {
      typeWithLink = `[${t}](${this.link})`
    } else if (!this.import && this.type) {
      typeWithLink = getLinks(allTypes, this.type, opts)
      useCode = typeWithLink != this.type
      typeWithLink = wrapCode(typeWithLink, useCode)
    }
    const codedName = wrapCode(this.fullName)
    let nn
    if (!this.import) {
      nn = this.noToc ? `[${codedName}](l-type)` : `[${codedName}](t-type)`
    } else {
      nn = `[${codedName}](l-type)`
    }
    const d = this.description ? `: ${this.description}` : ''
    const twl = typeWithLink ? `${typeWithLink} ` : ''
    let LINE = twl // `${twl}<strong>${nn}`
    let useTag = /_/.test(nn)
    if (this.extends) {
      let e = `\`${this.extends}\``
      const foundExt = allTypes.find(({ fullName }) => {
        return fullName == this.extends
      })
      if (foundExt && foundExt.link) {
        e = '<a '
        if (foundExt.description) {
          e += `title="${foundExt.description}" `
        }
        e += `href="${foundExt.link}">\`${this.extends}\`</a>`
      } else {
        const le = getLinks(allTypes, this.extends, { flatten,
          nameProcess(td) {
            return `\`${td}\``
          }, link })
        if (this.extends != le) e = le
      }
      const extendS = ` extends ${e}`
      useTag = useTag || /_/.test(e)
      if (useTag) LINE += '<strong>'
      else LINE += '__'
      LINE += nn + extendS
      if (typeof flatten == 'function') flatten(this.extends)
    } else {
      if (useTag) LINE += '<strong>'
      else LINE += '__'
      LINE += nn
    }
    if (useTag) LINE += '</strong>'
    else LINE += '__'
    LINE += d
    const table = makePropsTable(this, this.properties, allTypes, {
      narrow,
      flatten,
      preprocessDesc,
      link,
    })
    // delegate rendering to documentary
    return { LINE, table, displayInDetails }
  }
}

const wrapCode = (s, useCode = false) => {
  return `${useCode ? '<code>' : '`'}${s}${useCode ? '</code>' : '`'}`
}

/**
 * @param {!Array<!Property>} [properties]
 * @param {boolean} [closure = false] Whether generate for Closure's externs.
 */
const getSpread = (properties = [], closure = false) => {
  properties = properties.reduce((acc, p) => {
    acc.push(p)
    const extra = p.aliases.map((a) => {
      return { ...p, name: a }
    })
    acc.push(...extra)
    return acc
  }, [])
  const s = properties.map(p => {
    const type = closure ? p.closureType : p.type
    let n = p.name, t = type
    if (p.optional && !closure) {
      n = `${p.name}?`
    } else if (p.optional && closure) {
      t = `(${makeOptional(type)})`
    }
    const st = `${n}: ${t}`
    return st
  })
  const j = s.join(', ')
  const st = `{ ${j} }`
  return st
}


/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */

// /**
//  * The function
//  * @param {(a: string, b?:string) => void} ab
//  */
// const a = (ab) => {

// }