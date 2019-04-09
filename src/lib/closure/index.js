import { builtinModules } from 'module'
import { makeBlock, importToTypedef } from '../'

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

const getExternDeclaration = (namespace, name) => {
  const ns = namespace ? `${namespace}.` : ''
  const v = namespace ? '' : 'var '
  const res = `${v}${ns}${name}`
  return res
}

/**
 * Creates multiple blocks from all imports and types with suppressed `nonStandardJsDocs` warning for Google Closure Compiler.
 * @param {Array<{name:string, from:string}>} imports
 * @param {Array<Type>} types
 */
export const closureJoinTypes = (imports, types) => {
  const tblocks = types.map((t) => {
    const m = addSuppress(t.toTypedef())
    return m
  })
  const iblocks = imports.map((i) => {
    const m = addSuppress(importToTypedef(i))
    return m
  })
  const blocks = [...tblocks, ...iblocks].map((s) => {
    const block = makeBlock(s)
    return block
  })
  return blocks.join('')
}

export const externsJoinTypes = (imports, types, namespace, currentNamespaces) => {
  const tblocks = types.map((t) => {
    const m = t.toExtern()
    const b = makeBlock(m)
    // const v = namespace ? 'var ' : ''
    return `${b}${getExternDeclaration(namespace, t.name)}`
  })
  const iblocks = imports.map((i) => {
    const m = importToExtern(i, namespace)
    return m
  })
  const blocks = [...tblocks, ...iblocks]
    .join('\n')
  const n = namespace && !currentNamespaces.includes(namespace) ? `/** @const */
var ${namespace} = {}
` : ''
  return `${n}${blocks}`
}

const addSuppress = (line) => {
  const m = ` * @suppress {nonStandardJsDocs}
${line}`
  return m
}
