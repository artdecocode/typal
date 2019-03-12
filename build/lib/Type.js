let extractTags = require('rexml'); if (extractTags && extractTags.__esModule) extractTags = extractTags.default;
let mismatch = require('mismatch'); if (mismatch && mismatch.__esModule) mismatch = mismatch.default;
const Property = require('./Property');
const { getLink } = require('.');

/**
 * A representation of a type.
 */
               class Type {
  fromXML(content, {
    name, type, desc, noToc, spread, noExpand, import: i, link,
  }) {
    if (!name) throw new Error('Type does not have a name.')
    this.name = name

    if (type) this.type = type
    if (desc) this.description = desc.trim()
    if (noToc) this.noToc = true
    if (spread) this.spread = true
    if (noExpand) this.noExpand = true
    if (i) this.import = true
    if (link) this.link = link

    /** @type {Property[]} */
    this.properties = []
    if (content) {
      const ps = extractTags('prop', content)
      const props = ps.map(({ content: c, props: p }) => {
        const pr = new Property()
        pr.fromXML(c, p)
        return pr
      })
      this.properties = props
    }
  }
  toTypedef() {
    const t = this.type || 'Object'
    // ${pd ? ` ${pd}` : ''}
    const d = this.description ? ` ${this.description}` : ''
    const s = ` * @typedef {${t}} ${this.name}${d}`
    const p = this.properties ? this.properties.map((pr) => {
      const sp = pr.toProp()
      return sp
    }) : []
    const st = [s, ...p].join('\n')
    return st
  }
  toParam(paramName, optional) {
    const d = this.description ? ` ${this.description}` : ''
    const nn = this.spread ? getSpread(this.properties) : this.name
    const pn = optional ? `[${paramName}]` : paramName
    const s = ` * @param {${nn}} ${pn}${d}`
    const p = this.properties && !this.noExpand ? this.properties.map((pr) => {
      const sp = pr.toParam(paramName)
      return sp
    }) : []
    const st = [s, ...p].join('\n')
    return st
  }
  /** @param {Type[]} allTypes */
  toMarkdown(allTypes = []) {
    const t = this.type ? `\`${this.type}\`` : ''
    const typeWithLink = this.link ? `[${t}](${this.link})` : t
    const codedName = `\`${this.name}\``
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
 * @param {Property[]} properties
 */
const getSpread = (properties = []) => {
  const s = properties.map(p => {
    const n = p.optional ? `${p.name}?` : p.name
    const t = p.type
    const st = `${n}: ${t}`
    return st
  })
  const j = s.join(', ')
  const st = `{ ${j} }`
  return st
}

/**
 * Iterates through the type and creates a link for it.
 */
       const getLinks = (allTypes, type) => {
  const m = mismatch(
    /(?:(.+)\.<(string, *)?(.+?)>)|([^|]+)/g,
    type,
    ['gen', 'string', 'generic', 't'],
  )
  const types = m.map(({ gen, generic, string = '', t }) => {
    if (gen) {
      const pp = getLinks(allTypes, generic)
      return `${gen}.<${string}${pp}>`
    }
    const link = getLinkToType(allTypes, t)
    if (!link) return t
    const typeWithLink = `[${t}](#${link})`
    return typeWithLink
  }).join(' | ')
  return types
}

/**
 * @param {Property[]} props
 * @param {Type[]} allTypes
 */
       const makePropsTable = (props = [], allTypes = []) => {
  if (!props.length) return ''
  const anyHaveDefault = props.some(({ hasDefault }) => hasDefault)

  const h = ['Name', 'Type', 'Description', 'Default']
  const ps = props.map((prop) => {
    const linkedType = getLinks(allTypes, prop.type)
    const name = prop.optional ? prop.name : `__${prop.name}*__`
    const d = !prop.hasDefault ? '-' : `\`${prop.default}\``
    return [name, `_${esc(linkedType)}_`, esc(prop.description), d]
  })
  const pre = [h, ...ps]
  const res = anyHaveDefault
    ? pre
    : pre.map(([name, type, desc]) => [name, type, desc])
  const j = JSON.stringify(res)
  return `

\`\`\`table
${j}
\`\`\``
}

const esc = (s) => {
  return s
    .replace(/\|/g, '\\|')
    .replace(/</g, '&lt;')
    .replace(/>/, '&gt;')
}

const getLinkToType = (allTypes, type) => {
  const linkedType = allTypes.find(({ name }) => name == type)
  const link = linkedType ? getLink(linkedType.name, 'type') : undefined
  return link
}

module.exports = Type
module.exports.getLinks = getLinks
module.exports.makePropsTable = makePropsTable