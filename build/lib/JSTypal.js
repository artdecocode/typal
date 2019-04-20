const { Replaceable } = require('restream');
const Type = require('./Type'); // eslint-disable-line

               class JSTypal extends Replaceable {
  constructor(rules, conf = {}) {
    super(rules)
    this._types = {}

    this.on('types', typedefs => {
      this.addTypes(typedefs)
    })
    this.on('namespace', namespace => {
      this.addNamespace(namespace)
    })
    /** @type {{ closure: boolean, externs: boolean }} */
    this.conf = conf
    /** @type {!Array<string>} */
    this.namespaces = []
    this.LOG = console.log
  }
  /**
   * Add types emitted during typedefJsRule replacement.
   * @param {!Array<!Type>} typedefs
   */
  addTypes(typedefs) {
    const typedefsHash = typedefs.reduce((acc, typedef) => {
      return {
        ...acc,
        [typedef.fullName]: typedef,
      }
    }, {})
    this._types = {
      ...this._types,
      ...typedefsHash,
    }
  }
  /**
   * @param {string} namespace
   */
  addNamespace(namespace) {
    if (!this.namespaces.includes(namespace))
      this.namespaces.push(namespace)
  }
  /**
   * @type {!Object.<string, !Type>}
   */
  get types() {
    return this._types
  }
}

module.exports = JSTypal