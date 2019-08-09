const { _parseFile } = require('./depack')

/**
 * Parses the types.xml file. Looks for `<type>`, `<constructor>`, `<interface>` and `<method>` elements and extracts their properties, functions and arguments.
 * @param {string} xml The content of the `xml` file.
 * @param {string=} [namespace] Namespace to ignore in types and properties.
 * @return {{
    namespace: string,
    types: !Array<!_typal.Type>,
    imports: !Array<!_typal.Import>
  }}
 */
function parseFile(xml, namespace) {
  return _parseFile(xml, namespace)
}

module.exports = {
  parseFile,
}

/**
 * @typedef {import('../types').Type} _typal.Type
 */
/**
 * @typedef {import('../types').Import} _typal.Import
 */