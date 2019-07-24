## creates aliases in interface
<types>
  <type interface name="Test">
    <prop name="test" alias="test1">the test</prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @interface
 */
var Test
/**
 * the test
 * @type {*}
 */
Test.prototype.test
/**
 * An alias for `test`.
 * @type {*}
 */
Test.prototype.test1

/*@*/

## creates aliases in spread
<types>
  <type name="Test">
    <prop name="test" alias="test1">the test</prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @typedef {{ test: *, test1: * }}
 */
var Test

/*@*/