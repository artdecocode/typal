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
    try {
      this.LOG('Detected type marker: %s', location)
      const xml = await read(location)
      const root = extractTags('types', xml)
      if (!root.length) throw new Error('XML file should contain root types element.')

      const [{ content: Root }] = root

      const types = extractTags('type', Root)
      const typedefs = types.map(({ content, props }) => {
        const tt = new Type()
        tt.fromXML(content, props)
        return tt
      })

      this.emit('types', typedefs) // remember types for js-replace-stream

      const ts = typedefs
        .map(tt => tt.toTypedef())

      // imports
      const is = extractTags('import', Root)
        .map(({ props: { name, from } }) => ` * @typedef {import('${from}').${name}} ${name}`)

      const iss = is.join('\n')
      const tss = ts.join('\n *\n')
      const importsAndTypes = `${is.length ? `${iss}\n *\n` : ''}${tss}`

      const b = makeBlock(importsAndTypes)
      const typedef = `/* ${docOrTypal} ${location} */\n${b}`
      return typedef
    } catch (e) {
      this.LOG('(%s) Could not process typedef-js: %s', location, e.message)
      return match
    }
  },
}

export default typedefRule