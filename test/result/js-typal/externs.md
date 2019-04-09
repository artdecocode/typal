## generates externs
/* typal test/fixture/types.xml */


/*@ conf */
{externs: true}
/*@*/

/*@ expected */
/* typal test/fixture/types.xml */
/**
 * @typedef {function(ServerResponse)}
 */
var SetHeaders
/**
 * @typedef {{ root: string, maxage: number, hidden: boolean }}
 */
var StaticConfig
/**
 * @typedef {http.ServerResponse}
 */
var ServerResponse

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