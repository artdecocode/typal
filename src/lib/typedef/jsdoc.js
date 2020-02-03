import parser from '@typedefs/parser'
import JSTypal from '../JSTypal' // eslint-disable-line

/**
 * _JSDoc regex_ detects the ` * @param {Type}` declaration above functions, and the _JSDoc rule_ updates them according to existing types that were detected with the `typedefRule` rule.
 * https://regexr.com/4kicd
 */
export const jsDocRe = /( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\r?\n(?: +)\* @param {(?:.+?)} \[?\4\]?(?:(?!\r?\n\s*\*(?:\/|\s*@))[\s\S])*)*)/gm

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
  const { closure, useNamespace } = this.conf
  let parsed
  const logLocation = () => {
    if (this.lines && this.file) {
      const { line, column }
        = getLineAndColumn(this.lines, position, ws.length + 11)
      this.LOG('%s:%s:%s', this.file, line, column)
    }
  }
  try {
    parsed = parser(typeName)
  } catch (err) {
    this.LOG('Error while parsing the type %s', typeName)
    this.LOG(process.env['DEBUG'] ? err.stack : err.message)
    logLocation()
    return match
  }
  if (!parsed) {
    this.LOG('Could not parse the type %s', typeName)
    logLocation()
    return match
  }
  const allTypes = Object.values(this.types).map(({ name, fullName }) => {
    if (closure || useNamespace) return fullName
    return name
  })

  const e = checkExists(parsed, allTypes, this.LOG, typeName, logLocation)

  if (!e) return match

  const found = Object.values(this.types).find(({ name, fullName }) => {
    if (closure || useNamespace) return fullName == parsed.name
    return name == parsed.name
  })
  if (!found) return match
  if (found instanceof JSTypal.Import) return match

  const s = found.toParam(paramName, optional, ws, parsed.nullable, closure, useNamespace)
  return s
}

const isPrimitive = t => ['string', 'number', 'boolean', 'null', 'undefined', 'symbol', 'any'].includes(t)

/**
 * @param {(?_typedefsParser.Type|undefined)} parsed
 * @param {!Array<string>} types
 * @param {Function} log
 * @param {string} original
 * @param {Function} logLocation
 */
const checkExists = (parsed, types, log, original, logLocation) => {
  if (!parsed) return
  const name = parsed.name
  if (name && isPrimitive(name)) return
  if (name && !parsed.application && !parsed.function) {
    let exists = types.includes(name)
    if (!exists) exists = API.includes(name)
    if (!exists) {
      log('Type %s%s was not found.',
        name, original != name ? ` in ${original}` : '')
      logLocation()
    } else return true
  }
  const args = [types, log, original, logLocation]
  if (parsed.application) parsed.application.forEach((p) => {
    checkExists(p, ...args)
  })
  else if (parsed.record) Object.keys(parsed.record).forEach(key => {
    const val = parsed.record[key]
    checkExists(val, ...args)
  })
  else if (parsed.union) parsed.union.forEach((u) => {
    checkExists(u, ...args)
  })
  else if (parsed.function) {
    checkExists(parsed.function.this, ...args)
    checkExists(parsed.function.new, ...args)
    parsed.function.args.forEach((a) => {
      checkExists(a, ...args)
    })
    checkExists(parsed.function.variableArgs, ...args)
    checkExists(parsed.function.return, ...args)
  }
}

const API = ['String', 'Boolean', 'Object', 'Date', 'Number',
  'Symbol', 'Buffer', 'Function']

/**
 * @param {!Array<string>} lines
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