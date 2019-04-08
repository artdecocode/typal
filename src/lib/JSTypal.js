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
    this.conf = conf
  }
  /**
   * Add types emitted during typedefJsRule replacement.
   * @param {Type[]} typedefs
   */
  addTypes(typedefs) {
    const typedefsHash = typedefs.reduce((acc, typedef) => {
      return {
        ...acc,
        [typedef.name]: typedef,
      }
    }, {})
    this._types = {
      ...this._types,
      ...typedefsHash,
    }
  }
  /**
   * @type {Object.<string, Type>}
   */
  get types() {
    return this._types
  }
}