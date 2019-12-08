const { _parseFile, _getLinks } = require('./typal')

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

/**
 * Gets links for markdown. Iterates through the types to find referenced ones, and returns a string which contains a link to it.
 * @param {!Array<_typal.Type>} allTypes All types that can be linked.
 * @param {string|!_typedefsParser.Type} type The type or parsed type that should be serialised.
 * @param {!_typal.LinkingOptions=} [opts] Options for linking.
 * @return {string}
 */
function getLinks(allTypes, type, opts = {}) {
  return _getLinks(allTypes, type, opts)
}

module.exports = {
  parseFile,
  getLinks,
}

/**
 * @typedef {import('../types').Type} _typal.Type
 */
/**
 * @typedef {import('../types').Import} _typal.Import
 */
/**
 * @typedef {import('../types').LinkingOptions} _typal.LinkingOptions
 */
