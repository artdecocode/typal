import { getLinks } from './get-links'

/**
 * @param {!_typal.Type} type The type for which to make the table
 * @param {!Array<!_typal.Property>} [props]
 * @param {!Array<!_typal.Type>} [allTypes]
 * @param {!_typal.ToMarkdownOptions} [opts]
 */
export default function makePropsTable (type, props = [], allTypes = [], opts = {}) {
  const { narrow = false, flatten = false, preprocessDesc, link } = opts
  if (!props.length) return ''
  const constr = type.isConstructor || type.isInterface
  const anyHaveDefault = props.some(({ hasDefault }) => hasDefault)

  const linkOptions = /** @type {!_typal.LinkingOptions} */ ({
    flatten,
    escapePipe: !narrow,
    link,
  })
  const links = (s) => getLinks(/** @type {!Array<!_typal.Type>} */ (allTypes), s, linkOptions)
  const ps = props.map((prop) => {
    let typeName
    if (prop.args && prop.isParsedFunction) {
      typeName = prop.toTypeScriptFunction(links)
      if (prop.isConstructor) typeName = `new ${typeName}`
    } else
      typeName = links(prop.parsed || prop.type)
    // constructors and interfaces will always have to initialise properties
    // their `this` properties in the constructor.
    const name = (constr || prop.optional) ? prop.name : `${prop.name}*`
    const d = !prop.hasDefault ? '-' : `\`${prop.default}\``
    const de = preprocessDesc ? preprocessDesc(prop.description) : prop.description
    return {
      prop,
      typeName,
      name,
      de: esc(de, !narrow),
      d,
    }
  })
  if (narrow) { // narrow is the newer API for Documentary
    return { props: ps, anyHaveDefault, constr }
  }
  const ar = ps.map(({
    name, typeName, de, d, prop,
  }) => {
    const n = prop.optional ? name : `__${name}__`
    return [n, `<em>${typeName}</em>`, de, ...(anyHaveDefault ? [d] : [])]
  })

  const h = ['Name',
    ...(narrow ? ['Type & Description'] : ['Type', 'Description']),
    ...(anyHaveDefault ? [constr ? 'Initial' : 'Default'] : [])]

  const j = JSON.stringify([h, ...ar], null, 2)
  return `

\`\`\`table
${j}
\`\`\``
}

const esc = (s = '', escapePipe = true) => {
  if (s === null) s = ''
  if (escapePipe) {
    s = s.replace(/\|/g, '\\|')
  }
  return s
    .replace(/</g, '&lt;')
    .replace(/>/, '&gt;')
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Type} _typal.Type
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Property} _typal.Property
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').ToMarkdownOptions} _typal.ToMarkdownOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').LinkingOptions} _typal.LinkingOptions
 */
