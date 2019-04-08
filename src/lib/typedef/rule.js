import extractTags from 'rexml'
import read from '@wrote/read'
import { builtinModules } from 'module'
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
    const { closure, externs } = this.conf // for closure, suppress typedef
    try {
      this.LOG('Detected type marker: %s', location)
      const xml = await read(location)
      const root = extractTags('types', xml)
      if (!root.length) throw new Error('XML file should contain root types element.')

      const [{ content: Root }] = root

      const typeTags = extractTags('type', Root)
      const imports = extractTags('import', Root)
        .map(({ props: { 'name': name, 'from': from } }) => ({ name, from }))

      const types = typeTags.map(({ content, props }) => {
        const tt = new Type()
        tt.fromXML(content, props)
        return tt
      })

      this.emit('types', types) // remember types for js-replace-stream

      let block
      if (closure) {
        block = closureJoinTypes(imports, types)
      } else if (externs) {
        block = externsJoinTypes(imports, types) + '\n'
      } else {
        block = joinTypes(imports, types)
      }

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
const importToExtern = (Import) => {
  let a
  if (builtinModules.includes(Import.from)) {
    const from = ['process', 'console', 'module']
      .includes(Import.from) ? `_${Import.from}` : Import.from
    a = `${from}.${Import.name}`
  } else {
    console.warn('Unknown import in externs: %s.%s', Import.from, Import.name)
    a = `import('${Import.from}').${Import.name}`
  }
  const b = makeBlock(` * @typedef {${a}}`)
  return `${b}var ${Import.name}`
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

const externsJoinTypes = (imports, types) => {
  const tblocks = types.map((t) => {
    const m = t.toTypedef(true)
    const b = makeBlock(m)
    return `${b}var ${t.name}`
  })
  const iblocks = imports.map((i) => {
    const m = importToExtern(i)
    return m
  })
  const blocks = [...tblocks, ...iblocks]
    .join('\n')
  return blocks
}

const addSuppress = (line) => {
  const m = ` * @suppress {nonStandardJsDocs}
${line}`
  return m
}

export default typedefRule