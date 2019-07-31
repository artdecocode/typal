let argufy = require('argufy'); if (argufy && argufy.__esModule) argufy = argufy.default;

const argsConfig = {
  'source': {
    description: 'The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.',
    command: true,
    multiple: true,
  },
  'output': {
    description: 'The destination where to save output.\nIf not passed, the file will be overwritten.\nIf `-` is passed, prints to stdout.',
    short: 'o',
  },
  'closure': {
    description: 'Whether to generate types in _Closure_ mode.',
    boolean: true,
    short: 'c',
  },
  'externs': {
    description: 'Whether to generate externs for _GCC_.',
    boolean: true,
    short: 'e',
  },
  'types': {
    description: 'Comma-separated location of files to read types from.',
    short: 't',
  },
  'template': {
    description: 'Scans the input file for `@type` comment in functions\' JSDoc, and inserts the annotations from types\' files.',
    short: 'T',
  },
  'migrate': {
    description: 'Extracts types from JavaScript source code and saves them\ninto the types.xml file specified in the output option.',
    boolean: true,
    short: 'm',
  },
  'help': {
    description: 'Print the help information and exit.',
    boolean: true,
    short: 'h',
  },
  'version': {
    description: 'Show the version\'s number and exit.',
    boolean: true,
    short: 'v',
  },
}
const args = argufy(argsConfig)

/**
 * The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., `typal types/index.js types/vendor.js`.
 */
const _source = /** @type {(!Array<string>|string)} */ (args['source'])

/**
 * The destination where to save output.
    If not passed, the file will be overwritten.
    If `-` is passed, prints to stdout.
 */
const _output = /** @type {string} */ (args['output'])

/**
 * Whether to generate types in _Closure_ mode.
 */
const _closure = /** @type {boolean} */ (args['closure'])

/**
 * Whether to generate externs for _GCC_.
 */
const _externs = /** @type {boolean} */ (args['externs'])

/**
 * Comma-separated location of files to read types from.
 */
const _types = /** @type {string} */ (args['types'])

/**
 * Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.
 */
const _template = /** @type {string} */ (args['template'])

/**
 * Extracts types from JavaScript source code and saves them
    into the types.xml file specified in the output option.
 */
const _migrate = /** @type {boolean} */ (args['migrate'])

/**
 * Print the help information and exit.
 */
const _help = /** @type {boolean} */ (args['help'])

/**
 * Show the version's number and exit.
 */
const _version = /** @type {boolean} */ (args['version'])

/**
 * The additional arguments passed to the program.
 */
const _argv = /** @type {!Array<string>} */ (args._argv)

module.exports.argsConfig = argsConfig
module.exports._source = _source
module.exports._output = _output
module.exports._closure = _closure
module.exports._externs = _externs
module.exports._types = _types
module.exports._template = _template
module.exports._migrate = _migrate
module.exports._help = _help
module.exports._version = _version
module.exports._argv = _argv