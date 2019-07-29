import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import parseFile from '../../src/lib/parse'

export const toMarkdown = makeTestSuite('test/result/Type/markdown', {
  context: TempContext,
  getResults() {
    const { types, Imports } = parseFile(this.input)

    const all = [...Imports, ...types]
    return all.map((t) => {
      return t.toMarkdown(all, this.preamble)
    }).join('\n')
  },
  jsProps: ['preamble'],
})

export const narrow = makeTestSuite('test/result/Type/narrow', {
  context: TempContext,
  getResults() {
    const { types, Imports } = parseFile(this.input)

    const all = [...Imports, ...types]
    const res = all.map((t) => {
      const m = t.toMarkdown(all, { narrow: true })
      if (m.table) {
        m.table.props.forEach(a => {
          a.prop = { ...a.prop }
        })
      }
      return m
    })
    return res
    // return JSON.stringify(res, null, 2)
  },
  jsonProps: ['expected'],
})