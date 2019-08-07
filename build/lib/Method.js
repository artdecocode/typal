const Type = require('./Type');

class Method extends Type {
  constructor() {
    super()
    /** @type {?string} */
    this._methodReturn = null
    /** @type {boolean} */
    this._async = false
  }
  get shouldPrototype() {
    return true
  }
  fromXML(content, { 'async': methodAsync, 'return': methodReturn,
    ...props
  }, ...args) {
    super.fromXML(content, props, ...args)
    if (methodReturn) this._methodReturn = methodReturn
    if (methodAsync) this._async = true
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
    if (this._methodReturn) lines.push(`${ws} * @return {${this.return}}`)

    return lines
  }
  /**
   * TypeScript-style type for typedefs.
   */
  getTypedefType() {
    return `(${
      this._args.map(({ name, type, optional }) => {
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

module.exports = Method