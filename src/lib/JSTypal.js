import { Replaceable } from 'restream'
import Type from './Type' // eslint-disable-line
import Import from './Import' // eslint-disable-line

export default class JSTypal extends Replaceable {
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
  static get Type() {
    return Type
  }
  static get Import() {
    return Import
  }
  /**
   * Add types emitted during typedefJsRule replacement.
   * @param {!Array<!Type|Import>} typedefs
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
   * @type {!Object.<string, !(Type|Import)>}
   */
  get types() {
    return this._types
  }
}