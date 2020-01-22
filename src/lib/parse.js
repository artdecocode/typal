import extractTags from 'rexml'
import Type from './Type'
import Method from './Method'
import Import from './Import'
import read from '@wrote/read'
import Arg, { extractArgs } from './Arg' // eslint-disable-line
import { toType, updateExampleProp } from './'
import Fn from './Fn'

/**
 * When Documentary compiles types with `-n` (root namespace) flag,
 * the namespace needs to be cleared.
 * @param {string} namespace
 * @param {!_typal.Type} type
 */
const removeNamespace = (namespace, type) => {
  const s = new RegExp(`([!?])?${namespace}\\.`, 'g')
  type.properties.forEach((p) => {
    p.clearNamespace(namespace, s)
  })
  type.clearNamespace(namespace)
}

/**
 * This is used when constructor method is not specified.
 * @deprecated
 * @param {Type} type
 * @param {string} [rootNamespace]
 */
const addConstructorProperty = (type, rootNamespace) => {
  const { args: Args = [] } = type
  const args = Args.map(({ fullType }) => fullType).join(', ')
  let ne = `new: ${type.fullName}`
  if (args.length) ne = `${ne}, `
  const t = `function(${ne}${args})`
  const prop = new Fn(Args)
  prop.isConstructor = true
  prop.fromXML('Constructor method.', {
    'type': t, 'name': 'constructor',
  })
  prop.examples = type.examples
  prop.clearNamespace(rootNamespace)
  type.properties.unshift(prop)
}

/**
 * Parse the types.xml file.
 * @param {string} xml The content of the `xml` file.
 * @param {string} [rootNamespace] Namespace to ignore in types and properties.
 * @param {string|null} [location] The file location. Will be used to update relative example locations.
 */
const parseFile = (xml, rootNamespace, location = null) => {
  const root = extractTags('types', xml)
  if (!root.length)
    throw new Error('XML file should contain root types element.')

  const [{ content: Root, props: {
    'namespace': ns1,
    'ns': namespace = ns1,
  } }] = root

  const ns = rootNamespace == namespace ? undefined : namespace

  const embeds = extractTags([
    'embed',
  ], Root).map(({ props }) => props)

  const extracted = extractTags([
    'type', 'interface', 'constructor', 'method', 'import',
    'record',
  ], Root)

  /** @type {!Array<!_typal.Import>} */
  const imports = []

  const types = /** @type {!Array<!_typal.Type>} */ (extracted.reduce((acc, { content, props, tag }) => {
    if (tag == 'record') {
      tag = 'type'
      props['record'] = true
    }
    const { 'alias': alias, 'aliases': aliases, ...restProps } = props
    if (location) updateExampleProp(restProps, location)
    const als = alias ? [alias] : (aliases ? aliases.split(/, */) : [])

    switch (tag) {
    case 'type': {
      const type = new Type()
      if (location) type.file = location
      type.fromXML(content, props, ns, rootNamespace)
      acc.push(type)

      als.forEach((name) => {
        const type2 = new Type()
        if (location) type2.file = location
        type2.fromXML(content, { ...restProps, name }, ns, rootNamespace)
        acc.push(type2)
      })
      break
    }
    case 'interface': {
      const t = parseTypes({ content, props, ns, rootNamespace, location })
      t.forEach(tt => {
        const hasConsructorProp = tt.properties.some(({ isConstructor }) => {
          return isConstructor
        })
        if (!hasConsructorProp) addConstructorProperty(tt, rootNamespace)
        tt.isInterface = true
      })
      acc.push(...t)
      break
    }
    case 'constructor': {
      const t = parseTypes({ content, props, ns, rootNamespace, location })
      t.forEach(tt => {
        const hasConsructorProp = tt.properties.some(({ isConstructor }) => {
          return isConstructor
        })
        if (!hasConsructorProp) addConstructorProperty(tt, rootNamespace)
        tt.isConstructor = true
      })
      acc.push(...t)
      break
    }
    case 'method': {
      const t = parseTypes({
        content, props, ns, rootNamespace, isMethod: true, location,
      })
      acc.push(...t)
      break
    }
    /**
     * Imports parsed into types.
     */
    case 'import': {
      const im = new Import()
      im.fromXML(content, props, props['ns'] || props['from'], rootNamespace)
      imports.push(im)

      break
    }
    }
    return acc
  }, []))

  if (rootNamespace) types.forEach(t => removeNamespace(
    /** @type {string} */ (rootNamespace), t
  ))

  return { namespace, types, imports, embeds }
}

/**
 * This should be applicable only to <interface> / <constructor> / <method>
 * @param {string} content
 * @param {!Object} props
 * @param {string} [ns]
 * @param {string} [rootNamespace]
 * @param {boolean} [isMethod]
 * @param {string|null} [location] The source XML file location.
 */
const parseType = (content, props, ns, rootNamespace, isMethod = false, location = null) => {
  const type = isMethod ? new Method() : new Type()
  type.file = location
  const i = content.search(/<(prop|function|fn|static) /)
  let prebody = '', body = content
  if (i != 1) {
    prebody = content.slice(0, i)
    body = content.slice(i)
  }
  const { argsArgs, newContent } = extractArgs(prebody, rootNamespace)

  /** Specify args in props... disable ATM */
  // let { 'args': args = '', ...rest } = props
  // if (!args && argsArgs.length) {
  //   args = argsArgs.map(({ type: at, optional }) => {
  //     if (optional !== null) return `${at}=`
  //     return at
  //   }).join(',')
  // }
  // const assignment = `function(${args})`

  type.fromXML(isMethod ? newContent : body, props, ns, rootNamespace)

  const { fnType } = toType(props, argsArgs)
  if (isMethod) type.closureType = fnType

  if (!type.args) type.setAssignment(argsArgs)

  return type
}

/**
 * This is applicable to @interfaces/constructors/methods which
 * will be written with `= function () {}` in externs.
 * @param {Object} props
 * @param {string} props.content
 * @param {!Object} props.props
 * @param {string} [props.ns]
 * @param {string} [props.rootNamespace]
 * @param {boolean} [props.isMethod]
 * @param {string|null} [props.location]
 */
const parseTypes = ({
  content, props, ns, rootNamespace, isMethod = false, location = null,
}) => {
  const acc = []
  const { 'alias': alias, 'aliases': aliases, ...restProps } = props
  const type = parseType(content, props, ns, rootNamespace, isMethod, location)
  acc.push(type)

  const als = alias ? [alias] : (aliases ? aliases.split(/, */) : [])

  als.forEach((name) => {
    const type2 = parseType(content, { ...restProps, name }, ns, rootNamespace, isMethod, location)
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
  let namespace, types, imports, embeds
  try {
    ({ namespace = null, types, imports, embeds } = parseFile(xml, undefined, path))
  } catch (err) {
    err.message = `Error while reading ${path}\n${err.message}`
    throw err
  }
  types = types.filter(({ fullName }) => {
    if (ignore.includes(fullName)) return false
    return true
  })
  imports = imports.filter(({ fullName }) => {
    if (ignore.includes(fullName)) return false
    return true
  })
  return { types, imports, namespace, embeds }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Type} _typal.Type
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Import} _typal.Import
 */