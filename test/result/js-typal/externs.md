## generates externs
/* typal test/fixture/types.xml */


/*@ conf */
{externs: true}
/*@*/

/*@ expected */
/* typal test/fixture/types.xml */
/**
 * @typedef {function(http.ServerResponse)}
 */
var SetHeaders
/**
 * @typedef {{ root: string, maxage: number, hidden: boolean }}
 */
var StaticConfig

/*@*/

## generates externs with closure types
/* typal test/temp/types.xml */


/*@ conf */
{externs: true}
/*@*/

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


/*@ conf */
{externs: true}
/*@*/

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