const { getLink } = require('./');

/**
 * @param {!_typedefsParser.Type} type
 * @param {!Array<!Type>} allTypes
 * @param {boolean} [flatten] If the type has link, follow it.
 */
const parsedToString = (type, allTypes, flatten) => {
  let s = ''
  let nullable = ''
  if (type.nullable) nullable = '?'
  else if (type.nullable === false) nullable = '!'
  const p2s = (arg) => parsedToString(arg, allTypes, flatten)

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
    s += getTypeWithLink(type.name, allTypes, nullable, flatten) + '&lt;'
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
    s += union.join(' \\| ')
    s += ')'
  } else {
    const name = type.name == 'any' ? '*' : type.name
    s += getTypeWithLink(name, allTypes, nullable, flatten)
  }
  return s
}

const getTypeWithLink = (type, allTypes, nullable = '', flatten = false) => {
  const l = getLinkToType(allTypes, type)
  const n = `${nullable}${type}`
  if (!l) return n
  let { link, type: { description } } = l
  link = `#${link}`
  if (flatten) {
    const found = allTypes.find(({ fullName }) => fullName == type)
    if (found && found.link) {
      link = found.link
    }
    if (!description && found.desc) description = found.desc
    if (typeof flatten == 'function') flatten(type)
  }
  if (!description) return `[${n}](${link})`
  return `<a href="${link}" title="${description}">${n}</a>`
  // const typeWithLink = `[${n}](#${link})`
  // return typeWithLink
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

module.exports.parsedToString = parsedToString