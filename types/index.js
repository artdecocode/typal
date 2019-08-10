export {}

/* typal types/Type.xml namespace */
/**
 * @typedef {_typal.Type} Type `＠interface` A representation of a type.
 * @typedef {Object} _typal.Type `＠interface` A representation of a type.
 * @prop {string} name The name of the type.
 * @prop {?string} type The type of the type. Default `null`.
 * @prop {?string} closureType An overriding type for closure to generate externs, e.g., `function(string): boolean` instead of `(s:string) => boolean`. Default `null`.
 * @prop {?string} description The description of the type. Default `null`.
 * @prop {boolean} noToc Whether the type should not be included in the table of contents (for _Documentary_). Default `false`.
 * @prop {boolean} spread When generating JSDoc, print all properties of the type, but loose individual property description. Default `false`.
 * @prop {boolean} noExpand Don't print each property description. Default `false`.
 * @prop {boolean} import Whether the type as an import. Default `false`.
 * @prop {?string} link The link to the documentation page. Default `null`.
 * @prop {!Array<!_typal.Property>} properties The properties of the type. Default `[]`.
 * @prop {?string} namespace The type's namespace, e.g., `_typal`. Default `null`.
 * @prop {string} ns The namespace or an empty string.
 * @prop {string} fullName The type name with the namespace if it has with one.
 * @prop {boolean} isConstructor Whether the externs should have the form of
 * ```js
 * /＊＊ ＠constructor ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isConstructor
 * ```
 * Default `false`.
 * @prop {boolean} isInterface Same as `constructor`, but with `＠interface` annotation.
 * ```js
 * /＊＊ ＠interface ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isInterface
 * ```
 * Default `false`.
 * @prop {boolean} isRecord Same as `constructor`, but with `＠record` annotation.
 * ```js
 * /＊＊ ＠record ＊/
 * _ns.Type
 * /＊＊ ＠boolean ＊/
 * _ns.Type.prototype.isRecord
 * ```
 * Default `false`.
 * @prop {?string} extends Types `＠constructor`, `＠interface` and `＠record` can inherit properties from other types using `＠extends`. [Closure Wiki](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#extends-type). Default `null`.
 * @prop {Array<!_typal.Arg>} args Constructors and interfaces can have arguments defined in _types.xml_, which will be parsed and stored in this property. Default `null`.
 * @prop {(allTypes: !Array<!_typal.Type>, opts: !_typal.ToMarkdownOptions) => { LINE: string, table: (string|{ props: !Array<{ prop: !_typal.Property, typeName: (string|!_typedefsParser.Type), name: string, de: string, d: string }>, anyHaveDefault: boolean, constr: boolean }), displayInDetails: boolean }} toMarkdown Converts a type to a markdown string. This function is closely integrated with the _Documentary_ package, however can also be used to get a standard markdown string with properties in a table.
 */

/* typal types/Property.xml namespace */
/**
 * @typedef {import('@typedefs/parser').Type} _typedefsParser.Type
 * @typedef {_typal.Property} Property `＠interface` A property of a type.
 * @typedef {Object} _typal.Property `＠interface` A property of a type.
 * @prop {string} name The name of the property.
 * @prop {?string} description The description of the property. Default `null`.
 * @prop {string} type The type of the property. Default `*`.
 * @prop {boolean} hasDefault Whether the property has the default value. Default `false`.
 * @prop {?(string|boolean|number)} default The default value of the property. Default `null`.
 * @prop {boolean} optional If the property is optional. Default `false`.
 * @prop {Array<!_typal.Arg>} args Function properties can have arguments specified inside of their tags. Default `null`.
 * @prop {boolean} isConstructor If this property of a type is its constructor. Default `false`.
 * @prop {boolean} isParsedFunction Whether the property is a function which was parsed. Default `false`.
 * @prop {!Array<string>} aliases What aliases the property has. Default `[]`.
 * @prop {boolean} static When writing externs, this will prevent adding `.prototype`, e.g., `Type.static` instead of `Type.prototype.static`. Default `false`.
 * @prop {_typedefsParser.Type} parsed Whether the property is a function which was parsed. Default `null`.
 * @prop {(getLinks: function(!_typedefsParser.Type): string) => string} toTypeScriptFunction If the function was a parsed function, returns _TypeScript_ type.
 */

