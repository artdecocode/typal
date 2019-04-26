import Context from '../context'
import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'

export default makeTestSuite('test/result/bin/default', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      const p = await write('program.js', this.program)
      return [p, ...args]
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults(input, { snapshot }) {
    return snapshot()
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export const dir = makeTestSuite('test/result/bin/dir', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      await write('program.js', this.program)
      await write('program2.js', this.program)
      return ['test/temp', ...args]
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults(input, { snapshot }) {
    return snapshot()
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export const extract = makeTestSuite('test/result/bin/extract', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      await write('program.js', this.program)
      return ['test/temp/program.js', ...args]
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults(input, { read }) {
    if (/-o /.test(input)) return read('types.xml')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export const externs = makeTestSuite('test/result/js-typal/externs', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      if (this.types) await write('types.xml', this.types)
      const p = await write('program.js', this.input)
      return [p, '-e']
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults(input, { read }) {
    return read('program.js')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export const paramsCheck = makeTestSuite('test/result/common/check', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      if (this.types) await write('types.xml', this.types)
      const p = await write('program.js', this.input)
      let conf = {}; this.conf && eval(`conf = ${this.conf}`)
      const a = [p]
      if (conf.closure) a.push('-c')
      return a
    },
  },
  mapActual({ stderr }) {
    return stderr.trim()
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})