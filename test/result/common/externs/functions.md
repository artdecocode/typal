## can write functions
<types>
  <type name="Test">
    <function async args="string|number" return="!_namecheap.AddressDetail" name="getInfo">
      Gets information for the requested address ID.
    </function>
    <fn args="string" name="syncUnknownReturn">
      A function without return.
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @typedef {{ getInfo: function(string|number): !Promise<!_namecheap.AddressDetail>, syncUnknownReturn: function(string) }}
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
 * @type {function((string|boolean), { config: boolean })}
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

## empty descriptions
<types>
  <constructor name="Component" desc="Preact component.">
    <fn name="componentWillMount" />
  </constructor>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * Preact component.
 * @constructor
 */
var Component = function() {}
/**
 */
Component.prototype.componentWillMount = function() {}

/*@*/

## variable args
<types>
  <type record name="Test">
    <prop static name="prop" type="function(string, ...Type)" />
    <static args="...Type" name="test" opt />
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @record
 */
var Test
/**
 * @param {string} arg0
 * @param {...Type} args
 */
Test.prop = function(arg0, ...args) {}
/**
 * @type {(function(...Type))|undefined}
 */
Test.test = function(...args) {}

/*@*/

## this arg
<types>
  <type record name="Test">
    <prop static name="prop" type="function(this:Type)" />
    <static args="this:Type" name="test" opt />
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @record
 */
var Test
/**
 * @this {Type}
 */
Test.prop = function() {}
/**
 * @type {(function(this:Type))|undefined}
 */
Test.test = function() {}

/*@*/


## this arg in args
<types>
  <type record name="Test" desc="testing.">
    <fn name="hello" return="string">
      <arg type="Test" name="this">This argument</arg>
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 * @record
 */
var Test
/**
 * @this {Test}
 * @return {string}
 */
Test.prototype.hello = function() {}

/*@*/

## this and variable in args
<types>
  <type record name="Test" desc="testing.">
    <fn opt name="getResults" return="*|!Promise">
      <arg name="this" type="_contextTesting.MaskContext">
        The context of the mask with inputs.
      </arg>
      <arg name="string" type="string">
        This input string
      </arg>
      <arg name="...contexts" type="_contextTesting.Context">
        Zoroaster contexts.
      </arg>
      desc
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 * @record
 */
var Test
/**
 * desc
 * @type {(function(this: _contextTesting.MaskContext,string,..._contextTesting.Context): *|!Promise)|undefined}
 */
Test.prototype.getResults = function(string, ...args) {}

/*@*/

## arguments
<types>
  <type record name="Test" desc="testing.">
    <fn opt name="getProps" return="Object">
      <arg name="props" type="!_competent.Props">Properties.</arg>
      <arg name="meta" type="!_competent.Meta">Meta properties.</arg>
      <arg string name="componentName">The name of the component.</arg>
      The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * testing.
 * @record
 */
var Test
/**
 * The function which takes the parsed properties from HTML and competent's meta methods, and returns the properties object to be passed to the component. By default, returns the properties simply merged with _meta_.
 * @type {(function(!_competent.Props,!_competent.Meta,string): Object)|undefined}
 */
Test.prototype.getProps = function(props, meta, componentName) {}

/*@*/


