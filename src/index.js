import { debuglog } from 'util'

const LOG = debuglog('typal')

/**
 * Keeps JSDoc types in XML files and converts them to JavaScript and Markdown.
 * @param {Config} config Options for the program.
 * @param {boolean} config.shouldRun A boolean option.
 */
export default async function typal(config) {
  const {
    type,
  } = config
  LOG('typal called with %s', type)
  return type
}

/* documentary types/index.xml */
/**
 * @typedef {Object} Config Options for the program.
 * @prop {boolean} shouldRun A boolean option.
 */
