## Updates the @fnType tag
/**
 * @fnType {_namespace.Type.getData}
 */
function getData(location, force) {}

/*@ types */
<types namespace="_namespace">
  <type name="Type">
    <fn async return="boolean" name="getData">
      <arg string name="location">The path to the file.</arg>
      <arg opt boolean name="force">Whether to always get the data.</arg>
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
 * @param {string} location The path to the file.
 * @param {boolean=} [force] Whether to always get the data.
 * @param {?function(string)=} [callback] Callback on single file read.
 * @return {!Promise<boolean>}
 */
function getData(location, force) {}
/*@*/

## Updates the @methodType tag
/**
 * @methodType {_namespace.getData}
 */
function getData(location, force) {}

/*@ types */
<types namespace="_namespace">
  <method name="getData" async return="{ data: string }">
    <arg string name="location">The path to the file.</arg>
    <arg opt boolean name="force">Whether to always get the data.</arg>
    <arg type="?function(string)=" name="callback">Callback on single file read.</arg>
    A function that reads files and returns data.
  </method>
</types>
/*@*/

/*@ expected */
# output.js

/**
 * @param {string} location The path to the file.
 * @param {boolean=} [force] Whether to always get the data.
 * @param {?function(string)=} [callback] Callback on single file read.
 * @return {Promise<{ data: string }>}
 */
function getData(location, force) {}
/*@*/