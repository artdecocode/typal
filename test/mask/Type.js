import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import parseFile from '../../src/lib/parse'

export const toMarkdown = makeTestSuite('test/result/Type/markdown', {
  context: TempContext,
  getResults() {
    const { types, imports } = parseFile(this.input)

    const all = [...imports, ...types]
    return all.map((t) => {
      const { table, LINE } =  t.toMarkdown(all, this.preamble)
      return `${LINE}${table}`
    }).join('\n')
  },
  jsProps: ['preamble'],
})

export const narrow = makeTestSuite('test/result/Type/narrow', {
  context: TempContext,
  getResults() {
    const { types, imports } = parseFile(this.input)

    const all = [...imports, ...types]
    const res = all.map((t) => {
      const { table, LINE } = t.toMarkdown(all, { narrow: true })
      if (table) table.props.forEach(a => {
        a.prop = { ...a.prop }
      })
      return { LINE, table }
    })
    return res
    // return JSON.stringify(res, null, 2)
  },
  jsonProps: ['expected'],
})