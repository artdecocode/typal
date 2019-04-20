import extractTags from 'rexml'
import mismatch from 'mismatch'
import Property from './Property'
import { getLink, addSuppress, makeBlock } from './'

/**
 * A representation of a type.
 */
export default class Type {
  constructor() {
    /**
     * The name of the type.
     * @type {?string}
     */
    this.name = null
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
  }
  /**
   * Create type from the xml content and properties parsed with `rexml`.
   */
  fromXML(content, {
    'name': name, 'type': type, 'desc': desc, 'noToc': noToc, 'spread': spread, 'noExpand': noExpand, 'import': i, 'link': link, 'closure': closure,
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
  toExtern(nullable = false) {
    if (this.closureType) {
      const s = ` * @typedef {${nullable ? '!' : ''}${this.closureType}}`
      return s
    }
    const nn = getSpread(this.properties, true)
    const s = ` * @typedef {${nullable ? '!' : ''}${nn}}`
    return s
  }
  toTypedef(closure = false) {
    const t = (closure ? this.closureType : this.type) || 'Object'
    const d = this.description ? ` ${this.description}` : ''
    const dd = ` ${closure ? this.fullName : this.name}${d}`
    const s = ` * @typedef {${t}}${dd}`
    const p = this.properties ? this.properties.map((pr) => {
      const sp = pr.toProp(closure)
      return sp
    }) : []
    // need this to be able to import types from other programs,
    // /⁎⁎
    //  ⁎ @typedef {ns.Type} Type The type (that can be imported)
    //  ⁎ @typedef {Object} ns.Type The type (to use in current file)
    //  ⁎/
    let pre = ''
    if (this.namespace && closure) {
      let td = ` * @typedef {${this.fullName}} ${this.name}${d}`
      if (closure) td = addSuppress(td)
      pre = makeBlock(td)
    }
    let typedef = [s, ...p].join('\n')
    if (closure) typedef = addSuppress(typedef)
    typedef = makeBlock(typedef)
    return `${pre}${typedef}`
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