const { _parseFile } = require('./depack')

/**
 * @methodName {parseFile}
 */
function parseFile(...args) {
  return _parseFile(...args)
}

module.exports = {
  parseFile,
}
