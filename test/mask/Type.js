import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import parseFile from '../../src/lib/parse'

export const toMarkdown = makeTestSuite('test/result/Type/markdown', {
  context: TempContext,
  getResults(input) {
    const { types, Imports } = parseFile(input)

    const all = [...Imports, ...types]
    return all.map((t) => {
      return t.toMarkdown(all)
    }).join('\n')
  },
})