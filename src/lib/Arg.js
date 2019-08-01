import extractTags from 'rexml'
import { trimD, getPropType } from './'

export default class Arg {
  constructor() {
    /** @type {?string} */
    this.name = null
    /** @type {string} */
    this.type = ''
    /** @type {?boolean} */
    this.optional = null
    /** @type {string} */
    this.description = ''
  }
  fromXML(content,
    { 'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number, 'type': type },
  ) {
    if (!name) throw new Error('Argument does not have a name.')
    this.name = name
    if (content) this.description = trimD(content)
    const t = getPropType({ number, string, boolean, type })
    this.type = t
    if (opt) this.optional = true
  }
}

/**
 * @param {string} content
 */
export const extractArgs = (content) => {
  let ai = content.lastIndexOf('</arg>')
  let newContent = content
  /** @type {!Array<!Arg>} */
  let argsArgs = []
  if (ai != -1) {
    ai = ai + '</arg>'.length
    const pre = content.slice(0, ai)
    newContent = content.slice(ai)
    argsArgs = extractTags('arg', pre)
    argsArgs = argsArgs.map(({ content: ac, props: ap }) => {
      const ar = new Arg()
      ar.fromXML(ac, ap)
      return ar
    })
  }
  return { newContent, argsArgs }
}