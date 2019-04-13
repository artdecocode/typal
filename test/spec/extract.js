import read from '@wrote/read'
import Context, { XmlSnapshot } from '../context'
import extract from '../../src/lib/extract'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: [Context, XmlSnapshot],
  async 'extracts types from a file'() {
    const r = await read('test/fixture/extract/extract.js')
    const res = await extract(r)
    return res
  },
  async 'extracts properties without descriptions'() {
    const r = await read('test/fixture/extract/props.js')
    const res = await extract(r)
    return res
  },
}

export default T
