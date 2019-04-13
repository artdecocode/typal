// processes types with a namespace
/**
 * @param {Conf} param
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */


/*@ expected */
/**
 * @param {Conf} param config
 * @param {string} param.propName The prop description.
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */
/**
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */

/*@*/