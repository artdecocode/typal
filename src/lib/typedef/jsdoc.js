import parser from '@typedefs/parser'
import JSTypal from '../JSTypal' // eslint-disable-line

/**
 * _JSDoc regex_ detects the ` * @param {Type}` declaration above functions, and the _JSDoc rule_ updates them according to existing types that were detected with the `typedefRule` rule.
 */

export const jsDocRe = /( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm

/**
 * @type {_restream.Rule}
 */
const JSDocRule = {
  re: jsDocRe,
  replacement,
}

/**
 * @suppress {globalThis}
 * @type {function(this: JSTypal, ...string): string}
 */
function replacement(match, ws, typeName, optional, paramName, rest, position) {
  const { closure } = this.conf
  let parsed
  try {
    parsed = parser(typeName)
  } catch (err) {
    this.LOG('Error while parsing the type %s', typeName)
    this.LOG(err.stack)
    return match
  }
  if (!parsed) {
    this.LOG('Could not parse the type %s', typeName)
    return match
  }
  const allTypes = Object.values(this.types).map(({ name, fullName }) => {
    if (closure) return fullName
    return name
  })

  const e = checkExists(parsed, allTypes, this.LOG, typeName, position, this.lines, this.file, ws)

  if (!e) return match

  const found = Object.values(this.types).find(({ name, fullName }) => {
    if (closure) return fullName == parsed.name
    return name == parsed.name
  })
  if (found instanceof JSTypal.Import) return match

  const s = found.toParam(paramName, optional, ws, parsed.nullable, closure)
  return s
}

const isPrimitive = t => ['string', 'number', 'boolean', 'null', 'undefined', 'symbol'].includes(t)

/**
 * @param {!_typedefsParser.Type} parsed
 * @param {!Array<string>} types
 * @param {Function} log
 * @param {string} original
 * @param {number} position
 * @param {Array<string|undefined>} lines
 * @param {?string} file
 * @param {string} ws
 */
const checkExists = (parsed, types, log, original, position, lines, file, ws) => {
  const name = parsed.name
  if (name && isPrimitive(name)) return
  if (name && !parsed.application) {
    const exists = types.includes(name)
    if (!exists) {
      log('Type %s%s was not found.',
        name, original != name ? ` in ${original}` : '')
      if (lines && file) {
        const { line, column }
          = getLineAndColumn(lines, position, ws.length + 11)
        log('%s:%s:%s', file, line, column)
      }
    } else return true
  }
  const args = [types, log, original, position, lines, file, ws]
  if (parsed.application) parsed.application.forEach((p) => {
    checkExists(p, ...args)
  })
  else if (parsed.record) Object.keys(parsed.record).forEach(key => {
    const val = parsed.record[key]
    if (val) checkExists(val, ...args)
  })
  else if (parsed.union) parsed.union.forEach((u) => {
    checkExists(u, ...args)
  })
  else if (parsed.function) parsed.function.args.forEach((a) => {
    checkExists(a, ...args)
  })
}

/**
 * @param {!Array<string>} string
 * @param {number} position
 * @param {number} offset
 */
const getLineAndColumn = (lines, position, offset) => {
  let line = 0, current = 0
  while (current < position) {
    const s = lines[line]
    current += s.length
    line++
  }
  return { line, column: offset }
}

export default JSDocRule

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */