## processes directory
--nothing

/*@ program */
/**
 * @param {!Conf} param
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */

/*@*/

/*@ expected */
# program.js

/**
 * @param {!Conf} param config
 * @param {string} param.propName The prop description.
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */
/**
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */


# program2.js

/**
 * @param {!Conf} param config
 * @param {string} param.propName The prop description.
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */
/**
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */

/*@*/