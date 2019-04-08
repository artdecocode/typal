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
 * @typedef {Object}
 * @prop {string} root
 * @prop {number} [maxage=0]
 * @prop {boolean} [hidden=false]
 */
var StaticConfig
/**
 * @typedef {http.ServerResponse}
 */
var ServerResponse

/*@*/