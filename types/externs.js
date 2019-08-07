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
 * The name of the type.
 * @type {string}
 */
_typal.Type.prototype.name
/**
 * The type of the type.
 * @type {?string}
 */
_typal.Type.prototype.type
/**
 * An overriding type for closure to generate externs, e.g., `function(string): boolean` instead of `(s:string) => boolean`.
 * @type {?string}
 */
_typal.Type.prototype.closureType
/**
 * The description of the type.
 * @type {?string}
 */
_typal.Type.prototype.description
/**
 * Whether the type should not be included in the table of contents (for _Documentary_).
 * @type {boolean|undefined}
 */
_typal.Type.prototype.noToc
/**
 * When generating JSDoc, print all properties of the type, but loose individual property description.
 * @type {boolean|undefined}
 */
_typal.Type.prototype.spread
/**
 * Don't print each property description.
 * @type {boolean|undefined}
 */
_typal.Type.prototype.noExpand
/**
 * Whether the type as an import.
 * @type {boolean|undefined}
 */
_typal.Type.prototype.import
/**
 * If the type is an import, the link to the documentation page.
 * @type {?string}
 */
_typal.Type.prototype.link
/**
 * The properties of the type.
 * @type {!Array<!_typal.Property>}
 */
_typal.Type.prototype.properties
/**
 * The type's namespace, e.g., `_typal`.
 * @type {?string}
 */
_typal.Type.prototype.namespace
/**
 * Whether the externs should have the form of
 * ```js
 * /＊＊ ＠constructor ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isConstructor
 * ```
 * @type {boolean|undefined}
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
 * @type {boolean|undefined}
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
 * @type {boolean|undefined}
 */
_typal.Type.prototype.isRecord
/**
 * Types `＠constructor`, `＠interface` and `＠record` can inherit properties from other types using `@extends`. [Closure Wiki](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#extends-type).
 * @type {?string}
 */
_typal.Type.prototype.extends
/**
 * Constructors and interfaces can have arguments defined in _types.xml_, which will be parsed and stored in this property.
 * @type {Array<!_typal.Arg>}
 */
_typal.Type.prototype._args

/* typal types/Method.xml externs */
/**
 * A representation of a type.
 * @extends {_typal.Type}
 * @interface
 */
_typal.Method = function() {}
/**
 * The return type of the method. Returns void if no return was specified.
 * @type {?string}
 */
_typal.Method.prototype.return
/**
 * If the method is async.
 * @type {?boolean}
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
 * The description of the property.
 * @type {string|undefined}
 */
_typal.Property.prototype.description
/**
 * The type of the property. Default `*`.
 * @type {string|undefined}
 */
_typal.Property.prototype.type
/**
 * Whether the property has the default value.
 * @type {boolean|undefined}
 */
_typal.Property.prototype.hasDefault
/**
 * The default value of the property.
 * @type {?(string|boolean|number)}
 */
_typal.Property.prototype.default
/**
 * If the property is optional.
 * @type {boolean|undefined}
 */
_typal.Property.prototype.optional
