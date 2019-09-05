## uses the namespace
<types namespace="typal">
  <constructor name="Component" desc="Preact component.">
    <prop type="!Object" name="context"/>
    <fn name="setState">
      <arg type="!Object" name="state">The state.</arg>
      <arg type="function(): void" name="callback" opt>
        The callback after completion.
      </arg>
    </fn>
  </constructor>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {typal.Component} Component `＠constructor` Preact component.
 * @typedef {Object} typal.Component `＠constructor` Preact component.
 * @prop {!Object} context
 * @prop {(state: !Object, callback?: function(): void) => ?} setState
 */

/*@*/

## works with functions
<types namespace="typal">
  <type record name="options" desc="Options for Preact.">
    <fn name="debounceRendering" opt>
      <arg type="function(): void" name="callback">The callback.</arg>
    </fn>
    <prop boolean name="syncComponentUpdates" opt/>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {typal.options} options `＠record` Options for Preact.
 * @typedef {Object} typal.options `＠record` Options for Preact.
 * @prop {boolean} [syncComponentUpdates]
 * @prop {(callback: function(): void) => ?} [debounceRendering]
 */

/*@*/

## constructor with type that extends
<types namespace="typal">
  <constructor desc="https://git.io/fjHoZ"
    name="Component" extends="{defaultProps: !Object|undefined}">
    <!-- prop type="!Object" name="defaultProps">
      Could implement writing in props by too much effort for too little gain. HAVE to do extends because even with static property, typescript only accepts props on @typedef {Object}
    </prop> -->
  </constructor>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {typal.Component} Component `＠constructor` https://git.io/fjHoZ
 * @typedef {{defaultProps: !Object|undefined} & typal.$Component} typal.Component `＠constructor` https://git.io/fjHoZ
 * @typedef {Object} typal.$Component `＠constructor` https://git.io/fjHoZ
 */

/*@*/

## does not write static properties
<types>
  <type name="Test">
    <prop name="shouldKeep"/>
    <prop static type="!Object" name="defaultProps" opt>
      Properties that will be assigned upon construction of the component.
    </prop>
    <static name="getDerivedStateFromProps" opt return="!Object">
      <arg name="props" type="!Object">Component properties.</arg>
      <arg name="state" type="!Object">Component plain state.</arg>
    </static>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {Object} Test
 * @prop {*} shouldKeep
 */

/*@*/

## functional properties
<types>
  <type name="Test">
    <fn args="string, string" name="fn" void>
      <arg name="test" type="string"></arg>
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {Object} Test
 * @prop {(test: string, arg1: string) => void} fn
 */

/*@*/

## correctly displays records in function props
<types>
  <type name="Test">
    <prop type="function({ link: string, type: !_typal.Type }): string" name="link" />
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {Object} Test
 * @prop {(arg0: { link: string, type: !_typal.Type }) => string} link
 */

/*@*/

## variable args and this
<types>
  <type record name="Test">
    <prop name="prop" type="function(this:Type, ...string)" />
    <fn args="this:Type, ...string" name="test" opt />
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {Object} Test `＠record`
 * @prop {(this: Type, ...args: string[]) => ?} prop
 * @prop {(this: Type, ...args: string[]) => ?} [test]
 */

/*@*/

## variable args and this in fn's args
<types>
  <type record name="Test">
    <fn name="getArgs" return="!(Array<string>|Promise<!Array<string>>)">
      <arg name="this" type="!Object">The context of a mask.</arg>
      <arg name="forkArgs" type="!Array<string>">Arguments parsed as array.</arg>
      <arg name="...contexts" type="_contextTesting.Context">Zoroaster contexts.</arg>
      desc
    </fn>
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {Object} Test `＠record`
 * @prop {(this: !Object, forkArgs: !Array<string>, ...contexts: _contextTesting.Context[]) => !(Array<string>|Promise<!Array<string>>)} getArgs desc
 */

/*@*/