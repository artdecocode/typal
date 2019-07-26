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
 * @param {_ns.Type | MissingType} parenthesisLessUnion
 * @param {function(this: MissingTypeA, _ns.Type, MissingTypeB, ...MissingTypeC)} function
 * @param {(s: string) => number} error
 * @param {string} string
 * @param {number} number
 * @param {boolean} boolean
 * @param {symbol} symbol
 * @param {null} _null
 * @param {undefined} _undefined
 */
function test (
  writable, readable,
  type, missingType,
  array, promise, object, union, parenthesisLessUnion, function,
  error,
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
test/temp/program.js:3:11
Type _ns.MissingType was not found.
test/temp/program.js:5:11
Type _ns.MissingType in Array<_ns.MissingType> was not found.
test/temp/program.js:6:11
Type MissingType in Promise<MissingType> was not found.
test/temp/program.js:7:11
Type _ns.MissingType in Object<string, _ns.MissingType> was not found.
test/temp/program.js:8:11
Type Type in (Type | MissingType | _ns.Type) was not found.
test/temp/program.js:9:11
Type MissingType in (Type | MissingType | _ns.Type) was not found.
test/temp/program.js:9:11
Type MissingType in _ns.Type | MissingType was not found.
test/temp/program.js:10:11
Type MissingTypeA in function(this: MissingTypeA, _ns.Type, MissingTypeB, ...MissingTypeC) was not found.
test/temp/program.js:11:11
Type MissingTypeB in function(this: MissingTypeA, _ns.Type, MissingTypeB, ...MissingTypeC) was not found.
test/temp/program.js:11:11
Type MissingTypeC in function(this: MissingTypeA, _ns.Type, MissingTypeB, ...MissingTypeC) was not found.
test/temp/program.js:11:11
Error while parsing the type (s: string) => number
Expecting closing )
test/temp/program.js:12:11
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
 * @param {Type | MissingType} parenthesisLessUnion
 * @param {(s: string) => number} error
 * @param {string} string
 * @param {number} number
 * @param {boolean} boolean
 * @param {symbol} symbol
 * @param {null} _null
 * @param {undefined} _undefined
 */
function test(
  writable, readable,
  type, missingType,
  array, promise, object, union, unionWithoutParenthesis,
  error,
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
test/temp/program.js:3:11
Type MissingType was not found.
test/temp/program.js:5:11
Type MissingType in Array<MissingType> was not found.
test/temp/program.js:6:11
Type _ns.MissingType in Promise<_ns.MissingType> was not found.
test/temp/program.js:7:11
Type MissingType in Object<string, MissingType> was not found.
test/temp/program.js:8:11
Type _ns.MissingType in (Type | _ns.MissingType | _ns.Type) was not found.
test/temp/program.js:9:11
Type _ns.Type in (Type | _ns.MissingType | _ns.Type) was not found.
test/temp/program.js:9:11
Type MissingType in Type | MissingType was not found.
test/temp/program.js:10:11
Error while parsing the type (s: string) => number
Expecting closing )
test/temp/program.js:11:11
/*@*/

## does not warn of Primitives
/**
 * @param {*} any
 * @param {String} string
 * @param {Number} number
 * @param {Date} date
 * @param {Symbol} symbol
 * @param {!Buffer} buffer
 * @param {!Function} fn
 */
function test() {}
/* typal test/temp/types.xml */


/*@ types */
<types namespace="_ns"></types>
/*@*/

/*@ expected */
Detected type marker: test/temp/types.xml
/*@*/