## processes types
/**
 * @param {StaticConfig} param
 */
const a = (param) => {}

/* typal test/fixture/types.xml */


/*@ expected */
/**
 * @param {StaticConfig} param Options to setup `koa-static`.
 * @param {string} param.root Root directory string.
 * @param {number} [param.maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @param {boolean} [param.hidden=false] Allow transfer of hidden files. Default `false`.
 */
const a = (param) => {}

/* typal test/fixture/types.xml */
/**
 * @typedef {import('http').ServerResponse} ServerResponse
 *
 * @typedef {(res: ServerResponse) => any} SetHeaders Function to set custom headers on response.
 *
 * @typedef {Object} StaticConfig Options to setup `koa-static`.
 * @prop {string} root Root directory string.
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 */

/*@*/