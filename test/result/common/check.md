## warns of missing types (closure)
/**
 * @param {stream.Writable} writable
 * @param {stream.Readable} readable
 * @param {_ns.Type} type
 * @param {_ns.MissingType} missingType
 * @param {Array<_ns.MissingType>} array
 * @param {Promise<MissingType>} promise
 * @param {Object<string, _ns.MissingType>} object
 * @param {(Type | MissingType | _ns.Type)} union
 * @param {string} string
 * @param {number} number
 * @param {boolean} boolean
 * @param {symbol} symbol
 * @param {null} _null
 * @param {undefined} _undefined
 */
function(
  writable, readable,
  type, missingType,
  array, promise, object, union,
  string, number, boolean, symbol, _null, _undefined,
) {}
/* typal test/temp/types.xml */


/*@ conf */
{ closure: true }
/*@*/

/*@ types */
<types namespace="_ns">
  <import from="stream" name="Writable" />
  <type name="Type"></type>
</types>
/*@*/

/*@ expected */
Detected type marker: test/temp/types.xml
Type stream.Readable was not found.
Type _ns.MissingType was not found.
Type _ns.MissingType in Array<_ns.MissingType> was not found.
Type MissingType in Promise<MissingType> was not found.
Type _ns.MissingType in Object<string, _ns.MissingType> was not found.
Type Type in (Type | MissingType | _ns.Type) was not found.
Type MissingType in (Type | MissingType | _ns.Type) was not found.
/*@*/

## warns of missing types
/**
 * @param {Writable} writable
 * @param {Readable} readable
 * @param {Type} type
 * @param {MissingType} missingType
 * @param {Array<MissingType>} array
 * @param {Promise<_ns.MissingType>} promise
 * @param {Object<string, MissingType>} object
 * @param {(Type | _ns.MissingType | _ns.Type)} union
 * @param {string} string
 * @param {number} number
 * @param {boolean} boolean
 * @param {symbol} symbol
 * @param {null} _null
 * @param {undefined} _undefined
 */
function(
  writable, readable,
  type, missingType,
  array, promise, object, union,
  string, number, boolean, symbol, _null, _undefined,
) {}
/* typal test/temp/types.xml */


/*@ types */
<types namespace="_ns">
  <import from="stream" name="Writable" />
  <type name="Type"></type>
</types>
/*@*/

/*@ expected */
Detected type marker: test/temp/types.xml
Type Readable was not found.
Type MissingType was not found.
Type MissingType in Array<MissingType> was not found.
Type _ns.MissingType in Promise<_ns.MissingType> was not found.
Type MissingType in Object<string, MissingType> was not found.
Type _ns.MissingType in (Type | _ns.MissingType | _ns.Type) was not found.
Type _ns.Type in (Type | _ns.MissingType | _ns.Type) was not found.
/*@*/