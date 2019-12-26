import Property from '../../../src/lib/Property'
import makePropsTable from '../../../src/lib/make-props-table'

const ts = {
  'adds default when a prop has it'() {
    const res = makePropsTable({}, [
      Property.fromXML('test', { name: 'prop1' }),
      Property.fromXML('test2', { name: 'prop2', default: 'OK' }),
    ])
    return res
  },
  'escapes the | in the description'() {
    const res = makePropsTable({}, [
      Property.fromXML('`echo abc | node consume.js`', { name: 'prop1', type: 'string' }),
    ])
    return res
  },
  'skips default when no props have it'() {
    const res = makePropsTable({}, [
      Property.fromXML('test', { name: 'prop1' }),
      Property.fromXML('test2', { name: 'prop2' }),
    ])
    return res
  },
  'returns icons'() {
    const { props } = makePropsTable({}, [
      Property.fromXML('test', { name: 'prop1', type: 'Test' }),
      Property.fromXML('test2', { name: 'prop2', type: 'Test' }),
    ], [{ fullName: 'Test' }], {
      narrow: true,
      nameProcess(name, odd) {
        const icon = odd ? '<icon-odd>' : '<icon-even>'
        return `${icon} ${name}`
      },
    })
    return props.map(({ typeName, odd }) => {
      return { typeName, odd }
    })
  },
}

export default ts