/* typal types/Arg.xml namespace */
/**
 * @typedef {_typal.Arg} Arg `＠interface` An argument of a constructor or method.
 * @typedef {Object} _typal.Arg `＠interface` An argument of a constructor or method.
 * @prop {?string} name The name of the argument. Default `null`.
 * @prop {string} type The type of the argument. Default ``.
 * @prop {boolean} optional Whether the argument is optional. Default `false`.
 * @prop {string} description Description of the argument. Default ``.
 */

/* typal types/Method.xml namespace */
/**
 * @typedef {_typal.Method} Method `＠interface` A representation of a type.
 * @typedef {_typal.Type & _typal.$Method} _typal.Method `＠interface` A representation of a type.
 * @typedef {Object} _typal.$Method `＠interface` A representation of a type.
 * @prop {string} return The return type of the method. Returns void if no return was specified. Default `void`.
 * @prop {boolean} isMethod Can be used to disambiguate methods from other types. Default `true`.
 * @prop {boolean} async If the method is async. Default `false`.
 */

/* typal types/Import.xml namespace */
/**
 * @typedef {_typal.Import} Import `＠interface` A representation of an import.
 * @typedef {_typal.Type & _typal.$Import} _typal.Import `＠interface` A representation of an import.
 * @typedef {Object} _typal.$Import `＠interface` A representation of an import.
 * @prop {boolean} import Can be used to disambiguate import from other types. Default `true`.
 * @prop {string} from Which package (or internal module) to import the type from.
 * @prop {string} ns The namespace, which can be set different to "from", e.g., `from` can be set to `@typedefs/parser` and `ns` to `_typedefs`.
 */

/* typal types/markdown.xml namespace */
/**
 * @typedef {_typal.ToMarkdownOptions} ToMarkdownOptions `＠record` These options are there for _Documentary_ integration as these 2 packages work together.
 * @typedef {_typal.LinkingOptions & _typal.$ToMarkdownOptions} _typal.ToMarkdownOptions `＠record` These options are there for _Documentary_ integration as these 2 packages work together.
 * @typedef {Object} _typal.$ToMarkdownOptions `＠record` These options are there for _Documentary_ integration as these 2 packages work together.
 * @prop {boolean} [narrow=false] If specified, this will return an object `{ props: ps, anyHaveDefault, constr }` for _Documentary_. Otherwise, returns a string. Semi-private API. Default `false`.
 * @prop {!Array<string>} [details] The list of types that should be displayed in a `<details>` element, with the name and description as summary, and the properties table inside.
 * @prop {(arg0: string) => string} [preprocessDesc] How to process description. _Documentary_ will strip the triple-backtick code blocks and insert them manually at the end to avoid any transforms in them.
 * @typedef {_typal.LinkingOptions} LinkingOptions `＠record` Options for linking.
 * @typedef {Object} _typal.LinkingOptions `＠record` Options for linking.
 * @prop {boolean} [escapePipe=true] Escapes the `|` in unions so it becomes `\|`. Default `true`.
 * @prop {boolean|function(string): void} [flatten=false] Whether to follow links of referenced types. This will exclude them from printing in imports when compiling _README_ documentation. If function is passed, it will be called with the name of flattened type. Default `false`.
 * @prop {(arg0: { link: string, type: !_typal.Type }) => string} [link] The function to get a link to the type. By default, appends `#` to the generated link, but in case of Wiki generation, _Documentary_ will make sure that types can be linked across pages.
 * @prop {(arg0: string) => string} [nameProcess] Preprocessor for the name of the type.
 */
