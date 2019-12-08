const { _parseFile, _getLinks } = require('./typal')

/**
 * @methodType {parseFile}
 */
function parseFile(xml, namespace) {
  return _parseFile(xml, namespace)
}

/**
 * @methodType {getLinks}
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
 * @typedef {import('../types').LinkingOptions} _typal.LinkingOptions
 */
