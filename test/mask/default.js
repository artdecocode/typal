import { makeTestSuite } from 'zoroaster'
import { makePropsTable } from '../../src/lib/Type'
import Property from '../../src/lib/Property'

export default makeTestSuite('test/result/ts.md', {
  getResults(input) {
    const { description, ...i } = JSON.parse(input)
    const res = makePropsTable([
      Property.fromXML(description, i),
    ])
    return res
  },
})

