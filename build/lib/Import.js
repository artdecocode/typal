/**
 * The representation of a parsed import.
 */
               class Import {
  constructor() {
    /**
     * Store import's namespace which by default is equal to the from property.
     * @type {string}
     */
    this.ns = ''
    /**
     * The name of the imported type.
     * @type {string}
     */
    this.name = ''
    /**
     * The package name name from where to import.
     * @type {string}
     */
    this.from = ''
    /**
     * The description for documentation.
     * @type {?string}
     */
    this.desc = null
    /**
     * The link for documentation.
     * @type {?string}
     */
    this.link = null
  }
  fromXML({
    'name': name, 'from': from,
    'desc': desc, 'link': link,
    'ns': ns,
  }) {
    this.name = name
    this.from = from
    this.desc = desc
    this.link = link
    this.ns = ns || this.from
  }
  get fullName() {
    return `${this.ns}.${this.name}`
  }
  toTypedef(includeNamespace = true) {
    const n = includeNamespace ? this.fullName : this.name
    return ` * @typedef {import('${this.from}').${this.name}} ${n}`
  }
}

module.exports = Import