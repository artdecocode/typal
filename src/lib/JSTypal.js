import { Replaceable } from 'restream'
import typedefJsRule from './typedef/rule'
import JSDocRule from './typedef/jsdoc'

export default class JSTypal extends Replaceable {
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