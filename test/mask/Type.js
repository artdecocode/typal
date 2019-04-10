import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import { parseFile } from '../../src/lib'
import Type from '../../src/lib/Type'

export const toMarkdown = makeTestSuite('test/result/Type/markdown', {
  context: TempContext,
  getResults(input) {
    const { typeTags, namespace, importTags } = parseFile(input)
    const types = typeTags.map(({ content, props }) => {
      const tt = new Type()
      tt.fromXML(content, props, namespace)
      return tt
    })
    // copy Documentary logic
    const imports = importTags.map(({ name, from }) => {
      const tt = new Type()
      tt.fromXML('', {
        name,
        type: `import('${from}').${name}`,
        noToc: true,
        import: true,
      }, from)
      return tt
    })
    const all = [...imports, ...types]
    return all.map((t) => {
      return t.toMarkdown(all)
    }).join('\n')
  },
  // /**
  //  * @param {TempContext} t
  //  */
  // async getTransform({ write }) {


  //   const js = new JSTypal(conf)
  //   js.LOG = () => {}
  //   return js
  // },
  // propStartRe: /\/\*@/,
  // propEndRe: /\/\*@\*\//,
})