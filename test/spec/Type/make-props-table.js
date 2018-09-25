import { equal } from 'zoroaster/assert'
import Property from '../../../src/lib/Property'
import { makePropsTable } from '../../../src/lib/Type'

const ts = {
  'adds default when a prop has it'() {
    const res = makePropsTable([
      Property.fromXML('test', { name: 'prop1' }),
      Property.fromXML('test2', { name: 'prop2', default: 'OK' })
    ])
    equal(res, '\n\n```table\n[["Name","Type","Description","Default"],["__prop1*__","_*_","test","-"],["prop2","_*_","test2","`OK`"]]\n```')
  },
  'skips default when no props have it'() {
    const res = makePropsTable([
      Property.fromXML('test', { name: 'prop1' }),
      Property.fromXML('test2', { name: 'prop2' })
    ])
    equal(res, '\n\n```table\n[["Name","Type","Description"],["__prop1*__","_*_","test"],["__prop2*__","_*_","test2"]]\n```')
  },
}

export default ts