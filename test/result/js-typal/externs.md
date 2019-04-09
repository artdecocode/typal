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