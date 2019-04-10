let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;
const Type = require('../Type');
const { makeBlock, importToTypedef, parseFile } = require('../');
const { closureJoinTypes, externsJoinTypes } = require('../closure');

/**
 * The regex to detect the marker for `typal`. Will return everything until blank line which must be present even at the end of the file.
 */
       const typedefJsRe = /^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg

/**
 * @suppress {globalThis}
 * @type {function(this: { namespaces: !Array<string>, emit: function(string, *), LOG: function(...string), conf: { closure: boolean, externs: boolean } }, ...string): !Promise<string>}
 */
async function replacement(match, docOrTypal, location) {
  const { closure, externs } = this.conf // for closure, suppress typedef
  try {
    this.LOG('Detected type marker: %s', location)
    const xml = await read(location)
    const { namespace, typeTags, imports } = parseFile(xml)
    const types = typeTags.map(({ content, props }) => {
      const tt = new Type()
      tt.fromXML(content, props, namespace)
      return tt
    })

    this.emit('types', types) // remember types for js-replace-stream

    let block
    if (closure) {
      block = closureJoinTypes(imports, types)
    } else if (externs) {
      block = externsJoinTypes(imports, types, namespace, this.namespaces) + '\n'
      if (namespace) this.emit('namespace', namespace)
    } else {
      block = joinTypes(imports, types)
    }

    const typedef = `/* ${docOrTypal} ${location} */\n${block}`
    return typedef
  } catch (e) {
    this.LOG('(%s) Could not process typedef-js: %s', location, e.message)
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

module.exports=typedefRule

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */

module.exports.typedefJsRe = typedefJsRe