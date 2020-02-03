import { makeBlock } from '../'
import Type from '../Type' // eslint-disable-line
import JSTypal from '../JSTypal' // eslint-disable-line
import Import from '../Import' // eslint-disable-line
import { EOL } from 'os'
import { readTypesFile } from '../parse'
import { closureJoinTypes, externsJoinTypes } from '../closure'

/**
 * The regex to detect the marker for `typal`. Will return everything until blank line which must be present even at the end of the file.
 */
export const typedefJsRe = /^\/\*\*? (documentary|typal) (.+?) \*\/\r?\n(?:([^\n][\s\S]+?\r?\n))?$/mg

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
  const useNamespace = args.includes('namespace')
  const noEmbed = args.includes('noEmbed') || args.includes('no-embed')

  let ignore = args.find((a) => {
    return a.startsWith('ignore:')
  })
  ignore = ignore ? ignore.replace('ignore:', '').split(',') : []
  // let only = args.find((a) => {
  //   return a.startsWith('only:')
  // })
  // only = only ? only.replace('only:', '').split(',') : []

  let { closure, externs } = this.conf // for closure, suppress typedef
  if (argsClosure) closure = true
  if (argsExterns) externs = true

  try {
    this.LOG('Detected type marker: %s', location)
    const { types, imports, namespace, embeds } = await readTypesFile(loc, ignore)

    this.emit('types', types) // remember types for js-replace-stream
    this.emit('types', imports)
    let em = []
    if (!noEmbed) em = await Promise.all(embeds.map(async ({
      src, path: p = src, ignore: i = ignore.join(','),
      namespace: n = useNamespace , closure: c = closure,
      externs: ext = externs, 'no-suppress': nos = noSuppress,
    }) => {
      const a = [p]
      if (i) a.push(`ignore:${i}`)
      if (n) a.push('namespace')
      if (c) a.push('closure')
      if (ext) a.push('ext')
      if (nos) a.push('noSuppress')
      const l = a.join(' ')
      const s = `${EOL} /* typal-embed ${l} */${EOL}`
      const e = await replacement.call(this, s, 'typal-embed', l)
      return e
    }))
    let bem = em.join('')

    let block
    if (closure) {
      block = closureJoinTypes(imports, types, noSuppress)
    } else if (externs) {
      block = externsJoinTypes(types, namespace, this.namespaces, skipNsDecl) + EOL
      if (namespace) this.emit('namespace', namespace)
    } else if (useNamespace) {
      if (namespace) this.emit('namespace', namespace)
      block = joinTypes(imports, types, true)
    } else {
      block = joinTypes(imports, types)
    }

    const typedef = `/* ${docOrTypal} ${location} */${EOL}${block}${bem}`
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
 * @param {!Array<!Import>} imports
 * @param {!Array<!Type>} types
 * @param {boolean} [useNamespace]
 */
const joinTypes = (imports, types, useNamespace = false) => {
  const ts = types.map(tt => tt.toTypedef(false, false, useNamespace))

  const is = imports.map((i) => i.toTypedef(useNamespace))

  const iss = is.map(makeBlock).join('')
  const tss = ts.join('')
  const importsAndTypes = `${iss}${tss}`

  return importsAndTypes.replace(m, ' * @typedef')
}

export default typedefRule

const m = / \*\/\r?\n\/\*\*\r?\n \* @typedef/g

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */