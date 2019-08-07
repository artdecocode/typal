const extractTags = require('rexml');
const Type = require('./Type');
const Method = require('./Method');
const Import = require('./Import');
const { trimD } = require('./');
let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;
const { extractArgs } = require('./Arg');

/**
 * When Documentary compiles types with `-n` (root namespace) flag,
 * the namespace needs to be cleared.
 * @param {string} namespace
 * @param {!Type} type
 */
const removeNamespace = (namespace, type) => {
  const s = new RegExp(`([!?])?${namespace}\\.`, 'g')
  type.properties.forEach((p) => {
    p.type = p.type.replace(s, '$1')
  })
  type.clearNamespace(namespace)
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

  const typeTags = extractTags('type', Root)
  const types = typeTags.reduce((acc, { content, props }) => {
    const { 'alias': alias, 'aliases': aliases, ...restProps } = props
    const type = new Type()
    type.fromXML(content, props, ns, rootNamespace)
    acc.push(type)

    const als = alias ? [alias] : (aliases ? aliases.split(/, */) : [])

    als.forEach((name) => {
      const type2 = new Type()
      type2.fromXML(content, { ...restProps, name }, ns, rootNamespace)
      acc.push(type2)
    })
    return acc
  }, [])

  const interfaceTags = extractTags('interface', Root)
  const interfaces = interfaceTags.reduce((acc, { content, props }) => {
    const t = parseTypes(content, props, ns)
    t.forEach(tt => {
      tt.isInterface = true
    })
    acc.push(...t)
    return acc
  }, [])

  const constructorTags = extractTags('constructor', Root)
  const constructors = constructorTags.reduce((acc, { content, props }) => {
    const t = parseTypes(content, props, ns)
    t.forEach(tt => {
      tt.isConstructor = true
    })
    acc.push(...t)
    return acc
  }, [])

  const methodTags = extractTags('method', Root)
  const methods = methodTags.reduce((acc, { content, props }) => {
    const t = parseTypes(content, props, ns, rootNamespace, true)
    acc.push(...t)
    return acc
  }, [])

  let allTypes = [...types, ...interfaces, ...constructors, ...methods]
  if (rootNamespace) allTypes.forEach(t => removeNamespace(
    /** @type {string} */ (rootNamespace), t
  ))

  const imports = extractTags('import', Root)
    .map(({ props, content }) => {
      const im = new Import()
      if (content) props['desc'] = trimD(content)
      im.fromXML(props)
      return im
    })

  /**
   * Imports parsed into types.
   */
  const Imports = imports
    .map(({ name, from, desc, link, ns: importNs }) => {
      const type = new Type()
      type.fromXML('', {
        name,
        type: `import('${from}').${name}`,
        noToc: true,
        import: true,
        desc,
        link,
      }, importNs == rootNamespace ? undefined : importNs)
      return type
    })

  return { namespace, types: allTypes, imports, Imports }
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

  type.fromXML(body, props, ns)
  type.setAssignment(argsArgs)

  return type
}

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

module.exports=parseFile

/**
 * @param {string} path
 */
const readTypesFile = async (path, ignore = []) => {
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

module.exports.readTypesFile = readTypesFile