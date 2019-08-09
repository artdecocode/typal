import extractTags from 'rexml'
import Type from './Type'
import Method from './Method'
import Import from './Import'
import { trimD } from './'
import read from '@wrote/read'
import Arg, { extractArgs } from './Arg'
import Property from './Property'

/**
 * When Documentary compiles types with `-n` (root namespace) flag,
 * the namespace needs to be cleared.
 * @param {string} namespace
 * @param {!Type} type
 */
const removeNamespace = (namespace, type) => {
  const s = new RegExp(`([!?])?${namespace}\\.`, 'g')
  type.properties.forEach((p) => {
    p.clearNamespace(namespace, s)
  })
  type.clearNamespace(namespace)
}

/**
 * @param {Type} type
 * @param {string} [rootNamespace]
 */
const addConstructorProperty = (type, rootNamespace) => {
  if (!type.args || !type.args.length) return
  const args = type.args.map(({ type: at, optional }) => {
    if (optional !== null) return `${at}=`
    return at
  }).join(', ')
  const t = `function(${args}): ${type.fullName}`
  const prop = new Property(type.args)
  prop.isConstructor = true
  prop.fromXML('Constructor method.', { 'type': t, 'name': 'constructor' })
  prop.clearNamespace(rootNamespace)
  type.properties.unshift(prop)
}

/**
 * Parse the types.xml file.
 * @param {string} xml The content of the `xml` file.
 * @param {string} [rootNamespace] Namespace to ignore in types and properties.
 */
const parseFile = (xml, rootNamespace) => {
  const root = extractTags('types', xml)
  if (!root.length)
    throw new Error('XML file should contain root types element.')

  const [{ content: Root, props: {
    'namespace': ns1,
    'ns': namespace = ns1,
  } }] = root

  const ns = rootNamespace == namespace ? undefined : namespace

  const extracted = extractTags([
    'type', 'interface', 'constructor', 'method', 'import',
  ], Root)

  const imports = []
  const Imports = []

  const types = extracted.reduce((acc, { content, props, tag }) => {
    const { 'alias': alias, 'aliases': aliases, ...restProps } = props
    const als = alias ? [alias] : (aliases ? aliases.split(/, */) : [])

    switch (tag) {
    case 'type': {
      const type = new Type()
      type.fromXML(content, props, ns, rootNamespace)
      acc.push(type)

      als.forEach((name) => {
        const type2 = new Type()
        type2.fromXML(content, { ...restProps, name }, ns, rootNamespace)
        acc.push(type2)
      })
      break
    }
    case 'interface': {
      const t = parseTypes(content, props, ns, rootNamespace)
      t.forEach(tt => {
        addConstructorProperty(tt, rootNamespace)
        tt.isInterface = true
      })
      acc.push(...t)
      break
    }
    case 'constructor': {
      const t = parseTypes(content, props, ns, rootNamespace)
      t.forEach(tt => {
        addConstructorProperty(tt, rootNamespace)
        tt.isConstructor = true
      })
      acc.push(...t)
      break
    }
    case 'method': {
      const t = parseTypes(content, props, ns, rootNamespace, true)
      acc.push(...t)
      break
    }
    /**
     * Imports parsed into types.
     */
    case 'import': {
      const im = new Import()
      if (content) props['desc'] = trimD(content)
      im.fromXML(props)
      imports.push(im)

      const { name, from, desc, link, ns: importNs } = im

      const type = new Type()
      type.fromXML('', {
        name,
        type: `import('${from}').${name}`,
        noToc: true,
        import: true,
        desc,
        link,
      }, importNs == rootNamespace ? undefined : importNs)

      Imports.push(type)
      break
    }
    }
    return acc
  }, [])

  if (rootNamespace) types.forEach(t => removeNamespace(
    /** @type {string} */ (rootNamespace), t
  ))

  return { namespace, types, imports, Imports }
}

/**
 * This should be applicable only to <interface> / <constructor> / <method>
 * @param {string} content
 * @param {Object} props
 * @param {string} [ns]
 * @param {string} [rootNamespace]
 * @param {boolean} [isMethod]
 */
const parseType = (content, props, ns, rootNamespace, isMethod = false) => {
  const type = isMethod ? new Method() : new Type()
  const i = content.search(/<(prop|function|fn|static) /)
  let prebody = '', body = content
  if (i != 1) {
    prebody = content.slice(0, i)
    body = content.slice(i)
  }
  const { argsArgs } = extractArgs(prebody, rootNamespace)

  /** Specify args in props... disable ATM */
  // let { 'args': args = '', ...rest } = props
  // if (!args && argsArgs.length) {
  //   args = argsArgs.map(({ type: at, optional }) => {
  //     if (optional !== null) return `${at}=`
  //     return at
  //   }).join(',')
  // }
  // const assignment = `function(${args})`

  type.fromXML(body, props, ns, rootNamespace)
  type.setAssignment(argsArgs)

  return type
}

/** @type {function(new: Property)} */
const a = function () {}

/**
 * This is applicable to @interfaces/constructors/methods which
 * will be written with `= function () {}` in externs.
 * @param {string} content
 * @param {!Object} props
 * @param {string} [ns]
 * @param {string} [rootNamespace]
 * @param {boolean} [isMethod]
 */
const parseTypes = (content, props, ns, rootNamespace, isMethod = false) => {
  const acc = []
  const { 'alias': alias, 'aliases': aliases, ...restProps } = props
  const type = parseType(content, props, ns, rootNamespace, isMethod)
  acc.push(type)

  const als = alias ? [alias] : (aliases ? aliases.split(/, */) : [])

  als.forEach((name) => {
    const type2 = parseType(content, { ...restProps, name }, ns, rootNamespace, isMethod)
    type2.description = `${type2.description}${type2.description ? ' ' : ''}Alias of \`${restProps.name}\`.`
    acc.push(type2)
  })

  return acc
}

export default parseFile

/**
 * @param {string} path
 */
export const readTypesFile = async (path, ignore = []) => {
  const xml = await read(path)
  let { namespace = null, types, imports } = parseFile(xml)
  types = types.filter(({ fullName }) => {
    if (ignore.includes(fullName)) return false
    return true
  })
  imports = imports.filter(({ fullName }) => {
    if (ignore.includes(fullName)) return false
    return true
  })
  return { types, imports, namespace }
}