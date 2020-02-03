import { Transform } from 'stream'
import createRegexTransformStream from 'restream'
import mismatch from 'mismatch'
import { collect } from 'catchment'
import { getNameWithDefault } from './'
import { EOL } from 'os'

const getVal = (val) => {
  let v
  if (val == 'true') v = true
  else if (val == 'false') v = false
  else if (/^\d+$/.test(val)) v = parseInt(val, 10)
  return v !== undefined ? v : val
}

export const propExtractRe = /^ \* @prop {(.+?)} (\[)?(.+?)(?:=(["'])?(.+?)\4)?(?:])?(?: (.+?))?(?: Default `(.+?)`.)?$/gm
const propRe = / \* @prop(?:erty)? .+\r?\n/
const keys = ['type', 'opt', 'name', 'quote', 'defaultValue', 'description', 'Default']

const typedefRe = new RegExp(`^ \\* @typedef {(.+?)} (.+?)(?: (.+))?\\r?\\n((?:${propRe.source})*)`, 'gm')

const makeType = (type, name, description, properties) => {
  const hasProps = properties.length
  const tt = type && type != 'Object' ? ` type="${type}"` : ''
  const d = description ? ` desc="${description}"` : ''
  const i = ' '.repeat(2)
  const t = `${i}<type name="${name}"${tt}${d}${hasProps ? '' : ' /'}>${EOL}`
  return t
}

const makeP = (type, name, defaultValue, optional, description) => {
  const t = ['string', 'number', 'boolean'].includes(type) ? ` ${type}` : ` type="${type}"`
  const hasDefault = defaultValue !== undefined
  const def = hasDefault ? ` default="${defaultValue}"` : ''
  const o = (optional && !hasDefault) ? ' opt' : ''
  const i = ' '.repeat(4)
  const ii = ' '.repeat(6)
  const desc = description ? `>${EOL}${ii}${description}${EOL}${i}</prop>` : '/>'
  const p = `${i}<prop${o}${t} name="${name}"${def}${desc}${EOL}`
  return p
}

/**
 * Writes XML.
 */
class XML extends Transform {
  /** @suppress {checkTypes} */
  constructor() {
    super({
      writableObjectMode: true,
    })
  }
  _transform({ type, name, description, properties }, enc, next) {
    const t = type && type.startsWith('import')
      ? makeImport(type, name)
      : makeType(type, name, description, properties)
    this.push(t)
    properties.forEach(({ type: pType, name: pName, default: d, description: pDesc, optional }) => {
      const p = makeP(pType, pName, d, optional, pDesc)
      this.push(p)
    })
    if (properties.length) this.push(`  </type>${EOL}`)
    next()
  }
}

const makeImport = (type, name) => {
  const f = /import\((['"])(.+?)\1\)/.exec(type)
  if (!f) throw new Error(`Could not extract package from "${type}"`)
  const [,, from] = f
  const i = ' '.repeat(2)
  return `${i}<import name="${name}" from="${from}" />${EOL}`
}

/**
 * Parses properties from a RegExp stream.
 */
class Properties extends Transform {
  /** @suppress {checkTypes} */
  constructor() {
    super({
      objectMode: true,
    })
  }
  _transform([, type, name, description, props], _, next) {
    /** @type {Object.<string, Array<string>>} */
    const p = mismatch(
      propExtractRe,
      props,
      keys,
    )
    const properties = p.map(e => {
      const {
        'defaultValue': d, 'Default': D, 'opt': o,
        'name': n, 'type': t,
        ...rest
      } = e
      const pr = {
        ...rest,
        name: n,
        type: t,
        ...(d ? { defaultValue: getVal(d) } : {}),
        ...(D ? { Default: getVal(D) } : {}),
        ...(o ? { optional: true } : {}),
      }
      if (d || D) {
        if (!d) {
          const dn = getNameWithDefault(n, D, t)
          console.error('%s[%s] got from Default.', name, dn)
        } else if (d !== D && pr.Default !== undefined) {
          const dn = getNameWithDefault(n, D, t)
          console.error('%s[%s] does not match Default `%s`.', name, dn, pr.Default)
        }
        pr.default = 'defaultValue' in pr ? pr.defaultValue : pr.Default
        delete pr.defaultValue
        delete pr.Default
      }
      return pr
    })
    const o = {
      type, name, description, properties,
    }
    this.push(o)
    next()
  }
}

/**
 * Process a JavaScript file to extract typedefs and place them in an XML file.
 */
export default async function extractTypedef(input) {
  const ts = createRegexTransformStream(typedefRe)
  const ps = new Properties()
  const xml = new XML()

  ts.pipe(ps).pipe(xml)
  ts.end(input)

  ts.on('error', e => {
    console.error('Error in Transform')
    xml.emit('error', e)
  })
  ps.on('error', e => {
    console.error('Error in RegexTransform')
    xml.emit('error', e)
  })
  xml.on('error', e => {
    console.error('Error in XML')
    xml.emit('error', e)
  })

  const data = await collect(xml)
  const d = `<types>
  ${data.trim()}
</types>`
  return d
}