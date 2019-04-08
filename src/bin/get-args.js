import getArgs from 'argufy'

const args = getArgs({
  'source': { command: true },
})

/**
 * The path to the source file or directory to embed types into.
 * @type {string}
 */
export const _source = /** @type {string} */ (args['source'])