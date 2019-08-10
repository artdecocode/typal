import Type from './Type'
import { trimD } from './'

/**
 * @implements {_typal.Method}
 */
export default class Method extends Type {
  constructor() {
    super()
    /** @type {?string} */
    this._methodReturn = null
    /** @type {boolean} */
    this.async = false
  }
  get shouldPrototype() {
    return true
  }
  get isMethod() {
    return true
  }
  fromXML(content, { 'async': methodAsync, 'return': methodReturn,
    ...props
  }, ...args) {
    this.description = trimD(content)
    super.fromXML('', props, ...args)
    if (methodReturn) this._methodReturn = methodReturn.replace(/\n\s*/g, ' ')
    if (methodAsync) this.async = true
  }
  /**
   * If the `return` was set on type, this will return it.
   */
  get return() {
    return this._methodReturn || 'void'
  }
  /**
   * Same as type, but adds the return.
   */
  toHeading(ws = '') {
    const lines = super.toHeading(ws, false)
    let r
    if (this._methodReturn) r = this.return
    if (this.async && r) r = `Promise<${r}>`
    else if (this.async) r = 'Promise'
    if (r) lines.push(`${ws} * @return {${r}}`)

    return lines
  }
  /**
   * TypeScript-style type for typedefs.
   */
  getTypedefType() {
    return `(${
      this.args.map(({ name, type, optional }) => {
        return `${name}${optional ? '?' : ''}: ${type}`
        // return type + (optional ? '=' : '')
      }).join(', ')
    }) => ${this.return}`
  }
  clearNamespace(rootNamespace) {
    const s = super.clearNamespace(rootNamespace)
    if (this._methodReturn) this._methodReturn = this._methodReturn.replace(s, '$1')
  }
}