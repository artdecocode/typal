import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import JSTypal from '../../src/lib/JSTypal'

const ts = makeTestSuite('test/result/js-typal', {
  context: TempContext,
  /**
   * @param {TempContext} t
   */
  async getTransform({ write }) {
    if (this.types) await write('types.xml', this.types)
    let conf; this.conf && eval(`conf = ${this.conf}`)
    const js = new JSTypal(conf)
    js.LOG = () => {}
    return js
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export default ts