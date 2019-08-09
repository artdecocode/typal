const { _parseFile } = require('./depack')

/**
 * @methodType {parseFile}
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