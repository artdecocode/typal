import extractTags from 'rexml'
import parse from '@typedefs/parser'
import Property from './Property'
import { getLink, addSuppress, makeBlock, getExternDeclaration, makeOptional } from './'

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
  }
  /**
   * Create type from the xml content and properties parsed with `rexml`.
   */
  fromXML(content, {
    'name': name, 'type': type, 'desc': desc, 'noToc': noToc, 'spread': spread, 'noExpand': noExpand, 'import': i, 'link': link, 'closure': closure, 'constructor': isConstructor, 'extends': ext, 'interface': isInterface, 'record': isRecord,
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
    if (isRecord === true) this.isRecord = isRecord
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
    return this.isConstructor || this.isInterface || this.isRecord
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
  toNaturalTypedef(closure, noSuppress) {
    const t = (closure ? this.closureType : this.type) || 'Object'
    const dd = ` ${this.getFullNameForExtends(closure)}${this.descriptionWithTag}`
    const s = ` * @typedef {${t}}${dd}`
    const p = this.properties ? this.properties.map((pr) => {
      const sp = pr.toProp(closure)
      return sp
    }) : []
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
  toTypedef(closure = false, noSuppress = false) {
    const hasExtends = !!this.extends
    const natural = this.toNaturalTypedef(closure, noSuppress)

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
    }
    if (hasExtends) {
      let extended = ` * @typedef {${this.extends} & ${this.getFullNameForExtends(closure)}} ${closure ? this.fullName : this.name}${this.descriptionWithTag}`
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
   * Only used in externs.
   */
  toPrototype() {
    const pp = []
    if (this.description) pp.push(` * ${this.description}`)
    if (this.extends) pp.push(` * @extends {${this.extends}}`)
    pp.push(` * @${this.prototypeAnnotation}`)
    let s = makeBlock(pp.join('\n'))
    let constr
    // if (this.isConstructor || this.isInterface) {
    //   constr = 'function() {}'
    // }
    s = s + getExternDeclaration(this.namespace, this.name, constr)
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
    let line = `${twl}__${nn}`
    if (this.extends) {
      let e = this.extends
      const foundExt = allTypes.find(({ fullName }) => {
        return fullName == this.extends
      })
      if (foundExt && foundExt.link) {
        e = '<a '
        if (foundExt.description) e += `title="${foundExt.description}" `
        e += `href="${foundExt.link}">${this.extends}</a>`
      }
      line += ` extends ${e}`
    }
    line += `__${d}`
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
 * Iterates through the type and creates a link for it.
 * @param {!Array<!Type>} allTypes
 * @param {string} type
 */
export const getLinks = (allTypes, type) => {
  let parsed
  try {
    parsed = parse(type)
    if (!parsed) {
      console.log('Could not parse %s', type)
    }
  } catch (err) {
    console.log('Could not parse %s', type)
    console.error(err.message)
  }
  if (!parsed) return type
  const s = parsedToString(parsed, allTypes)
  return s
}

/**
 * @param {!_typedefsParser.Type} type
 * @param {!Array<!Type>} allTypes
 */
const parsedToString = (type, allTypes) => {
  let s = ''
  let nullable = ''
  if (type.nullable) nullable = '?'
  else if (type.nullable === false) nullable = '!'

  if (type.function) {
    s += nullable
    s += type.name + '(' // Function or function
    const args = []
    if (type.function.this) {
      let t = 'this: '
      t += parsedToString(type.function.this, allTypes)
      args.push(t)
    }
    if (type.function.new) {
      let t = 'new: '
      t += parsedToString(type.function.new, allTypes)
      args.push(t)
    }
    type.function.args.forEach((a) => {
      let t = parsedToString(a, allTypes)
      if (a.optional) t += '='
      args.push(t)
    })
    if (type.function.variableArgs) {
      let t = '...'
      t += parsedToString(type.function.variableArgs, allTypes)
      args.push(t)
    }
    const argsJoined = args.join(', ')
    s += argsJoined + ')'
    if (type.function.return) {
      s += ': ' + parsedToString(type.function.return, allTypes)
    }
  } else if (type.record) {
    s += '{ '
    const rs = Object.keys(type.record).map((key) => {
      const val = type.record[key]
      if (!val) return key
      const v = parsedToString(val, allTypes)
      return `${key}: ${v}`
    })
    s += rs.join(', ')
    s += ' }'
  } else if (type.application) {
    s += getTypeWithLink(type.name, allTypes, nullable) + '&lt;'
    const apps = type.application.map((a) => {
      return parsedToString(a, allTypes)
    })
    s += apps.join(', ')
    s += '&gt;'
  } else if (type.union) {
    s += nullable
    s += '('
    const union = type.union.map((u) => {
      return parsedToString(u, allTypes)
    })
    s += union.join(' \\| ')
    s += ')'
  } else {
    const name = type.name == 'any' ? '*' : type.name
    s += getTypeWithLink(name, allTypes, nullable)
  }
  return s
}

const getTypeWithLink = (type, allTypes, nullable = '') => {
  const l = getLinkToType(allTypes, type)
  const n = `${nullable}${type}`
  if (!l) return n
  const { link, type: t } = l
  if (!t.description) return `[${n}](#${link})`
  return `<a href="#${link}" title="${t.description}">${n}</a>`
  // const typeWithLink = `[${n}](#${link})`
  // return typeWithLink
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
    return [name, `<em>${linkedType}</em>`, esc(prop.description), d]
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
  if (s === null) s = ''
  return s
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/, '&gt;')
}

/**
 * @param {!Array<!Type>} allTypes
 */
const getLinkToType = (allTypes, type) => {
  const linkedType = allTypes.find(({ fullName }) => fullName == type)
  if (!linkedType) return
  const link = getLink(linkedType.fullName, 'type')
  return { link, type: linkedType }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */