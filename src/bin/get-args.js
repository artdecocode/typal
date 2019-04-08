import getArgs from 'argufy'

const args = getArgs({
  'source': { command: true },
  'closure': { short: 'c', boolean: true },
})

/**
 * The path to the source file or directory to embed types into.
 * @type {string}
 */
export const _source = /** @type {string} */ (args['source'])
/**
 * Whether to generate types for closure.
 * @type {boolean}
 */
export const _closure = /** @type {boolean} */ (args['closure'])