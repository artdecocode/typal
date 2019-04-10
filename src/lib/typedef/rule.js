import read from '@wrote/read'
import Type from '../Type'
import { makeBlock, importToTypedef, parseFile } from '../'
import { closureJoinTypes, externsJoinTypes } from '../closure'

export const typedefJsRe = /^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg

/**
 * @suppress {globalThis}
 * @type {function(this: { namespaces: !Array<string>, emit: function(string, *), LOG: function(...string), conf: { closure: boolean, externs: boolean } }, ...string): !Promise<string>}
 */
async function replacement(match, docOrTypal, location) {
  const { closure, externs } = this.conf // for closure, suppress typedef
  try {
    this.LOG('Detected type marker: %s', location)
    const xml = await read(location)
    const { namespace, typeTags, importTags } = parseFile(xml)
    const types = typeTags.map(({ content, props }) => {
      const tt = new Type()
      tt.fromXML(content, props, namespace)
      return tt
    })

    this.emit('types', types) // remember types for js-replace-stream

    let block
    if (closure) {
      block = closureJoinTypes(importTags, types)
    } else if (externs) {
      block = externsJoinTypes(importTags, types, namespace, this.namespaces) + '\n'
      if (namespace) this.emit('namespace', namespace)
    } else {
      block = joinTypes(importTags, types)
    }

    const typedef = `/* ${docOrTypal} ${location} */\n${block}`
    return typedef
  } catch (e) {
    this.LOG('(%s) Could not process typedef-js: %s', location, e.message)
    return match
  }
}

/** @type {restream.Rule} */
const typedefRule = {
  re: typedefJsRe,
  replacement,
}

/**
 * Creates a single typedef block from all imports and types.
 * @param {Array<{name:string, from:string}>} imports
 * @param {Array<Type>} types
 */
const joinTypes = (imports, types) => {
  const ts = types.map(tt => tt.toTypedef())

  const is = imports.map(importToTypedef)

  const iss = is.map(makeBlock).join('')
  const tss = ts.join('')
  const importsAndTypes = `${iss}${tss}`

  return importsAndTypes
}

export default typedefRule

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} restream.Rule
 */