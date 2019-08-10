## writes args in methods
<types>
  <method alias="world" name="hello" desc="testing." return="string">
    <arg type="Test" name="this">This argument</arg>
    <arg boolean name="test" opt>What to test.</arg>
    <arg string name="...args">Other arguments.</arg>
  </method>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 * @this {Test} This argument
 * @param {boolean=} [test] What to test.
 * @param {...string} args Other arguments.
 * @return {string}
 */
var hello = function(test, ...args) {}
/**
 * testing. Alias of `hello`.
 * @this {Test} This argument
 * @param {boolean=} [test] What to test.
 * @param {...string} args Other arguments.
 * @return {string}
 */
var world = function(test, ...args) {}

/*@*/

## does not add unknown return
<types>
  <method name="hello" desc="testing." />
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 */
var hello = function() {}

/*@*/