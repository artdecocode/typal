## generates extended type
/* typal test/temp/types.xml */


/*@ types */
<types namespace="_test">
  <type extends="_restream.Replaceable" name="Test" desc="The test.">
    <prop boolean opt name="bool">A prop.</prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
/**
 * @typedef {$Test & _restream.Replaceable} Test The test.
 * @typedef {Object} $Test The test.
 * @prop {boolean} [bool] A prop.
 */

/*@*/

## generates extended type for closure
/* typal test/temp/types.xml */


/*@ conf */
{closure:true}
/*@*/

/*@ types */
<types namespace="_test">
  <type extends="_restream.Replaceable" name="Test" desc="The test.">
    <prop boolean opt name="bool">A prop.</prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_test.Test} Test The test.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_test.$Test & _restream.Replaceable} _test.Test The test.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _test.$Test The test.
 * @prop {boolean} [bool] A prop.
 */

/*@*/