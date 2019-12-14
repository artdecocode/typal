import { Replaceable } from 'restream'
import Type from './Type' // eslint-disable-line

const re = /( *) \* @(fnType|methodType) {(.+?)}/gm

export default class Template extends Replaceable {
  /**
   * @param {!Array<!Type>} types
   */
  constructor(types, file) {
    super([
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
            const lines = type.toHeading(ws)
            return lines.join('\n')
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