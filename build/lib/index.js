/**
 * Return a name of a property with its default value, and surrounded by square brackets if default is given. If type is boolean or number, the default value is not surrounded by "".
 * @param {string} name Name of the property.
 * @param {*} defaultValue Default of the property.
 * @param {string} type Type of the property.
 * @param {string} parentParam Name of the parent parameter.
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
  const n = `${parentParam ? `${parentParam}.` : ''}${name}`

  const hasDefault = defaultValue !== undefined
  if (!hasDefault) return n

  const isPrimitive = Number.isInteger(defaultValue)
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

module.exports.getNameWithDefault = getNameWithDefault
module.exports.getPropType = getPropType
module.exports.getLink = getLink
//# sourceMappingURL=index.js.map