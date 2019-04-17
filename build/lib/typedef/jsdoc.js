const Type = require('../Type'); // eslint-disable-line
/**
 * _JSDoc regex_ detects the ` * @param {Type}` declaration above functions, and the _JSDoc rule_ updates them according to existing types that were detected with the `typedefRule` rule.
 */

       const jsDocRe = /( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm

const JSDocRule = {
  re: jsDocRe,
  replacement(match, ws, typeName, optional, paramName) {
    const { closure } = this.conf
    const nullable = /^!/.test(typeName)
    const realName = nullable ? typeName.replace(/^!/, '') : typeName
    /** @type {Type} */
    const found = Object.values(this.types).find(({ name, fullName }) => {
      if (closure) return fullName == realName
      return name == realName
    })
    if (!found) {
      this.LOG('Type %s not found', realName)
      return match
    }
    const s = found.toParam(paramName, optional, ws, nullable, closure)
    return s
  },
}

module.exports=JSDocRule

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../Type').default} Type
 */

module.exports.jsDocRe = jsDocRe