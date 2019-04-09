/**
 * JSDoc detects the param {Type} declaration above functions, and updates them according to existing types that were detected with the `typedefRule` rule.
 */

export const jsDocRe = /( *) \* @param {(.+?)} (\[)?([^\s\]]+)\]?(?: .+)?((?:\n(?: +)\* @param {(?:.+?)} \[?\4\]?.*)*)/gm

const JSDocRule = {
  re: jsDocRe,
  replacement(match, ws, typeName, optional, paramName) {
    const nullable = /^!/.test(typeName)
    const realName = nullable ? typeName.replace(/^!/, '') : typeName
    if (!(realName in this.types)) {
      this.LOG('Type %s not found', realName)
      return match
    }
    /** @type {Type} */
    const t = this.types[realName]
    const s = t.toParam(paramName, optional, ws, nullable)
    return s
  },
}

// const propRe = / \* @prop(?:erty)? .+\n/

// // const typedefRe = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\n((?:${propRe.source})*)`, 'gm')

// export default typedefRe

export default JSDocRule

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../Type').default} Type
 */