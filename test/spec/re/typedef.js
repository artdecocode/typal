import { equal } from 'zoroaster/assert'
import mismatch from 'mismatch'
import Context from '../../context'
import { typedefJsRe } from '../../../src/lib/typedef/rule'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'matches the xml snippet'() {
    const l = 'types/static.xml'
    const g = `/* typal ${l} */

`
    const [{ loc, gen }] = mismatch(typedefJsRe, g, ['m', 'loc', 'gen'])
    equal(loc, l)
    equal(gen, undefined)
  },
  async 'matches the xml snippet with generated typedef below'() {
    const l = 'types/static.xml'
    const p = `/**
* @typedef {Object} Test Generated type.
* @prop {string} hello Generated property.
*/
`
    const g = `/* documentary ${l} */
${p}
`
    const [{ loc, gen }] = mismatch(typedefJsRe, g, ['m', 'loc', 'gen'])
    equal(loc, l)
    equal(gen, p)
  },
}

export default T
