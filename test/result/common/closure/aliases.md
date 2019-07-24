## adds properties with aliases
<types>
  <type interface name="Test">
    <prop name="test" alias="test1">the test</prop>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml closure */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Test `＠interface`
 * @prop {*} test the test
 * @prop {*} test1 An alias for `test`.
 */

/*@*/