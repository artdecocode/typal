/* typal types/type.xml */
/** @const */
var typal = {}
/**
 * @typedef {{ name: string, type: string, description: (string|undefined), noToc: boolean, spread: boolean, noExpand: boolean, import: boolean, link: (string|undefined), properties: !Array<!typal.Property> }}
 */
typal.Type
/**
 * @typedef {{ name: string, description: (string|undefined), type: string, hasDefault: boolean, default: (string|undefined), optional: boolean }}
 */
typal.Property
