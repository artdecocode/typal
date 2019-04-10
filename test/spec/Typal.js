import { ok } from 'zoroaster/assert'
import { collect } from 'catchment'
import Zoroaster from 'zoroaster'
import Context, { MarkdownSnapshot } from '../context'
import Typal from '../../src/lib/JSTypal'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: [Context, MarkdownSnapshot],
  async 'places types declaration'({ typesLocation }) {
    const s = `/* documentary ${typesLocation} */

`
    const stream = new Typal()
    stream.end(s)
    return stream
  },
  async 'places types declaration with existing typedef'({ typesLocation }) {
    const s = `/* documentary ${typesLocation} */

/**
 * @typedef {Object} TypeDef Existing typedef.
 * @prop {string} [test=true] If test or not.
 */

export default test`
    const stream = new Typal()
    stream.end(s)
    return stream
  },
}

export default T

/** @type {Object.<string, (c: Context, z: Zoroaster)>} */
export const meta = {
  context: [Context, Zoroaster],
  async 'remembers the parsed types in this'({ typesLocation }) {
    const s = `
/* documentary ${typesLocation} */

`
    const stream = new Typal()
    stream.end(s)
    await collect(stream)
    ok('StaticConfig' in stream.types)
  },
  async 'expands the type in function\'s JSDoc'({ typesLocation }, { snapshotExtension }) {
    const s = `import { resolve } from 'path'

/**
 * Configure the static middleware.
 * @param {StaticConfig} config
 */
function configure(config) {
  return resolve('test')
}

/* documentary ${typesLocation} */

export default configure`
    const stream = new Typal()
    stream.end(s)
    const res = await collect(stream)
    snapshotExtension('js')
    return res
  },
  async 'expands an optional type in function\'s JSDoc'(
    { typesLocation }, { snapshotExtension }
  ) {
    const s = `import { resolve } from 'path'

/**
 * Configure the static middleware.
 * @param {StaticConfig} [config]
 */
function configure(config) {
  return resolve('test')
}

/* documentary ${typesLocation} */

export default configure`
    const stream = new Typal()
    stream.end(s)
    const res = await collect(stream)
    snapshotExtension('js')
    return res
  },
  async 'expands an expanded type in function\'s JSDoc'(
    { typesLocation }, { snapshotSource }
  ) {
    const s = `import { resolve } from 'path'

/**
 * Configure the static middleware.
 * @param {StaticConfig} config Options to setup \`koa-static\`.
 * @param {string} config.root Root directory string.
 * @param {number} [config.maxage=0] Browser cache max-age in milliseconds. Default \`0\`.
 * @param {boolean} [config.hidden=false] Allow transfer of hidden files. Default \`false\`.
 * @param {string} [config.index="index.html"] Default file name. Default \`index.html\`.
 * @param {SetHeaders} [config.setHeaders] Function to set custom headers on response.
 */
function configure(config) {
  return resolve('test')
}

/* documentary ${typesLocation} */

export default configure`
    const stream = new Typal()
    stream.end(s)
    const res = await collect(stream)
    snapshotSource('expands the type in function\'s JSDoc', 'js')
    return res
  },
}