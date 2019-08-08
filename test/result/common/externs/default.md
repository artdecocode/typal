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

## adds undefined with default but not initial
<types>
  <type record name="Record">
    <prop type="?string" name="test" default="null" />
  </type>
  <type name="Test">
    <prop type="?string" name="test" default="null" />
  </type>
  <type record name="RecordInitial">
    <prop type="?string" name="test" initial="null" />
  </type>
  <type name="TestInitial">
    <prop type="?string" name="test" initial="null" />
  </type>
</types>

/*@ expected */
/* typal test/temp/types.xml externs */
/**
 * @record
 */
var Record
/**
 * Default `null`.
 * @type {(?string)|undefined}
 */
Record.prototype.test
/**
 * @typedef {{ test: ((?string)|undefined) }}
 */
var Test
/**
 * @record
 */
var RecordInitial
/**
 * Default `null`.
 * @type {?string}
 */
RecordInitial.prototype.test
/**
 * @typedef {{ test: ?string }}
 */
var TestInitial

/*@*/