import argufy from 'argufy'

const args = argufy({
  'source': { command: true },
  'output': 'o',
  'closure': { boolean: true, short: 'c' },
  'externs': { boolean: true, short: 'e' },
})

/**
 * The path to the source file or directory to embed types into.
 */
export const _source = /** @type {string} */ (args['source'])

/**
 * The destination where to save output. If not passed, the file will be overwritten. If `-` is passed, prints to stdout.
 */
export const _output = /** @type {string} */ (args['output'])

/**
 * Whether to generate types in _Closure_ mode.
 */
export const _closure = /** @type {boolean} */ (args['closure'])

/**
 * Whether to generate externs for _GCC_.
 */
export const _externs = /** @type {boolean} */ (args['externs'])