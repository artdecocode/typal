## handles new lines
<types>
  <type interface name="Test">
    <prop name="test">
      example:

      ```js
      hello world
      ```
    </prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml closure */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Test `＠interface`
 * @prop {*} test example:
 *
 * ```js
 * hello world
 * ```
 */

/*@*/

## can write functions
<types>
  <type name="Test">
    <function async args="string|number" return="!_namecheap.AddressDetail" name="getInfo">
      Gets information for the requested address ID.
    </function>
    <fn args="string" name="syncVoid">
      A function without return.
    </fn>
    <fn args="string" name="syncVoid" return="{
      hello: string
    }">
      Multiple line return.
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml closure */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Test
 * @prop {function(string|number): !Promise<!_namecheap.AddressDetail>} getInfo Gets information for the requested address ID.
 * @prop {function(string): void} syncVoid A function without return.
 * @prop {function(string): { hello: string }} syncVoid Multiple line return.
 */

/*@*/
