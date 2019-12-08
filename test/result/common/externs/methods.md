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
 * @typedef {function(this: Test,boolean=,...string): string}
 */
var hello
/**
 * testing. Alias of `hello`.
 * @typedef {function(this: Test,boolean=,...string): string}
 */
var world

/*@*/

## does not add unknown return
<types>
  <method name="hello" desc="testing." />
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 * @typedef {function()}
 */
var hello

/*@*/