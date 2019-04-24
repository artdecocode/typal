import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import makeJSTypal from '../../src/lib/make-JSTypal'

export default makeTestSuite('test/result/js-typal', {
  context: TempContext,
  /**
   * @param {TempContext} t
   */
  async getTransform({ write }) {
    if (this.types) await write('types.xml', this.types)
    let conf; this.preamble && eval(`conf = ${this.preamble}`)
    this.conf && eval(`conf = ${this.conf}`)
    const js = makeJSTypal(conf)
    js.LOG = () => {}
    return js
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})