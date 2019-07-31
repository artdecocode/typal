const { makeBlock } = require('../');
const Type = require('../Type'); // eslint-disable-line
const JSTypal = require('../JSTypal'); // eslint-disable-line
const Import = require('../Import'); // eslint-disable-line
const { readTypesFile } = require('../parse');
const { closureJoinTypes, externsJoinTypes } = require('../closure');

/**
 * The regex to detect the marker for `typal`. Will return everything until blank line which must be present even at the end of the file.
 */
const typedefJsRe = /^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg

/**
 * @suppress {globalThis}
 * @type {function(this:JSTypal, ...string): !Promise<string>}
 */
async function replacement(match, docOrTypal, location) {
  const [loc, ...args] = location.split(/\s+/)
  const argsClosure = args.includes('closure')
  const argsExterns = args.includes('externs')
  const noSuppress = args.includes('noSuppress')
  const skipNsDecl = args.includes('skipNsDecl')

  let ignore = args.find((a) => {
    return a.startsWith('ignore:')
  })
  ignore = ignore ? ignore.replace('ignore:', '').split(',') : []

  let { closure, externs } = this.conf // for closure, suppress typedef
  if (argsClosure) closure = true
  if (argsExterns) externs = true

  try {
    this.LOG('Detected type marker: %s', location)
    const { types, imports, namespace } = await readTypesFile(loc, ignore)

    this.emit('types', types) // remember types for js-replace-stream
    this.emit('types', imports)

    let block
    if (closure) {
      block = closureJoinTypes(imports, types, noSuppress)
    } else if (externs) {
      block = externsJoinTypes(types, namespace, this.namespaces, skipNsDecl) + '\n'
      if (namespace) this.emit('namespace', namespace)
    } else {
      block = joinTypes(imports, types)
    }

    const typedef = `/* ${docOrTypal} ${location} */\n${block}`
    return typedef
  } catch (e) {
    this.LOG('(%s) Could not process typedef-js: %s', location, e.message)
    if (process.env.DEBUG) console.error(e.stack)
    return match
  }
}

/** @type {_restream.Rule} */
const typedefRule = {
  re: typedefJsRe,
  replacement,
}

/**
 * Creates a single typedef block from all imports and types.
 * @param {Array<Import>} imports
 * @param {Array<Type>} types
 */
const joinTypes = (imports, types) => {
  const ts = types.map(tt => tt.toTypedef())

  const is = imports.map((i) => i.toTypedef(false))

  const iss = is.map(makeBlock).join('')
  const tss = ts.join('')
  const importsAndTypes = `${iss}${tss}`

  return importsAndTypes.replace(m, ' * @typedef')
}

module.exports=typedefRule

const m = / \*\/\n\/\*\*\n \* @typedef/g

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */

module.exports.typedefJsRe = typedefJsRe