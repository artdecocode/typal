// processes types
/**
 * @param {StaticConfig} param
 */
var a = (param) => {}

/* typal test/fixture/types.xml */


/*@ expected */
/**
 * @param {StaticConfig} param Options to setup `koa-static`.
 * @param {string} param.root Root directory string.
 * @param {number} [param.maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @param {boolean} [param.hidden=false] Allow transfer of hidden files. Default `false`.
 */
var a = (param) => {}

/* typal test/fixture/types.xml */
/**
 * @typedef {import('http').ServerResponse} ServerResponse
 * @typedef {(s: ServerResponse) => void} SetHeaders Function to set custom headers on response.
 * @typedef {Object} StaticConfig Options to setup `koa-static`.
 * @prop {string} root Root directory string.
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 */

/*@*/

// suppresses JSDoc for Closure
/**
 * @param {Conf} param
 */
var a = (param) => {}

/* typal test/fixture/closure.xml */


/*@ conf */
{closure: true}
/*@*/

/*@ expected */
/**
 * @param {Conf} param config
 * @param {string} param.propName The prop description.
 */
var a = (param) => {}

/* typal test/fixture/closure.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Array<string>} Extra other type
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').Readable} fs.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').Writable} fs.Writable
 */

/*@*/

// updates the types
/**
 * @param {ConfUpdate} param config
 * @param {string} param.propName The prop description.
 */
var a = (param) => {}

/* typal test/fixture/closure-update.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Array<string>} Extra other type
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').Readable} fs.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').Writable} fs.Writable
 */


/*@ conf */
{closure: true}
/*@*/

/*@ expected */
/**
 * @param {ConfUpdate} param config-update
 * @param {string} param.propNameUpdate The prop description-update.
 */
var a = (param) => {}

/* typal test/fixture/closure-update.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} ConfUpdate config-update
 * @prop {string} propNameUpdate The prop description-update.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Array<boolean>} ExtraUpdate other type update
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').ReadableUpdate} fs.ReadableUpdate
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('fs').WritableUpdate} fs.WritableUpdate
 */

/*@*/