const { Replaceable } = require('restream');
const typedefJsRule = require('./typedef/rule');
const JSDocRule = require('./typedef/jsdoc');
const Type = require('./Type'); // eslint-disable-line

               class JSTypal extends Replaceable {
  constructor(conf = {}) {
    super([typedefJsRule, JSDocRule])
    this._types = {}

    this.on('types', typedefs => {
      this.addTypes(typedefs)
    })
    this.on('namespace', namespace => {
      this.addNamespace(namespace)
    })
    this.conf = conf
    /** @type {Array<string>} */
    this.namespaces = []
    this.LOG = console.log
  }
  /**
   * Add types emitted during typedefJsRule replacement.
   * @param {Array<Type>} typedefs
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
   * @type {Object.<string, Type>}
   */
  get types() {
    return this._types
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../lib/Type').default} Type
 */

module.exports = JSTypal