const { _parseFile, _getLinks } = require('./depack')

/**
 * @methodType {parseFile}
 */
function parseFile(xml, namespace) {
  return _parseFile(xml, namespace)
}

/**
 * @methodType {getLinks}
 */
function getLinks(xml, namespace) {
  return _getLinks(xml, namespace)
}

module.exports = {
  parseFile,
  getLinks,
}

/**
 * @typedef {import('../types').Type} _typal.Type
 */