import argufy from 'argufy'

export const argsConfig = {
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
  'useNamespace': {
    description: 'Generate JSDoc for functions using namespaces.',
    boolean: true,
    short: 'u',
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
export const _source = /** @type {!Array<string>} */ (args['source'])

/**
 * The destination where to save output.
    If not passed, the file will be overwritten.
    If `-` is passed, prints to stdout.
 */
export const _output = /** @type {string} */ (args['output'])

/**
 * Whether to generate types in _Closure_ mode.
 */
export const _closure = /** @type {boolean} */ (args['closure'])

/**
 * Generate JSDoc for functions using namespaces.
 */
export const _useNamespace = /** @type {boolean} */ (args['useNamespace'])

/**
 * Whether to generate externs for _GCC_.
 */
export const _externs = /** @type {boolean} */ (args['externs'])

/**
 * Comma-separated location of files to read types from.
 */
export const _types = /** @type {string} */ (args['types'])

/**
 * Scans the input file for `@type` comment in functions' JSDoc, and inserts the annotations from types' files.
 */
export const _template = /** @type {string} */ (args['template'])

/**
 * Extracts types from JavaScript source code and saves them
    into the types.xml file specified in the output option.
 */
export const _migrate = /** @type {boolean} */ (args['migrate'])

/**
 * Print the help information and exit.
 */
export const _help = /** @type {boolean} */ (args['help'])

/**
 * Show the version's number and exit.
 */
export const _version = /** @type {boolean} */ (args['version'])

/**
 * The additional arguments passed to the program.
 */
export const _argv = /** @type {!Array<string>} */ (args._argv)