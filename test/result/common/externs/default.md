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

## adds a function declaration
<types>
  <type record name="Test">
    <fn args="string" name="syncVoid">
      A function without return.
    </fn>
    <fn async args="!Promise<string, !Array<boolean>>" name="app">
      application
    </fn>
    <fn args="(string|boolean), { config: boolean }" name="more">
      multiple
    </fn>
    <fn noParams args="(string|boolean), { config: boolean }" name="np">
      no params
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @record
 */
var Test
/**
 * A function without return.
 * @param {string} arg0
 */
Test.prototype.syncVoid = function(arg0) {}
/**
 * application
 * @param {!Promise<string, !Array<boolean>>} arg0
 * @return {!Promise}
 */
Test.prototype.app = function(arg0) {}
/**
 * multiple
 * @param {(string|boolean)} arg0
 * @param {{ config: boolean }} arg1
 */
Test.prototype.more = function(arg0, arg1) {}
/**
 * no params
 * @type {function((string|boolean), { config: boolean }): void}
 */
Test.prototype.np = function() {}

/*@*/

## writes optional args
<types>
  <type record name="Test">
    <fn args="string=" name="syncVoid">
      A function without return.
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @record
 */
var Test
/**
 * A function without return.
 * @param {string=} [arg0]
 */
Test.prototype.syncVoid = function(arg0) {}

/*@*/

## writes static methods and interfaces
<types>
  <interface name="Test" desc="testing">
    <arg boolean name="test">What to test.</arg>
    <static args="string=" name="syncVoid">
      A static method.
    </static>
  </interface>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing
 * @param {boolean} test What to test.
 * @interface
 */
var Test = function(test) {}
/**
 * A static method.
 * @param {string=} [arg0]
 */
Test.syncVoid = function(arg0) {}

/*@*/

## writes interfaces with functions with args
<types>
  <interface name="Test" desc="testing">
    <arg boolean name="test">What to test.</arg>
    <function args="string=" name="syncVoid">
      <arg string name="test">Example</arg>
    </function>
  </interface>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing
 * @param {boolean} test What to test.
 * @interface
 */
var Test = function(test) {}
/**
 * @param {string=} [test] Example
 */
Test.prototype.syncVoid = function(test) {}

/*@*/
