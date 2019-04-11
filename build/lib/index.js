/**
 * Return a name of a property with its default value, and surrounded by square brackets if default is given. If type is boolean or number, the default value is not surrounded by "".
 * @param {string} name Name of the property.
 * @param {?(string|boolean|number)} [defaultValue] Default of the property.
 * @param {string} [type] Type of the property.
 * @param {string} [parentParam] Name of the parent parameter.
 * @example
 *
 * requiredParam
 * [optionalDefaultParam=false]
 * [optionalDefaultParamString="test"]
 * [optionalParam]
 *
 * parentParam.requiredParam
 * [parentParam.optionalDefaultParam=false]
 * [parentParam.optionalDefaultParamString="test"]
 * [parentParam.optionalParam]
 */
       const getNameWithDefault = (name, defaultValue, type, parentParam) => {
  if (!name) throw new Error('The name of the property is not given')
  const n = `${parentParam ? `${parentParam}.` : ''}${name}`

  const hasDefault = defaultValue !== null
  if (!hasDefault) return n

  const isPrimitive = Number.isInteger(/** @type {number} */ (defaultValue))
    || defaultValue === true
    || defaultValue === false
    || ['number', 'boolean'].includes(type)
  const d = isPrimitive ? defaultValue : `"${defaultValue}"`
  const nn = `${n}=${d}`
  return nn
}

       const getPropType = ({ number, string, boolean, type }) => {
  if (string) return 'string'
  if (number) return 'number'
  if (boolean) return 'boolean'
  if (type) return type
  return '*'
}

// update this to match what documentary has
       const getLink = (title, prefix = '') => {
  const l = title
    .replace(/<\/?code>/g, '')
    .replace(/<\/?strong>/g, '')
    .replace(/<br\/>/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/[^\w-\d ]/g, '')
    .toLowerCase()
    .replace(/[, ]/g, '-')
  return `${prefix}-${l}`
}

       const makeBlock = (s) => {
  return `/**
${s}
 */
`
}

       const importToTypedef = (Import) => {
  return ` * @typedef {import('${Import.from}').${Import.name}} ${Import.from}.${Import.name}`
}

       const addSuppress = (line) => {
  const m = ` * @suppress {nonStandardJsDocs}
${line}`
  return m
}

module.exports.getNameWithDefault = getNameWithDefault
module.exports.getPropType = getPropType
module.exports.getLink = getLink
module.exports.makeBlock = makeBlock
module.exports.importToTypedef = importToTypedef
module.exports.addSuppress = addSuppress