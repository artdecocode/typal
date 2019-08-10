## writes variable length args and methods
<types>
  <method alias="world" name="hello" desc="testing." return="string">
    <arg boolean name="test" opt>What to test.</arg>
    <arg string name="...args">Other arguments.</arg>
  </method>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 * @param {boolean=} [test] What to test.
 * @param {...string} args Other arguments.
 * @return {string}
 */
var hello = function(test, ...args) {}
/**
 * testing. Alias of `hello`.
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