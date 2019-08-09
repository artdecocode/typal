import Type from './Type'
import { trimD } from './'

/**
 * The representation of a parsed import.
 * @implements {_typal.Import}
 */
export default class Import extends Type {
  constructor() {
    super()
    /**
     * The package name name from where to import.
     * @type {string}
     */
    this.from = ''
  }
  get import() {
    return true
  }
  fromXML(content, {
    'from': from, 'name': name, ...props
  }, namespace, rootNamespace) {
    if (!from) throw new Error('From attribute of import is not given.')
    this.from = from
    this.description = trimD(content)

    super.fromXML('', {
      ...props, 'noToc': true, name,
      type: `import('${from}').${name}`,
    }, namespace != rootNamespace ? namespace : null)
  }
  toTypedef(includeNamespace = true) {
    const n = includeNamespace ? this.fullName : this.name
    return ` * @typedef {import('${this.from}').${this.name}} ${n}`
  }
}