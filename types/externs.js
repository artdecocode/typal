/**
 * @fileoverview
 * @externs
 */

/* typal types/Type.xml externs */
/** @const */
var _typal = {}
/**
 * A representation of a type.
 * @interface
 */
_typal.Type = function() {}
/**
 * Constructor method.
 * @return {_typal.Type}
 */
_typal.Type.prototype.constructor = function() {}
/**
 * The name of the type.
 * @type {string}
 */
_typal.Type.prototype.name
/**
 * The type of the type. Default `null`.
 * @type {?string}
 */
_typal.Type.prototype.type
/**
 * An overriding type for closure to generate externs, e.g., `function(string): boolean` instead of `(s:string) => boolean`. Default `null`.
 * @type {?string}
 */
_typal.Type.prototype.closureType
/**
 * The description of the type. Default `null`.
 * @type {?string}
 */
_typal.Type.prototype.description
/**
 * Whether the type should not be included in the table of contents (for _Documentary_). Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.noToc
/**
 * When generating JSDoc, print all properties of the type, but loose individual property description. Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.spread
/**
 * Don't print each property description. Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.noExpand
/**
 * Whether the type as an import. Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.import
/**
 * If the type is an import, the link to the documentation page. Default `null`.
 * @type {?string}
 */
_typal.Type.prototype.link
/**
 * The properties of the type. Default `[]`.
 * @type {!Array<!_typal.Property>}
 */
_typal.Type.prototype.properties
/**
 * The type's namespace, e.g., `_typal`. Default `null`.
 * @type {?string}
 */
_typal.Type.prototype.namespace
/**
 * The namespace or an empty string.
 * @type {string}
 */
_typal.Type.prototype.ns
/**
 * The type name with the namespace is it has with one.
 * @type {string}
 */
_typal.Type.prototype.fullName
/**
 * Whether the externs should have the form of
 * ```js
 * /＊＊ ＠constructor ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isConstructor
 * ```
 * Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.isConstructor
/**
 * Same as `constructor`, but with `＠interface` annotation.
 * ```js
 * /＊＊ ＠interface ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isInterface
 * ```
 * Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.isInterface
/**
 * Same as `constructor`, but with `＠record` annotation.
 * ```js
 * /＊＊ ＠record ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isRecord
 * ```
 * Default `false`.
 * @type {boolean}
 */
_typal.Type.prototype.isRecord
/**
 * Types `＠constructor`, `＠interface` and `＠record` can inherit properties from other types using `@extends`. [Closure Wiki](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#extends-type). Default `null`.
 * @type {?string}
 */
_typal.Type.prototype.extends
/**
 * Constructors and interfaces can have arguments defined in _types.xml_, which will be parsed and stored in this property. Default `null`.
 * @type {Array<!_typal.Arg>}
 */
_typal.Type.prototype.args
/**
 * Converts a type to a markdown string.
 * @param {!Array<!_typal.Type>=} [allTypes] The array with all types for linking.
 * @param {!_typal.ToMarkdownOptions=} [opts] Options passed by _Documentary_.
 */
_typal.Type.prototype.toMarkdown = function(allTypes, opts) {}
/**
 * These options are there for _Documentary_ integration as these 2 packages work together.
 * @record
 */
_typal.ToMarkdownOptions
/**
 * If specified, this will return an object `{ props: ps, anyHaveDefault, constr }` for _Documentary_. Otherwise, returns a string. Semi-private API. Default `false`.
 * @type {boolean|undefined}
 */
_typal.ToMarkdownOptions.prototype.narrow
/**
 * Whether to follow links of referenced types. This will exclude them from printing in imports when compiling _README_ documentation. If function is passed, it will be called with the name of flattened type. Default `false`.
 * @type {(boolean|function(string))|undefined}
 */
_typal.ToMarkdownOptions.prototype.flatten
/**
 * The function to get a link to the type. By default, appends `#` to the generated link, but in case of Wiki generation, _Documentary_ will make sure that types can be linked across pages.
 * @type {(function(string): string)|undefined}
 */
_typal.ToMarkdownOptions.prototype.link = function(arg0) {}
/**
 * The list of types that should be displayed in a `<details>` element, with the name and description as summary, and the properties table inside.
 * @type {(!Array<string>)|undefined}
 */
_typal.ToMarkdownOptions.prototype.details
/**
 * How to process description. _Documentary_ will strip the tripple-backtick code blocks and insert them manually at the end to avoid any transforms in them.
 * @type {(function(string): string)|undefined}
 */
_typal.ToMarkdownOptions.prototype.preprocessDesc = function(arg0) {}

/* typal types/Method.xml externs */
/**
 * A representation of a type.
 * @extends {_typal.Type}
 * @interface
 */
_typal.Method = function() {}
/**
 * Constructor method.
 * @return {_typal.Method}
 */
_typal.Method.prototype.constructor = function() {}
/**
 * The return type of the method. Returns void if no return was specified. Default `void`.
 * @type {string}
 */
_typal.Method.prototype.return
/**
 * If the method is async. Default `false`.
 * @type {boolean}
 */
_typal.Method.prototype.async

/* typal types/Property.xml externs */
/**
 * A property of a type.
 * @interface
 */
_typal.Property
/**
 * The name of the property.
 * @type {string}
 */
_typal.Property.prototype.name
/**
 * The description of the property. Default `null`.
 * @type {?string}
 */
_typal.Property.prototype.description
/**
 * The type of the property. Default `*`.
 * @type {string}
 */
_typal.Property.prototype.type
/**
 * Whether the property has the default value. Default `false`.
 * @type {boolean}
 */
_typal.Property.prototype.hasDefault
/**
 * The default value of the property. Default `null`.
 * @type {?(string|boolean|number)}
 */
_typal.Property.prototype.default
/**
 * If the property is optional. Default `false`.
 * @type {boolean}
 */
_typal.Property.prototype.optional

/* typal types/Arg.xml externs */
/**
 * An argument of a constructor or method.
 * @interface
 */
_typal.Arg
/**
 * The name of the type. Default `null`.
 * @type {?string}
 */
_typal.Arg.prototype.name
/**
 * The type of the argument. Default ``.
 * @type {string}
 */
_typal.Arg.prototype.type
/**
 * Whether the argument is optional. Default `false`.
 * @type {boolean}
 */
_typal.Arg.prototype.optional
/**
 * Description of the argument. Default ``.
 * @type {string}
 */
_typal.Arg.prototype.description
