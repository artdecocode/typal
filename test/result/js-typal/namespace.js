// processes types with a namespace
/**
 * @param {ns.Conf} param
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */


/*@ expected */
/**
 * @param {ns.Conf} param config
 * @param {string} param.propName The prop description.
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */
/**
 * @typedef {ns.Conf} Conf config
 * @typedef {Object} ns.Conf config
 * @prop {string} propName The prop description.
 */

/*@*/