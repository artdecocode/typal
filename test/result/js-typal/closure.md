## generates both ns and non-ns types for Closure
/**
 * @param {ns.Conf} param
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */


/*@ conf */
{closure: true}
/*@*/

/*@ expected */
/**
 * @param {ns.Conf} param config
 * @param {string} param.propName The prop description.
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {ns.Conf} Conf config
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} ns.Conf config
 * @prop {string} propName The prop description.
 */

/*@*/