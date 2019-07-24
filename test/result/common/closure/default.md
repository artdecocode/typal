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