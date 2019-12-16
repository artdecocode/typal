/**
 * Return a name of a property with its default value, and surrounded by square brackets if default is given. If type is boolean or number, the default value is not surrounded by "".
 * @param {string} name Name of the param.
 * @param {?(string|boolean|number)} [defaultValue] Default of the property.
 * @param {string} [type] Type of the param.
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
export const getNameWithDefault = (name, defaultValue, type, parentParam) => {
  if (!name) throw new Error('The name of the property is not given')
  const n = `${parentParam ? `${parentParam}.` : ''}${name}`

  const hasDefault = defaultValue !== null
  if (!hasDefault) return n

  const isPrimitive = Number.isInteger(/** @type {number} */ (defaultValue))
    || [true, false, 'null'].includes(defaultValue)
    || ['number', 'boolean'].includes(type)
  const d = isPrimitive ? defaultValue : `"${defaultValue}"`
  const nn = `${n}=${d}`
  return nn
}

export const getPropType = ({ number, string, boolean, type }) => {
  if (string) return 'string'
  if (number) return 'number'
  if (boolean) return 'boolean'
  if (type) return type
  return '*'
}

// update this to match what documentary has
export const getLink = (title, prefix = '') => {
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

/**
 * Prevent incorrect undefined ending.
 * @param {string} type
 */
export const makeOptional = (type) => {
  let t
  if (/[^\w\d._]/.test(type)) t = `(${type})`
  else t = type
  return `${t}|undefined`
}

export const makeBlock = (s) => {
  if (!s) return `/**
 */
`
  return `/**
${s}
 */
`
}

export const addSuppress = (line) => {
  const m = ` * @suppress {nonStandardJsDocs}
${line}`
  return m
}

/**
 * @param {?string} namespace
 * @param {string} name
 * @param {?string} [constr] The signature of the constructor for constructors and interfaces.
 */
export const getExternDeclaration = (namespace, name, constr) => {
  const ns = namespace ? `${namespace}.` : ''
  const v = namespace ? '' : 'var '
  let res = `${v}${ns}${name}`
  if (constr) res = res + ` = ${constr}`
  return res
}

/**
 * @param {string} d
 */
export const trimD = d => {
  d = d.trimRight()

  const m = /\S/.exec(d)
  if (!m) return d
  const i = m.index

  if (i == 0) return d
  const s = d.substr(0, i)
  let n = s.lastIndexOf('\n')
  // remove everything before first /n
  if (n == -1) n = 0
  else {
    n++
    d = d.substr(n)
  }
  const ws = i - n
  const w = ' '.repeat(ws)
  const dd = d.split('\n')
  const a = dd.filter(b => /\S/.test(b))
  const notWithSpace = a.find(b => {
    const res = !b.startsWith(w)
    return res
  })
  if (!notWithSpace) {
    const re = new RegExp(`^ {${ws}}`)
    return dd.map(b => b.replace(re, '')).join('\n')
  } else return d.trim()
}

/**
 * Converts properties into a function type.
 * @param {!Object} props
 */
export const toType = (props, argsArgs, fullName = null) => {
  const {
    'async': async, 'void': Void, 'return': ret = Void ? 'void' : '',
    ...rest
  } = props
  let { 'args': args = '' } = props

  if (!args) {
    args = argsArgs.map(({ fullType, name: n }) => {
      if (n == 'this') return `${n}: ${fullType}`
      if (n.startsWith('...')) return `...${fullType}`
      return fullType
    }).join(',')
  }

  let r = ret.replace(/\n\s*/g, ' ')
  if (async && r) r = `!Promise<${r}>`
  else if (async) r = '!Promise'
  if (!r && rest.name == 'constructor' && fullName) r = fullName
  // generate function string which will be parsed
  // a hack to convert args into _typedefParser.Type
  let fnType = `function(${args})`
  if (r) fnType += `: ${r}`
  return { rest: { ...rest, async }, fnType }
}
