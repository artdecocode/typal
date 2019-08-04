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
 * @prop {(state: !Object, callback?: function(): void) => void} setState
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
 * @prop {(callback: function(): void) => void} [debounceRendering]
 */

/*@*/

## constructors
<types>
  <constructor name="Component" desc="https://git.io/fjHoZ">
    <prop type="!Object" name="defaultProps">
      Ideally this should be written as {function(new:Component) & {defaultProps: !Object}} but it's such loose use-case that it's OK.
    </prop>
  </constructor>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {Object} Component `＠constructor` https://git.io/fjHoZ
 * @prop {!Object} defaultProps Ideally this should be written as {function(new:Component) & {defaultProps: !Object}} but it's such loose use-case that it's OK.
 */

/*@*/