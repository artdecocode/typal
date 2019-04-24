import extractTags from 'rexml'
import mismatch from 'mismatch'
import Property from './Property'
import { getLink, addSuppress, makeBlock, getExternDeclaration } from './'

/**
 * A representation of a type.
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
     */
    this.closureType = null
    /** @type {?string} */
    this.description = null
    /** @type {?boolean} */
    this.noToc = null
    /** @type {?boolean} */
    this.spread = null
    /** @type {?boolean} */
    this.import = null
    /** @type {?boolean} */
    this.noExpand = null
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
_ns.Type.prototype.constructor
```
     */
    this.isConstructor = false
    /**
     * @type {boolean}
     * Same as `constructor`, but with `@interface` annotation.
     */
    this.isInterface = false
    /**
     * Types `@constructor`, `@interface` and `@record` can inherit properties from other types using `@extends`.
     * @see https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#extends-type
     * @type {?string}
     */
    this.extends = null
  }
  /**
   * Create type from the xml content and properties parsed with `rexml`.
   */
  fromXML(content, {
    'name': name, 'type': type, 'desc': desc, 'noToc': noToc, 'spread': spread, 'noExpand': noExpand, 'import': i, 'link': link, 'closure': closure, 'constructor': isConstructor, 'extends': ext, 'interface': isInterface,
  }, namespace) {
    if (!name) throw new Error('Type does not have a name.')
    this.name = name

    if (type) this.type = type
    if (closure) this.closureType = closure
    else this.closureType = this.type
    if (desc) this.description = desc.trim()
    this.noToc = !!noToc
    this.spread = !!spread
    this.noExpand = !!noExpand
    this.import = !!i
    if (link) this.link = link
    if (isConstructor === true) this.isConstructor = isConstructor
    if (isInterface === true) this.isInterface = isInterface
    if (ext) this.extends = ext

    if (content) {
      const ps = extractTags('prop', content)
      const props = ps.map(({ content: c, props: p }) => {
        const pr = new Property()
        pr.fromXML(c, p)
        return pr
      })
      this.properties = props
    }
    if (namespace) this.namespace = namespace
  }
  get shouldPrototype() {
    return this.isConstructor || this.isInterface
  }
  toExtern() {
    let s
    if (this.closureType) {
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
  getFullNameForExtends(closure) {
    const name = `${this.extends ? '$' : ''}${this.name}`
    const n = closure ? `${this.ns}${name}` : name
    return n
  }
  /** This covers both when extending and when not. */
  toNaturalTypedef(closure) {
    const t = (closure ? this.closureType : this.type) || 'Object'
    const d = this.description ? ` ${this.description}` : ''
    const dd = ` ${this.getFullNameForExtends(closure)}${d}`
    const s = ` * @typedef {${t}}${dd}`
    const p = this.properties ? this.properties.map((pr) => {
      const sp = pr.toProp(closure)
      return sp
    }) : []
    let typedef = [s, ...p].join('\n')
    if (closure) typedef = addSuppress(typedef)
    typedef = makeBlock(typedef)
    return typedef
  }
  toTypedef(closure = false) {
    const d = this.description ? ` ${this.description}` : ''
    const hasExtends = !!this.extends
    const natural = this.toNaturalTypedef(closure, hasExtends)

    const parts = []
    // need this to be able to import types from other programs,
    // /⁎⁎
    //  ⁎ @typedef {ns.Type} Type The type (that can be imported)
    //  ⁎ @typedef {Object} ns.Type The type (to use in current file)
    //  ⁎/
    // let pre = ''

    if (this.namespace && closure) {
      let td = ` * @typedef {${this.fullName}} ${this.name}${d}`
      if (closure) td = addSuppress(td)
      td = makeBlock(td)
      parts.push(td)
    }
    if (hasExtends) {
      let extended = ` * @typedef {${this.extends} & ${this.getFullNameForExtends(closure)}} ${closure ? this.fullName : this.name}${d}`
      if (closure) extended = addSuppress(extended)
      extended = makeBlock(extended)
      parts.push(extended)
    }
    parts.push(natural)

    return parts.join('')
  }
  get prototypeAnnotation() {
    if (this.isConstructor) return 'constructor'
    if (this.isInterface) return 'interface'
    throw new Error('Unknown prototype type (not constructor or interface).')
  }
  toPrototype() {
    const pp = []
    if (this.description) pp.push(` * ${this.description}`)
    if (this.extends) pp.push(` * @extends {${this.extends}}`)
    pp.push(` * @${this.prototypeAnnotation}`)
    let s = makeBlock(pp.join('\n'))
    s = s + getExternDeclaration(this.namespace, this.name)
    const t = this.properties.map((p) => {
      let r = p.toExtern()
      r = makeBlock(r)
      r = r + getExternDeclaration(`${this.fullName}.prototype`,
        /** @type {string} */ (p.name))
      return r
    })
    const j = [s, ...t].join('\n')
    return j
  }
  get ns() {
    if (this.namespace) return `${this.namespace}.`
    return ''
  }
  get fullName() {
    return `${this.ns}${this.name}`
  }
  toParam(paramName, optional, ws = '', nullable = false, closure = false) {
    const d = this.description ? ` ${this.description}` : ''
    const nn = this.spread ? getSpread(this.properties) : (closure ? this.fullName : this.name)
    const pn = optional ? `[${paramName}]` : paramName
    const s = `${ws} * @param {${nullable ? '!' : ''}${nn}} ${pn}${d}`
    const p = this.properties && !this.noExpand ? this.properties.map((pr) => {
      const sp = pr.toParam(paramName, ws, closure)
      return sp
    }) : []
    const st = [s, ...p].join('\n')
    return st
  }
  /** @param {!Array<!Type>} allTypes */
  toMarkdown(allTypes = []) {
    const t = this.type ? `\`${this.type}\`` : ''
    const typeWithLink = this.link ? `[${t}](${this.link})` : t
    const codedName = `\`${this.fullName}\``
    let nn
    if (!this.import) {
      nn = this.noToc ? `[${codedName}](l-type)` : `[${codedName}](t-type)`
    } else {
      nn = `[${codedName}](l-type)`
    }
    const d = this.description ? `: ${this.description}` : ''
    const twl = typeWithLink ? `${typeWithLink} ` : ''
    const line = `${twl}__${nn}__${d}`
    const table = makePropsTable(this.properties, allTypes)
    const r = `${line}${table}`
    return r
  }
}

