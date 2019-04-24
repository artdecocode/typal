{externs: true}

## generates externs
/* typal test/fixture/types.xml */


/*@ expected */
/* typal test/fixture/types.xml */
/**
 * Function to set custom headers on response.
 * @typedef {function(http.ServerResponse)}
 */
var SetHeaders
/**
 * Options to setup `koa-static`.
 * @typedef {{ root: string, maxage: (number|undefined), hidden: (boolean|undefined) }}
 */
var StaticConfig

/*@*/

## generates externs with closure types
/* typal test/temp/types.xml */


/*@ types */
<types>
  <type name="Test">
    <prop type="error" closure="actual" name="prop"></prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
/**
 * @typedef {{ prop: actual }}
 */
var Test

/*@*/

## does not duplicate namespaces
/* typal test/temp/types.xml */

/* typal test/temp/types.xml */


/*@ types */
<types namespace="ns">
  <type name="Test">
    <prop type="error" closure="actual" name="prop"></prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
/** @const */
var ns = {}
/**
 * @typedef {{ prop: actual }}
 */
ns.Test

/* typal test/temp/types.xml */
/**
 * @typedef {{ prop: actual }}
 */
ns.Test

/*@*/

## generates correct undefined
/* typal test/temp/types.xml */


/*@ types */
<types>
  <type name="Test">
    <prop boolean opt name="bool">A prop</prop>
    <prop string name="str" default="hello">B prop</prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
/**
 * @typedef {{ bool: (boolean|undefined), str: (string|undefined) }}
 */
var Test

/*@*/

## generates constructors
/* typal test/temp/types.xml */


/*@ types */
<types>
  <type extends="_restream.Replaceable" constructor
    name="Test" desc="The test class.">
    <prop boolean name="bool">A prop.</prop>
    <prop string name="str" default="hello">B prop.</prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
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
 * @type {(string|undefined)}
 */
Test.prototype.str

/*@*/

## generates constructors with namespace
/* typal test/temp/types.xml */


/*@ types */
<types namespace="_test">
  <type name="Test" constructor>
    <prop boolean opt name="bool">A prop.</prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml */
/** @const */
var _test = {}
/**
 * @constructor
 */
_test.Test
/**
 * A prop.
 * @type {(boolean|undefined)}
 */
_test.Test.prototype.bool

/*@*/