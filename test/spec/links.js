import { equal } from 'zoroaster/assert'
import { getLinks } from '../../src/lib/Type'

/** */
const ts = {
  'can link type'() {
    const type = 'Type'
    const res = getLinks([{ fullName: 'Type' }], type)
    equal(res, '[Type](#type-type)')
  },
  'can link types in Object'() {
    const type = 'Object.<string, Type>'
    const res = getLinks([{ fullName: 'Type' }], type)
    equal(res, 'Object.<string, [Type](#type-type)>')
  },
  'can link types in Promise'() {
    const type = 'Promise.<Type>'
    const res = getLinks([{ fullName: 'Type' }], type)
    equal(res, 'Promise.<[Type](#type-type)>')
  },
}

export default ts