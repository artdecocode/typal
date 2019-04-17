/**
 * @typedef {import('koa-multer').StorageEngine} StorageEngine
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('koa-multer').File} File
 */

/**
 * @typedef {Object} Example An example type.
 * @typedef {Object} SessionConfig Description of Session Config.
 * @prop {string} key The cookie key.
 * @prop {number|'session'} [maxAge=86400000] maxAge in ms. Default is 1 day.
 * @prop {boolean} [overwrite] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly] httpOnly or not or not. Default `true`.
 * @prop {boolean} [signed=false] Signed or not. Default `false`.
 * @prop {boolean} [rolling] Force a session identifier cookie to be set.
 * @prop {boolean} [renew] Renew session when session is nearly expired.
 */