/* documentary test/fixture/types.xml */
/**
 * @typedef {import('http').ServerResponse} ServerResponse
 * @typedef {(s: ServerResponse) => void} SetHeaders Function to set custom headers on response.
 * @typedef {Object} StaticConfig Options to setup `koa-static`.
 * @prop {string} root Root directory string.
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 */

/**
 * @typedef {Object} TypeDef Existing typedef.
 * @prop {string} [test=true] If test or not.
 */

export default test