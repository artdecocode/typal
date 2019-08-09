/**
 * Serialise for VSCode.
 * @param {!_typedefsParser.Type} type
 * @param {boolean} [typescript=false] Serialise to TypeScript. Only affects functions.
 */
function serialise(type, typescript = false) {
  if (type.name == '' && type.nullable) return '?'
  let s = ''
  let nullable = ''
  if (type.nullable) nullable = '?'
  else if (type.nullable === false) nullable = '!'

  s += nullable

  if (type.function) {
    s += type.name + '(' // type.name is "function"
    const args = []
    if (type.function.this) {
      let t = 'this: '
      t += serialise(type.function.this)
      args.push(t)
    }
    if (type.function.new) {
      let t = 'new: '
      t += serialise(type.function.new)
      args.push(t)
    }
    type.function.args.forEach((a) => {
      let t = serialise(a)
      if (a.optional) t += '='
      args.push(t)
    })
    if (type.function.variableArgs) {
      let t = '...'
      t += serialise(type.function.variableArgs)
      args.push(t)
    }
    const argsJoined = args.join(', ')
    s += argsJoined + ')'
    if (type.function.return) {
      s += ': ' + serialise(type.function.return)
    }
  } else if (type.record) {
    s += '{ '
    const rs = Object.keys(type.record).map((key) => {
      const val = type.record[key]
      if (!val) return key
      const v = serialise(val)
      return `${key}: ${v}`
    })
    s += rs.join(', ')
    s += ' }'
  } else if (type.application) {
    if (type.name == 'Promise') {
      const otherThanVoid = type.application.some(t => t.name != 'void')
      if (!otherThanVoid) return s + 'Promise'
    }
    s += type.name + '<'
    const apps = type.application.map((a) => {
      return serialise(a)
    })
    s += apps.join(', ')
    s += '>'
  } else if (type.union) {
    s += '('
    const union = type.union.map((u) => {
      return serialise(u)
    })
    s += union.join('|')
    s += ')'
  } else {
    const name = type.name == 'any' ? '*' : type.name
    s += name
  }
  return s
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */

module.exports = serialise