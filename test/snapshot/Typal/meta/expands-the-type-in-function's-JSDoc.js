import { resolve } from 'path'

/**
 * Configure the static middleware.
 * @param {StaticConfig} config Options to setup `koa-static`.
 * @param {string} config.root Root directory string.
 * @param {number} [config.maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @param {boolean} [config.hidden=false] Allow transfer of hidden files. Default `false`.
 */
function configure(config) {
  return resolve('test')
}

/* documentary test/fixture/types.xml */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
/**
 * @typedef {function(http.ServerResponse)} SetHeaders Function to set custom headers on response.
 */
/**
 * @typedef {Object} StaticConfig Options to setup `koa-static`.
 * @prop {string} root Root directory string.
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 */

export default configure