import Property from '../../../src/lib/Property'
import { makePropsTable } from '../../../src/lib/Type'

const ts = {
  'adds default when a prop has it'() {
    const res = makePropsTable([
      Property.fromXML('test', { name: 'prop1' }),
      Property.fromXML('test2', { name: 'prop2', default: 'OK' }),
    ])
    return res
  },
  'escapes the | in the description'() {
    const res = makePropsTable([
      Property.fromXML('`echo abc | node consume.js`', { name: 'prop1', type: 'string' }),
    ])
    return res
  },
  'skips default when no props have it'() {
    const res = makePropsTable([
      Property.fromXML('test', { name: 'prop1' }),
      Property.fromXML('test2', { name: 'prop2' }),
    ])
    return res
  },
}

export default ts