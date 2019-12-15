## Updates the @fnType tag with example
/**
 * @fnType {_namespace.Type.getData}
 */
function getData(location, force) {}

/*@ types */
<types namespace="_namespace">
  <type name="Type">
    <fn async return="boolean" name="getData" example="test/fixture/example.js" example-override="../src => example">
      <arg type="?function(string)=" name="callback">Callback on single file read.</arg>
      A function that reads files and returns data.
    </fn>
  </type>
</types>
/*@*/

/*@ expected */
# output.js

/**
 * A function that reads files and returns data.
 * @param {?function(string)=} [callback] Callback on single file read.
 * @return {!Promise<boolean>}
 * @example
 * ```js
 * import hello from 'example'
 *
 * console.log('hello world')
 * const test = {
 *   a: 'b',
 * }
 * console.log(test)
 * ```
 */
function getData(location, force) {}
/*@*/

## Updates the @fnType of a constructor with example
/**
 * @fnType {_namespace.Type.constructor}
 */
constructor(location, force) {}

/*@ types */
<types namespace="_namespace">
  <constructor name="Type"
    example="test/fixture/example.js"
    example-override="../src => @example/example"
    desc="Hello World">
  </constructor>
</types>
/*@*/

/*@ expected */
# output.js

/**
 * Hello World
 * @example
 * ```js
 * import hello from '＠example/example'
 *
 * console.log('hello world')
 * const test = {
 *   a: 'b',
 * }
 * console.log(test)
 * ```
 */
constructor(location, force) {}
/*@*/