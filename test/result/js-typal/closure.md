```s
TODO FOR ZOROASTER:
ALLOW TO SPECIFY SINGLE CONFIG AT THE TOP BEFORE TESTS
```

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

## generates closure types
/**
 * @param {ns.Test} param
 */
var a = (param) => {}

/* typal test/temp/types.xml */


/*@ conf */
{closure: true}
/*@*/

/*@ types */
<types namespace="ns">
  <type name="Test" desc="test">
    <prop type="(i: number) => string" closure="function(number): string" name="prop">
      The property.
    </prop>
  </type>
</types>
/*@*/

/*@ expected */
/**
 * @param {ns.Test} param test
 * @param {function(number): string} param.prop The property.
 */
var a = (param) => {}

/* typal test/temp/types.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {ns.Test} Test test
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} ns.Test test
 * @prop {function(number): string} prop The property.
 */

/*@*/

## generates imports
/**
 * @param {stream.Readable} readable
 */
var a = (param) => {}

/* typal test/temp/types.xml */


/*@ conf */
{closure: true}
/*@*/

/*@ types */
<types namespace="ns">
  <import from="stream" name="Readable" />
</types>
/*@*/

/*@ expected */
/**
 * @param {stream.Readable} readable
 */
var a = (param) => {}

/* typal test/temp/types.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */

/*@*/