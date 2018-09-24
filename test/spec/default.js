import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import typal from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof typal, 'function')
  },
  async 'calls package without error'() {
    await typal()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await typal({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T