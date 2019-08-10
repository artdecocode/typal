import { equal } from '@zoroaster/assert'
import { parseFile } from '../../src'

export default {
  'updates properties for root namespace'() {
    const res = parseFile(`<types ns="_test"><type name="Test">
  <prop name="a" type="_test.TestA">B</prop>
  <prop name="b" type="_test.TestB">B</prop>
</type></types>`, '_test')
    const [{ type: typeA }, { type: typeB }] = res.types[0].properties
    equal(typeA, 'TestA')
    equal(typeB, 'TestB')
  },
  'updates extends for root namespace'() {
    const res = parseFile(`<types ns="_test">
  <type extends="_test.TestA" name="Test"/>
</types>`, '_test')
    const { extends: e } = res.types[0]
    equal(e, 'TestA')
  },
  'updates type for root namespace'() {
    const res = parseFile(`<types ns="_test">
  <type type="_test.TestA" name="Test"/>
</types>`, '_test')
    const { type: e } = res.types[0]
    equal(e, 'TestA')
  },
}