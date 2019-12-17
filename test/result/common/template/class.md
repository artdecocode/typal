## Updates the @constructor tag
/**
 * @constructor {_namespace.Constructor}
 */
class Constructor extends _Constructor {}

/*@ types */
<types namespace="_namespace">
  <constructor name="Constructor" desc="A class that represents A.">
    <fn name="constructor">
      <arg string name="test">Test</arg>
      Creates an instance of a new class.
    </fn>
    <fn async return="boolean" name="getData" alias="getDataAlias">
      <arg string name="location">The path to the file.</arg>
      <arg opt boolean name="force">Whether to always get the data.</arg>
      <arg type="?function(string)=" name="callback">Callback on single file read.</arg>
      A function that reads files and returns data.
    </fn>
    <fn static return="!_namespace.Constructor" name="url">
      <arg string name="location">The path to the file.</arg>
      <arg type="!Object" name="...params">The middleware.</arg>
      Returns the URL.
    </fn>
  </constructor>
</types>
/*@*/

/*@ expected */
# output.js

/**
 * A class that represents A.
 */
class Constructor extends _Constructor {
  /**
   * Creates an instance of a new class.
   * @param {string} test Test
   */
  constructor(test) {
    super(test)
  }
  /**
   * Returns the URL.
   * @param {string} location The path to the file.
   * @param {...!Object} params
   */
  static url(location, ...params) {
    return _Constructor.url(location, ...params)
  }
  /**
   * A function that reads files and returns data.
   * @param {string} location The path to the file.
   * @param {boolean=} [force] Whether to always get the data.
   * @param {?function(string)=} [callback] Callback on single file read.
   * @return {!Promise<boolean>}
   */
  async getData(location, force, callback) {
    return super.getData(location, force, callback)
  }
  /**
   * A function that reads files and returns data.
   * @param {string} location The path to the file.
   * @param {boolean=} [force] Whether to always get the data.
   * @param {?function(string)=} [callback] Callback on single file read.
   * @return {!Promise<boolean>}
   * @alias getData An alias for **getData**.
   */
  async getDataAlias(location, force, callback) {
    return super.getData(location, force, callback)
  }
}
/*@*/