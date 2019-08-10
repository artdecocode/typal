import Context from '../context'
import makeTestSuite from '@zoroaster/mask'
import TempContext from 'temp-context'

const TS = makeTestSuite('test/result/bin/default', {
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
  async getResults({ snapshot }) {
    return snapshot()
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

const dir = makeTestSuite('test/result/bin/dir', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      const p1 = await write('program.js', this.program)
      const p2 = await write('program2.js', this.program)
      if (args[0] == '--nothing') return ['test/temp', ...args]
      return [p1, p2]
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults({ snapshot }) {
    return snapshot()
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

const extract = makeTestSuite('test/result/bin/extract', {
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
  async getResults({ read }) {
    if (/-o /.test(this.input)) return read('types.xml')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

const externs = makeTestSuite('test/result/js-typal/externs.md', {
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
  async getResults({ read }) {
    return read('program.js')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

const externs2 = makeTestSuite('test/result/common/externs', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      await write('types.xml', this.input)
      const prog = '/* typal test/temp/types.xml externs */\n'
      const p = await write('program.js', prog)
      return [p]
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults({ read }) {
    return read('program.js')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

const closure = makeTestSuite('test/result/common/closure', {
  context: TempContext,
  fork: {
    module: Context.BIN,
    /**
     * @param {string} args
     * @param {TempContext} t
     */
    async getArgs(args, { write }) {
      await write('types.xml', this.input)
      const prog = '/* typal test/temp/types.xml closure */\n'
      const p = await write('program.js', prog)
      return [p]
    },
  },
  /**
   * @param {TempContext} t
   */
  async getResults({ read }) {
    return read('program.js')
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

const paramsCheck = makeTestSuite('test/result/common/check', {
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
      const a = [p]
      if (this.conf && this.conf.closure) a.push('-c')
      return a
    },
  },
  jsProps: ['conf'],
  mapActual({ stderr }) {
    return stderr.trim()
  },
  propStartRe: /\/\*@/,
  propEndRe: /\/\*@\*\//,
})

export default (process.env.ALAMODE_ENV=='test-compile' ? {
  ...TS,
  dir, extract, externs, externs2, closure, paramsCheck, // commonly tested
} : {
  ...TS, dir, extract,
})