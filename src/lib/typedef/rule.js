import extractTags from 'rexml'
import read from '@wrote/read'
import Type from '../Type'

export const typedefJsRe = /^\/\*\*? (documentary|typal) (.+?) \*\/\n(?:([^\n][\s\S]+?\n))?$/mg

const makeBlock = (s) => {
  return `/**
${s}
 */
`
}

/**
 * @typedef {import('restream').AsyncReplacer} AsyncReplacer
 * @type {{re: RegExp, replacement: AsyncReplacer}}
 */
const typedefRule = {
  re: typedefJsRe,
  async replacement(match, docOrTypal, location) {
    const { closure } = this.conf // for closure, suppress typedef
    try {
      this.LOG('Detected type marker: %s', location)
      const xml = await read(location)
      const root = extractTags('types', xml)
      if (!root.length) throw new Error('XML file should contain root types element.')

      const [{ content: Root }] = root

      const typeTags = extractTags('type', Root)
      const imports = extractTags('import', Root)
        .map(({ props: { name, from } }) => ({ name, from }))

      const types = typeTags.map(({ content, props }) => {
        const tt = new Type()
        tt.fromXML(content, props)
        return tt
      })

      this.emit('types', types) // remember types for js-replace-stream

      const block = closure ? closureJoinTypes(imports, types) : joinTypes(imports, types)

      const typedef = `/* ${docOrTypal} ${location} */\n${block}`
      return typedef
    } catch (e) {
      this.LOG('(%s) Could not process typedef-js: %s', location, e.message)
      return match
    }
  },
}

const importToTypedef = (Import) => {
  return ` * @typedef {import('${Import.from}').${Import.name}} ${Import.name}`
}

/**
 * Creates a single typedef block from all imports and types.
 * @param {Array<{name:string, from:string}>} imports
 * @param {Array<Type>} types
 */
const joinTypes = (imports, types) => {
  const ts = types.map(tt => tt.toTypedef())

  const is = imports.map(importToTypedef)

  const iss = is.join('\n')
  const tss = ts.join('\n *\n')
  const importsAndTypes = `${is.length ? `${iss}\n *\n` : ''}${tss}`

  const b = makeBlock(importsAndTypes)
  return b
}

/**
 * Creates multiple blocks from all imports and types with suppressed `nonStandardJsDocs` warning for Google Closure Compiler.
 * @param {Array<{name:string, from:string}>} imports
 * @param {Array<Type>} types
 */
const closureJoinTypes = (imports, types) => {
  const tblocks = types.map((t) => {
    const m = addSuppress(t.toTypedef())
    return m
  })
  const iblocks = imports.map((i) => {
    const m = addSuppress(importToTypedef(i))
    return m
  })
  const blocks = [...tblocks, ...iblocks].map((s) => {
    const block = makeBlock(s)
    return block
  })
  return blocks.join('')
}

const addSuppress = (line) => {
  const m = ` * @suppress {nonStandardJsDocs}
${line}`
  return m
}

export default typedefRule