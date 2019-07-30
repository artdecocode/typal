import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'
import template from '../../src/bin/commands/template'

export const toMarkdown = makeTestSuite('test/result/common/template', {
  context: TempContext,
  async getResults({ write, resolve, snapshot }) {
    const path = await write('index.js', this.input)
    const types = await write('types.xml', this.types)
    const output = resolve('output.js')
    await template([path], {
      types,
      output,
    })
    return await snapshot('output.js')
  },
  // jsProps: ['preamble'],
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})