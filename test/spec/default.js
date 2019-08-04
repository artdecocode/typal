import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import typal from '../../src'
import parse from '@typedefs/parser'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'serialises'() {
    const s = parse('function(string, number=)')
  },
}

export default T