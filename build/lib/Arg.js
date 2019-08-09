// import parse from '@typedefs/parser'
const extractTags = require('rexml');
const { trimD, getPropType } = require('./');

class Arg {
  constructor() {
    /** @type {?string} */
    this.name = null
    /** @type {string} */
    this.type = ''
    /** @type {boolean} */
    this.optional = false
    /** @type {string} */
    this.description = ''

    // /**
    //  * Shows if this argument indicates the constructor type, e.g.,
    //  * function(new: Example)
    //  */
    // this.isNew = false
  }
  fromXML(content,
    { 'name': name, 'string': string, 'boolean': boolean, 'opt': opt, 'number': number, 'type': type },
    rootNamespace) {
    if (!name) throw new Error('Argument does not have a name.')
    this.name = name
    if (content) this.description = trimD(content)
    let t = getPropType({ number, string, boolean, type })
    if (rootNamespace) {
      const s = new RegExp(`([!?])?${rootNamespace}\\.`, 'g')
      t = t.replace(s, '$1')
    }
    if (t.endsWith('=')) {
      t = t.replace(/=$/, '')
      opt = true
    }
    this.type = t
    if (opt) this.optional = true
    // if (name.startsWith('...')) this.optional = true
    // /**
    //  * @type {_typedefsParser.Type}
    //  */
    // this.parsed = null
    // try {
    //   this.parsed = parse(this.closureType)
    // } catch (err) { /* ok */
    // }
  }
  get fullType() {
    if (this.optional) return `${this.type}=`
    return this.type
  }
  // get isParsedFunction() {
  //   return this.parsed && this.parsed.name == 'function'
  // }
  // toTypescriptType() {
  //   if (this.isParsedFunction) {
  //     const { function: { args, return: ret } } = this.parsed
  //     return `(${
  //       args.map(({ name, type, optional }) => {
  //         return `${name}${optional ? '?' : ''}: ${type}`
  //         // return type + (optional ? '=' : '')
  //       }).join(', ')
  //     }) => ${ret}`
  //   }
  //   return this.type
  // }
}

// /**
//  * @param {_typedefsParser.Type} type
//  */
// const typeToTypescript = (type) => {
//   const { function,   } = type
//   return `(${
//     args.map(({ name, type, optional }) => {
//       return `${name}${optional ? '?' : ''}: ${type}`
//       // return type + (optional ? '=' : '')
//     }).join(', ')
//   }) => ${ret}`
// }

/**
 * @param {string} content
 * @param {?string} [rootNamespace] The namespace to omit.
 */
const extractArgs = (content, rootNamespace) => {
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
      ar.fromXML(ac, ap, rootNamespace)
      return ar
    })
  }
  return { newContent, argsArgs }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 */

module.exports = Arg
module.exports.extractArgs = extractArgs