import makeTestSuite from '@zoroaster/mask'
import { makePropsTable } from '../../src/lib/Type'
import Property from '../../src/lib/Property'

export default makeTestSuite('test/result/ts', {
  getResults(input) {
    const { description, ...i } = JSON.parse(input)
    const res = makePropsTable([
      Property.fromXML(description, i),
    ])
    return res
  },
})

