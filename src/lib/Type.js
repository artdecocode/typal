import extractTags from 'rexml'
import parse from '@typedefs/parser'
import Property from './Property'
import Arg from './Arg'
import { addSuppress, makeBlock, getExternDeclaration, makeOptional } from './'
import { getLink, trimD } from './'

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
      const functions = extractTags('function', content)
      const fns = extractTags('fn', content)
      const fn = [...functions, ...fns]

      const fnProps = fn.map(({ content: c, props: p }) => {
        let ai = c.lastIndexOf('</arg>')
        let argsArgs = []
        if (ai != -1) {
          ai = ai + '</arg>'.length
          const pre = c.slice(0, ai)
          c = c.slice(ai)
          argsArgs = extractTags('arg', pre)
          argsArgs = argsArgs.map(({ content: ac, props: ap }) => {
            const ar = new Arg()
            ar.fromXML(ac, ap)
            return ar
          })
        }

        const { 'async': async, 'return': ret = 'void', ...rest } = p
        let { 'args': args = '' } = p
        if (!args && argsArgs.length) {
          args = argsArgs.map(({ type: at, optional }) => {
            // optional can also just be set in type, e.g., type="string=",
            // so check for null and not truthy
            if (optional !== null) return `${at}=`
            return at
          }).join(',')
        }

        let r = ret.replace(/\n\s*/g, ' ')
        r = async ? `!Promise<${r}>` : r
        const fnType = `function(${args}): ${r}`
        rest['type'] = fnType
        const pr = new Property(argsArgs)

        pr.fromXML(c, rest)
        return pr
      })
      this.properties = [...props, ...fnProps]
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
    const properties = this.properties ? this.properties.reduce((acc, p) => {
      acc.push(p)
      const a = p.aliases.map(al => p.makeAlias(al))
      acc.push(...a)
      return acc
    }, []) : []
    const p = properties.map((pr) => {
      const sp = pr.toProp(closure)
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
    /** @type {!Array<!Property>} */
    const properties = this.properties.reduce((acc, p) => {
      acc.push(p)
      const a = p.aliases.map(al => p.makeAlias(al))
      acc.push(...a)
      return acc
    }, [])
    const t = properties.map((p) => {
      let r = p.toExtern()
      r = makeBlock(r)
      r = r + getExternDeclaration(`${this.fullName}.prototype`,
        /** @type {string} */ (p.name))
      if (p.parsed && p.parsed.name == 'function') {
        const { function: { args } } = p.parsed
        const a = args.map((_, i) => {
          const { name = `arg${i}` } = p.args[i] || {}
          return name
        })
        r += ` = function(${a.join(', ')}) {}`
      } else if (p.type.startsWith('function(')) {
        r += ' = function() {}'
      }
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

  /**
   * Converts a type to a markdown string.
   * @param {!Array<!Type>} [allTypes]
   * @param {!Object} [opts]
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
      useTag = useTag || /_/.test(this.extends)
      let e = `\`${this.extends}\``
      const foundExt = allTypes.find(({ fullName }) => {
        return fullName == this.extends
      })
      if (foundExt && foundExt.link) {
        useTag = useTag || /_/.test(foundExt.link)
        e = '<a '
        if (foundExt.description) {
          e += `title="${foundExt.description}" `
          useTag = useTag || /_/.test(foundExt.description)
        }
        e += `href="${foundExt.link}">\`${this.extends}\`</a>`
      } else {
        const le = getLinks(allTypes, this.extends, { flatten,
          nameProcess(td) {
            return `\`${td}\``
          }, link })
        if (this.extends != le) e = le
        useTag = useTag || /_/.test(e)
      }
      const extendS = ` extends ${e}`
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
    const table = makePropsTable(this.properties, allTypes, {
      narrow,
      flatten,
      preprocessDesc,
      link,
    })
    return { LINE, table, displayInDetails } // delegate rendering to typal
    // const r = `${LINE}${table}`
    // return r
  }
}

const wrapCode = (s, useCode = false) => {
  return `${useCode ? '<code>' : '`'}${s}${useCode ? '</code>' : '`'}`
}

/**
 * @param {Array<Property>} properties
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
 * Iterates through the types to find the referenced one, and returns a string which contains a link to it.
 * @param {!Array<!Type>} allTypes
 * @param {string} type
 * @param {Object} [opts]
 * @param {boolean} [opts.flatten]
 * @param {boolean} [opts.escapePipe]
 * @param {boolean} [opts.nameProcess]
 * @param {!Function} [opts.link]
 */
export const getLinks = (allTypes, type, opts = {}) => {
  let parsed
  try {
    parsed = parse(type) // should parse type when added
    if (!parsed) {
      console.log('Could not parse %s', type)
    }
  } catch (err) {
    console.log('Could not parse %s', type)
    console.error(err.message)
  }
  if (!parsed) return type
  const s = parsedToString(parsed, allTypes, opts)
  return s
}

/**
 * @param {!_typedefsParser.Type} type
 * @param {!Array<!Type>} allTypes
 * @param {Object} [opts] Options
 * @param {boolean} [opts.flatten] If the type has link, follow it.
 */
export const parsedToString = (type, allTypes, opts = {}) => {
  const { escapePipe = true } = opts
  let s = ''
  let nullable = ''
  if (type.nullable) nullable = '?'
  else if (type.nullable === false) nullable = '!'
  const p2s = (arg) => parsedToString(arg, allTypes, opts)

  if (type.function) {
    s += nullable
    s += type.name + '(' // Function or function
    const args = []
    if (type.function.this) {
      let t = 'this: '
      t += p2s(type.function.this)
      args.push(t)
    }
    if (type.function.new) {
      let t = 'new: '
      t += p2s(type.function.new)
      args.push(t)
    }
    type.function.args.forEach((a) => {
      let t = p2s(a)
      if (a.optional) t += '='
      args.push(t)
    })
    if (type.function.variableArgs) {
      let t = '...'
      t += p2s(type.function.variableArgs)
      args.push(t)
    }
    const argsJoined = args.join(', ')
    s += argsJoined + ')'
    if (type.function.return) {
      s += ': ' + p2s(type.function.return)
    }
  } else if (type.record) {
    s += '{ '
    const rs = Object.keys(type.record).map((key) => {
      const val = type.record[key]
      if (!val) return key
      const v = p2s(val)
      return `${key}: ${v}`
    })
    s += rs.join(', ')
    s += ' }'
  } else if (type.application) {
    s += getTypeWithLink(type.name, allTypes, nullable, opts) + '&lt;'
    const apps = type.application.map((a) => {
      return p2s(a)
    })
    s += apps.join(', ')
    s += '&gt;'
  } else if (type.union) {
    s += nullable
    s += '('
    const union = type.union.map((u) => {
      return p2s(u)
    })
    s += union.join(escapePipe ? ' \\| ' : ' | ')
    s += ')'
  } else {
    const name = type.name == 'any' ? '*' : type.name
    s += getTypeWithLink(name, allTypes, nullable, opts)
  }
  return s
}

/**
 * The function which generates a link for the type.
 */
const getTypeWithLink = (type, allTypes, nullable = '', opts = {}) => {
  const { flatten = false, nameProcess,
    link: linkFn = ({ link: l }) => { return `#${l}` } } = opts
  const l = getLinkToType(allTypes, type)
  const n = `${nullable}${type}`
  if (!l) return n
  let { link, type: { description } } = l
  link = linkFn(l)
  if (flatten) {
    const found = allTypes.find(({ fullName }) => fullName == type)
    if (found && found.link) {
      link = found.link
    }
    if (!description && found.desc) description = found.desc
    if (typeof flatten == 'function') flatten(type)
  }
  const nn = nameProcess ? nameProcess(n) : n
  if (!description) return `[${nn}](${link})`
  return `<a href="${link}" title="${description.replace(/"/g, '&quot;')}">${nn}</a>`
  // const typeWithLink = `[${n}](#${link})`
  // return typeWithLink
}

/**
 * @param {!Array<!Property>} [props]
 * @param {!Array<!Type>} [allTypes]
 * @param {!Object} [opts]
 * @param {boolean} [opts.narrow=false] Merge Type and Description columns
 * @param {boolean|function(string)} [opts.flatten=false] Whether to follow the link to external types. If function is passed, will be called with the named of the flattened package.
 */
export const makePropsTable = (props = [], allTypes = [], opts = {}) => {
  const { narrow = false, flatten = false, preprocessDesc, link } = opts
  if (!props.length) return ''
  const anyHaveDefault = props.some(({ hasDefault }) => hasDefault)

  const h = ['Name',
    ...(narrow ? ['Type & Description'] : ['Type', 'Description']),
    ...(anyHaveDefault ? ['Default'] : [])]
  const ps = props.map((prop) => {
    const typeName =
      getLinks(/** @type {!Array<!Type>} */ (allTypes), prop.type, {
        flatten,
        escapePipe: !narrow,
        link,
      })
    const name = prop.optional ? prop.name : `${prop.name}*`
    const d = !prop.hasDefault ? '-' : `\`${prop.default}\``
    const de = preprocessDesc ? preprocessDesc(prop.description) : prop.description
    return {
      prop,
      typeName,
      name,
      de: esc(de, !narrow),
      d,
    }
  })
  if (narrow) { // narrow is the newer API for Documentary
    return { props: ps, anyHaveDefault }
  } else {
    const ar = ps.map(({
      name, typeName, de, d, prop,
    }) => {
      const n = prop.optional ? name : `__${name}__`
      return [n, `<em>${typeName}</em>`, de, ...(anyHaveDefault ? [d] : [])]
    })

    const j = JSON.stringify([h, ...ar], null, 2)
    return `

\`\`\`table
${j}
\`\`\``
  }
}

// const li = (p) => {
//   return p.replace(/(^\s*)- (.+)$/mg, `$1<li>$2</li>`)
// }

const esc = (s = '', escapePipe = true) => {
  if (s === null) s = ''
  if (escapePipe) {
    s = s.replace(/\|/g, '\\|')
  }
  return s
    .replace(/</g, '&lt;')
    .replace(/>/, '&gt;')
}

/**
 * @param {!Array<!Type>} allTypes
 */
const getLinkToType = (allTypes, type) => {
  const linkedTypes = allTypes.filter(({ fullName }) => fullName == type)
  if (!linkedTypes.length) return

  // in case we're importing local types and imports have same names
  const importType = linkedTypes.find(({ import: i }) => i || false)
  const actualType = linkedTypes.find(({ import: i }) => !i)

  let linkedType = actualType || importType

  const link = getLink(linkedType.fullName, 'type')
  return { link, type: linkedType }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */