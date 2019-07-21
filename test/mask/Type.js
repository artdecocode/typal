import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import parseFile from '../../src/lib/parse'

export const toMarkdown = makeTestSuite('test/result/Type/markdown', {
  context: TempContext,
  getResults() {
    const { types, Imports } = parseFile(this.input)

    const all = [...Imports, ...types]
    return all.map((t) => {
      return t.toMarkdown(all)
    }).join('\n')
  },
})

export const narrow = makeTestSuite('test/result/Type/narrow', {
  context: TempContext,
  getResults() {
    const { types, Imports } = parseFile(this.input)

    const all = [...Imports, ...types]
    return all.map((t) => {
      return t.toMarkdown(all, { narrow: true })
    }).join('\n')
  },
})