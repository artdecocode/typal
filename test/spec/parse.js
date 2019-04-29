import { equal } from 'zoroaster/assert'
import parse from '../../src/lib/parse'

export default {
  'parses multiple root namespaces'() {
    const res = parse(`<types ns="_test"><type name="Test">
  <prop name="a" type="_test.TestA">B</prop>
  <prop name="b" type="_test.TestB">B</prop>
</type></types>`, '_test')
    const [{ type: typeA }, { type: typeB }] = res.types[0].properties
    equal(typeA, 'TestA')
    equal(typeB, 'TestB')
  },
}