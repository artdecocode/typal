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