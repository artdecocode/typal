## generates constructors
<types>
  <type extends="_restream.Replaceable" constructor
    name="Test" desc="The test class.">
    <prop boolean name="bool">A prop.</prop>
    <prop string name="str" default="hello">B prop.</prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * The test class.
 * @extends {_restream.Replaceable}
 * @constructor
 */
var Test
/**
 * A prop.
 * @type {boolean}
 */
Test.prototype.bool
/**
 * B prop. Default `hello`.
 * @type {string|undefined}
 */
Test.prototype.str

/*@*/

## generates constructors with namespace
<types namespace="_test">
  <type name="Test" constructor>
    <prop boolean opt name="bool">A prop.</prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/** @const */
var _test = {}
/**
 * @constructor
 */
_test.Test
/**
 * A prop.
 * @type {boolean|undefined}
 */
_test.Test.prototype.bool

/*@*/

## generates records
<types>
  <type record name="Test">
    <prop opt type="function(): Promise" name="f">A prop.</prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @record
 */
var Test
/**
 * A prop.
 * @type {(function(): Promise)|undefined}
 */
Test.prototype.f = function() {}

/*@*/

## generates interfaces
<types>
  <type interface name="Test"/>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @interface
 */
var Test

/*@*/

## multiple extends
<types>
  <type extends="_restream.A,_restream.B" interface
    name="Test" desc="The test class.">
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * The test class.
 * @extends {_restream.A}
 * @extends {_restream.B}
 * @interface
 */
var Test

/*@*/