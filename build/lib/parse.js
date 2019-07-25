const extractTags = require('rexml');
const Type = require('./Type');
const Import = require('./Import');
const { trimD } = require('./');

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
  const types = typeTags.map(({ content, props }) => {
    const type = new Type()
    type.fromXML(content, props, ns)
    if (rootNamespace) {
      const s = new RegExp(`([!?])?${rootNamespace}\\.`, 'g')
      type.properties.forEach((p) => {
        p.type = p.type.replace(s, '$1')
      })
      if (type.type) type.type = type.type.replace(s, '$1')
      if (type.extends) type.extends = type.extends.replace(s, '$1')
    }
    return type
  })

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

  return { namespace, types, imports, Imports }
}

module.exports=parseFile