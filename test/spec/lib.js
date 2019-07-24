import { equal } from '@zoroaster/assert'
import Context from '../context'
import { trimD } from '../../src/lib'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'trims the description correctly'() {
    const d = `

    hello world
    test this
    `
    const res = trimD(d)
    equal(res, `hello world
test this`)
  },
}

export default T