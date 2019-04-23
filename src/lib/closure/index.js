import { builtinModules } from 'module'
import Type from '../Type' // eslint-disable-line
import { makeBlock, importToTypedef, addSuppress, getExternDeclaration } from '../'

export const importToExtern = (Import, namespace) => {
  let a
  if (builtinModules.includes(Import.from)) {
    const from = ['process', 'console', 'module']
      .includes(Import.from) ? `_${Import.from}` : Import.from
    a = `${from}.${Import.name}`
  } else {
    console.warn('Unknown import in externs: %s.%s', Import.from, Import.name)
    a = `import('${Import.from}').${Import.name}`
  }
  const b = makeBlock(` * @typedef {${a}}`)
  return `${b}${getExternDeclaration(namespace, Import.name)}`
}

/**
 * Creates multiple blocks from all imports and types with suppressed `nonStandardJsDocs` warning for Google Closure Compiler.
 * @param {Array<{name:string, from:string}>} imports
 * @param {Array<Type>} types
 */
export const closureJoinTypes = (imports, types) => {
  const tblocks = types.map((t) => {
    const m = t.toTypedef(true)
    return m
  })
  const iblocks = imports.map((i) => {
    const m = makeBlock(addSuppress(importToTypedef(i)))
    return m
  })
  const blocks = [...tblocks, ...iblocks]
  return blocks.join('')
}

/**
 * @param {!Array<!Type>} types
 * @param {?string} namespace
 * @param {!Array<string>} currentNamespaces
 */
export const externsJoinTypes = (types, namespace, currentNamespaces) => {
  const tblocks = types.map((t) => {
    return t.toExtern()
  })
  const iblocks = [] // currently no imports in types.
  // imports.map((i) => {
  //   const m = importToExtern(i, namespace)
  //   return m
  // })
  const blocks = [...tblocks, ...iblocks]
    .join('\n')
  const n = namespace && !currentNamespaces.includes(namespace) ? `/** @const */
var ${namespace} = {}
` : ''
  return `${n}${blocks}`
}