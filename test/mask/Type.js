import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import parseFile from '../../src/lib/parse'
import Type from '../../src/lib/Type'

export const toMarkdown = makeTestSuite('test/result/Type/markdown', {
  context: TempContext,
  getResults(input) {
    const { types, imports } = parseFile(input)

    // copy Documentary logic
    const Imports = imports.map(({ name, from }) => {
      const tt = new Type()
      tt.fromXML('', {
        name,
        type: `import('${from}').${name}`,
        noToc: true,
        import: true,
      }, from)
      return tt
    })
    const all = [...Imports, ...types]
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