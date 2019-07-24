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

## skips ns declaration
/* typal test/temp/types.xml skipNsDecl */


/*@ types */
<types namespace="ns">
  <type name="Test">
    <prop type="error" closure="actual" name="prop"></prop>
  </type>
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml skipNsDecl */
/**
 * @typedef {{ prop: actual }}
 */
ns.Test

/*@*/