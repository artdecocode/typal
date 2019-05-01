import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import { collect } from 'catchment'
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

export const checks = makeTestSuite('test/result/common/check', {
  context: TempContext,
  /**
   * @param {TempContext} t
   */
  async getResults({ write }) {
    await write('types.xml', this.types)
    let conf; this.preamble && eval(`conf = ${this.preamble}`)
    this.conf && eval(`conf = ${this.conf}`)
    const js = makeJSTypal(conf)
    const logged = []
    js.file = 'test/temp/program.js'
    js.lines = this.input.split('\n')
    js.LOG = (s, ...a) => {
      let i = 0
      logged.push(s.replace(/%s/g, () => {
        const r = a[i]
        i++
        return r
      }))
    }
    js.end(this.input)
    await collect(js)
    return logged.join('\n')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})