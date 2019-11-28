## processes module
--nothing

/*@ program */
/**
 * @param {Conf} param
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */

/*@*/

/*@ expected */
# program.js

/**
 * @param {Conf} param config
 * @param {string} param.propName The prop description.
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */
/**
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */

/*@*/

## processes closure module
-c

/*@ program */
/**
 * @param {Conf} param
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */

/*@*/

/*@ expected */
# program.js

/**
 * @param {Conf} param config
 * @param {string} param.propName The prop description.
 */
const a = (param) => {}

/* typal test/fixture/conf.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */

/*@*/

## can read types from a file
-t test/fixture/conf.xml

/*@ program */
/**
 * @param {Conf} param
 */
const a = (param) => {}
/*@*/

/*@ expected */
# program.js

/**
 * @param {Conf} param config
 * @param {string} param.propName The prop description.
 */
const a = (param) => {}
/*@*/

## can read types from a dir
-t test/fixture/types-dir/conf.xml

/*@ program */
/**
 * @param {Conf} param
 */
const a = (param) => {}
/*@*/

/*@ expected */
# program.js

/**
 * @param {Conf} param config
 * @param {string} param.propName The prop description.
 */
const a = (param) => {}
/*@*/

## uses args from the tag
--nothing

/*@ program */
/* typal test/fixture/closure.xml closure noSuppress */

/*@*/

/*@ expected */
# program.js

/* typal test/fixture/closure.xml closure noSuppress */
/**
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */
/**
 * @typedef {Array<string>} Extra other type
 */
/**
 * @typedef {import('fs').Readable} fs.Readable
 */
/**
 * @typedef {import('fs').Writable} fs.Writable
 */

/*@*/

## ignores types
-c

/*@ program */
/* typal test/fixture/closure.xml noSuppress ignore:fs.Readable,Extra */

/*@*/

/*@ expected */
# program.js

/* typal test/fixture/closure.xml noSuppress ignore:fs.Readable,Extra */
/**
 * @typedef {Object} Conf config
 * @prop {string} propName The prop description.
 */
/**
 * @typedef {import('fs').Writable} fs.Writable
 */

/*@*/