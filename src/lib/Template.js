import { EOL } from 'os'
import { Replaceable } from 'restream'
import Type from './Type' // eslint-disable-line
import Fn from './Fn'
import { indentWithAster } from './Property'

const re = /( *) \* @(fnType|methodType) {(.+?)}/gm

const makeMethod = (jsdoc, Static, Async, name, args, ext, realName = name) => {
  const call = `${Static ? ext : 'super'}.${realName}`
  const s = `/**
${jsdoc}
 */
${Static ? 'static ' : ''}${Async ? 'async ' : ''}${name}(${args}) {
  return ${call}(${args})
}`
  return s
}

export default class Template extends Replaceable {
  /**
   * @param {!Array<!Type>} types
   */
  constructor(types, file) {
    super([
      {
        re: /\/\*\*\s+( *) \* @constructor {(.+?)}[\s\S]+?(class\s+.+?\s+extends\s+(.+?)\s*){\s*}/gm,
        replacement(match, ws, n, cl, ext) {
          const type = types.find(({ fullName }) => fullName == n)
          if (!type) {
            console.error('Type %s in %s not found', n, file)
            return match
          }
          const fns = /** @type {!Array<!Fn>} */ (type.properties.filter((prop) => {
            return prop instanceof Fn && !prop.isConstructor
          }))
          const tt = fns.map((prop) => {
            const { name, aliases, static: Static, async: Async } = prop
            let jsdoc = prop.toExtern('', true)
            jsdoc = removeReturnFromJsDoc(jsdoc, n)
            const args = prop.args.map(({ name: argName }) => argName)
            const ja = args.join(', ')
            const s = makeMethod(jsdoc, Static, Async, name, ja, ext)
            const t = aliases.map((al) => {
              const alJsdoc = jsdoc + `${EOL} * @alias ${name} An alias for **${name}**.`
              return makeMethod(alJsdoc, Static, Async, al, ja, ext, name)
            })
            const strings = [s, ...t]
            return strings.join(EOL)
          })
          const constr = type.properties.find((prop) => {
            return prop instanceof Fn && prop.isConstructor
          })
          const constrArgs = constr.args.map(({ name }) => name).join(', ')
          const c = `/**
${removeReturnFromJsDoc(constr.toExtern('', true), n)}
 */
constructor(${constrArgs}) {
  super(${constrArgs})
}`
          const s = [c, ...tt].join(EOL).replace(/^/gm, '  ')
          let res = `${cl}{
${s}
}`
          if (type.description) {
            res = `/**
${indentWithAster(type.description)}
 */${EOL}` + res
          }
          return res
        },
      },
      {
        re,
        async replacement(match, ws, tag, propName) {
          const p = propName.split('.')
          let n, pr
          if (tag == 'methodType') {
            n = propName
          } else if (p.length == 2) {
            ([n, pr] = p)
          } else if (p.length == 3) {
            n = `${p[0]}.${p[1]}`
            pr = p[2]
          } else {
            throw new Error('The @fnType should consist of _namespace.Type.propName or Type.propName')
          }
          const type = types.find(({ fullName }) => fullName == n)
          // also print line:col location
          if (!type) {
            console.error('Type %s in %s not found', n, file)
            return match
          }
          if (pr == 'constructor' || tag == 'methodType') {
            const lines = type.toHeading(ws, false, true)
            return lines.join(EOL)
          }
          const fn = type.properties.find(({ name }) => {
            return name == pr
          })
          if (!fn) {
            console.error('Property %s of type %s in %s not found', pr, n, file)
            return match
          }
          if (!fn.parsed) {
            console.error('Property %s of type %s in %s wasn\'t parsed, possibly parser bug.', pr, n, file)
            return match
          }
          const lines = fn.toExtern(ws, true)
          return lines
        },
      },
    ])
    // this.types = types
  }
}

const removeReturnFromJsDoc = (jsdoc, type) => {
  return jsdoc
    .replace(`${EOL} * @return {${type}}`, '')
    .replace(`${EOL} * @return {!${type}}`, '')
    .replace(`${EOL} * @return {?${type}}`, '')
}