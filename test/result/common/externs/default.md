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