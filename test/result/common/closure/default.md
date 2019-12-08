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
    <fn args="string" name="syncUnknown">
      A function without return.
    </fn>
    <fn args="string" name="multiline" return="{
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
 * @prop {function(string)} syncUnknown A function without return.
 * @prop {function(string): { hello: string }} multiline Multiple line return.
 */

/*@*/

## can write methods
<types>
  <method name="Test" return="number">
    <arg string name="a">Example</arg>
    <arg boolean opt name="a2">Example</arg>
  </method>
</types>

/*@ expected */
/* typal test/temp/types.xml closure */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {function(string,boolean=): number} Test
 */

/*@*/