/**
 * @param {Array<Property>} properties
 * @param {boolean} [closure = false] Whether generate for Closure's externs.
 */
const getSpread = (properties = [], closure = false) => {
  const s = properties.map(p => {
    const type = closure ? p.closureType : p.type
    let n = p.name, t = type
    if (p.optional && !closure) {
      n = `${p.name}?`
    } else if (p.optional && closure) {
      t = `(${type}|undefined)`
    }
    const st = `${n}: ${t}`
    return st
  })
  const j = s.join(', ')
  const st = `{ ${j} }`
  return st
}

/**
 * Iterates through the type and creates a link for it.
 * @param {!Array<!Type>} allTypes
 * @param {string} type
 */
export const getLinks = (allTypes, type) => {
  const m = mismatch(
    /(?:(.+)\.<(string, *)?(.+?)>)|([^|]+)/g,
    type,
    ['gen', 'string', 'generic', 't'],
  )
  const types = m.map(({ gen, generic, string = '', t }) => {
    if (gen) {
      const pp = getLinks(allTypes, generic)
      return `${gen}<${string}${pp}>`
    } else if (/^function\(.+?\)$/.test(t)) {
      const [,vars] = /** @type {!RegExpResult} */
        (/^function\((.+?)\)$/.exec(t))
      const allVars = vars.split(',').map(v => v.trim())
      const pp = allVars.map(v => {
        return getLinks(allTypes, v)
      })
      return `function(${pp.join(', ')})`
    }
    const link = getLinkToType(allTypes, t)
    if (!link) return t
    const typeWithLink = `[${t}](#${link})`
    return typeWithLink
  }).join(' | ')
  return types
}

/**
 * @param {!Array<!Property>} [props]
 * @param {!Array<!Type>} [allTypes]
 */
export const makePropsTable = (props = [], allTypes = []) => {
  if (!props.length) return ''
  const anyHaveDefault = props.some(({ hasDefault }) => hasDefault)

  const h = ['Name', 'Type', 'Description', 'Default']
  const ps = props.map((prop) => {
    const linkedType =
      getLinks(/** @type {!Array<!Type>} */ (allTypes), prop.type)
    const name = prop.optional ? prop.name : `__${prop.name}*__`
    const d = !prop.hasDefault ? '-' : `\`${prop.default}\``
    return [name, `<em>${esc(linkedType)}</em>`, esc(prop.description), d]
  })
  const pre = [h, ...ps]
  const res = anyHaveDefault
    ? pre
    : pre.map(([name, type, desc]) => [name, type, desc])
  const j = JSON.stringify(res, null, 2)
  return `

\`\`\`table
${j}
\`\`\``
}

const esc = (s = '') => {
  return s
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/, '&gt;')
}

const getLinkToType = (allTypes, type) => {
  const typeName = type.replace(/^[!?]/, '')
  const linkedType = allTypes.find(({ fullName }) => fullName == typeName)
  const link = linkedType ? getLink(linkedType.fullName, 'type') : undefined
  return link
}