let getArgs = require('argufy'); if (getArgs && getArgs.__esModule) getArgs = getArgs.default;

const args = getArgs({
  'source': { command: true },
  'closure': { short: 'c', boolean: true },
  'externs': { short: 'e', boolean: true },
})

/**
 * The path to the source file or directory to embed types into.
 * @type {string}
 */
       const _source = /** @type {string} */ (args['source'])
/**
 * Whether to generate types for closure.
 * @type {boolean}
 */
       const _closure = /** @type {boolean} */ (args['closure'])
/**
 * Generate externs.
 * @type {boolean}
 */
       const _externs = /** @type {boolean} */ (args['externs'])

module.exports._source = _source
module.exports._closure = _closure
module.exports._externs = _externs