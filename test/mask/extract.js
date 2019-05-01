import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import read from '@wrote/read'
import extractTypedef from '../../src/lib/extract'

export default makeTestSuite('test/result/extract', {
  context: TempContext,
  async getResults() {
    if (this.js) this.input = await read('source.js', this.js)
    const res = await extractTypedef(this.input)
    return res
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})