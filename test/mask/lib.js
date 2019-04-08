import makeTestSuite from '@zoroaster/mask'
import JSTypal from '../../src/lib/JSTypal'
import TempContext from 'temp-context'
// import { createReadStream } from 'fs'

const ts = makeTestSuite('test/result/js-typal', {
  context: TempContext,
  /**
   * @param {TempContext} t
   */
  async getTransform({ write }) {
    if (this.types) await write('types.xml', this.types)
    const js = new JSTypal()
    js.LOG = () => {}
    return js
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export default ts