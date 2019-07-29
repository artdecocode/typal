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
/* typal test/temp/types.xml externs */
/**
 * @interface
 */
var Test
/**
 * example:
 *
 * ```js
 * hello world
 * ```
 * @type {*}
 */
Test.prototype.test

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
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @typedef {{ getInfo: function(string|number): !Promise<!_namecheap.AddressDetail>, syncVoid: function(string): void }}
 */
var Test

/*@*/