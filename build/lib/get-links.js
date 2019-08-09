const parse = require('@typedefs/parser');
const { getLink } = require('./');
const Import = require('./Import');

/**
 * Iterates through the types to find the referenced one, and returns a string which contains a link to it.
 * @param {!Array<!(_typal.Type|Import)>} allTypes
 * @param {string|!_typedefsParser.Type} type
 * @param {Object} [opts]
 * @param {boolean} [opts.flatten]
 * @param {boolean} [opts.escapePipe]
 * @param {boolean} [opts.nameProcess]
 * @param {!Function} [opts.link]
 */
const getLinks = (allTypes, type, opts = {}) => {
  let parsed
  if (typeof type == 'object') parsed = type
  else try {
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
 * @param {!Array<!(_typal.Type|Import)>} allTypes
 * @param {Object} [opts] Options
 * @param {boolean} [opts.flatten] If the type has link, follow it.
 */
const parsedToString = (type, allTypes, opts = {}) => {
  if (type.name == '' && type.nullable) return '?' // special case
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
    s += getTypeWithLink(/** @type {string} */ (type.name), allTypes, nullable, opts) + '&lt;'
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
    s += getTypeWithLink(/** @type {string} */ (name), allTypes, nullable, opts)
  }
  return s
}

/**
 * The function which generates a link for the type.
 * @param {string} type
 * @param {!Array<!(_typal.Type|Import)>} allTypes
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

// const li = (p) => {
//   return p.replace(/(^\s*)- (.+)$/mg, `$1<li>$2</li>`)
// }


/**
 * @param {!Array<!(_typal.Type|Import)>} allTypes
 * @param {string} type
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
 * @typedef {import('../../types').Type} _typal.Type
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */

module.exports.getLinks = getLinks
module.exports.parsedToString = parsedToString