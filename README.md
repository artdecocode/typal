# Typal

[![npm version](https://badge.fury.io/js/typal.svg)](https://npmjs.org/package/typal)

`typal` Keeps Types In XML files And Converts Them To (1) JavaScript JSDoc, (2) Closure Externs and (3) Markdown Documentation. It is the alternative to TypeScript definitions and utilises the power of JSDoc for excellent developer experience, documentation readability and compiler annotation. It also makes integration between _Google Closure Compiler_ and _VSCode_ easy, using the JSDoc notations that are understood by both at the same time.

The package's main use is as the CLI tool to generate typedefs, but it also has an API for parsing types and properties with regular expressions.

```sh
yarn add -D typal
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Purpose](#purpose)
- [CLI](#cli)
  * [*Standard*](#standard)
  * [*Closure*](#closure)
  * [*Externs*](#externs)
  * [_Typal_ Arguments](#typal-arguments)
  * [Missing Types Warnings](#missing-types-warnings)
  * [Keeping Types In Separate File](#keeping-types-in-separate-file)
    * [User Snippet](#user-snippet)
  * [Migration](#migration)
- [Schema](#schema)
  * [Types](#types)
  * [Type](#type)
    * [Prototype Notation](#prototype-notation)
    * [Extends Notation](#extends-notation)
    * [Closure Override](#closure-override)
  * [Property](#property)
  * [Import](#import)
- [Markdown Documentation](#markdown-documentation)
  * [`Type`](#type-type)
  * [`Example`](#type-example)
- [API](#api)
  * [class `Type`](#class-type)
  * [class `Property`](#class-property)
  * [`getNameWithDefault(name: string, defaultValue: ?(string|boolean|number), type: string=, parentParam: string=): string`](#getnamewithdefaultname-stringdefaultvalue-stringbooleannumbertype-stringparentparam-string-string)
  * [`parseFile(xml: string, rootNamespace: string=): { types, imports, namespace }`](#parsefilexml-stringrootnamespace-string--types-imports-namespace-)
    * [Root Namespace](#root-namespace)
- [Optional And Default](#optional-and-default)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## Purpose

The main purpose of this package is to generate _JSDoc_ annotations that are understood both by _VSCode_, and compatible with _Google Closure Compiler_ via its externs system. The project deliberately deviates from _TypeScript_ and is meant for _JavaScript_ development, and it proves that typing can be achieved perfectly well with _JSDoc_. It's idea is to store files in an XML file, and then embed them in JS and README files and externs.

The solutions provided by _Typal_ are:

1. Manage types from an external XML location.
1. Compile types into JSDoc compatible both with _GCC_ and _VSCode_.
1. Compile types as externs for _GCC_ and use in other packages.
1. Place types' descriptions as formatted tables in markdown (used in [_Documentary_](https://github.com/artdecocode/documentary)).
1. Improve the DevX by increasing the visibility of functions' APIs.

To tune in, start with the _Wiki Page_:

<kbd>🥇🥈🥉[Naïve, JSDoc And Closure Use Cases For Typedefs](../../wiki/3-use-cases)</kbd>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## CLI

_Typal_ is the command-line utility that is used to manage _JSDoc_ types in JavaScript source files. The typedefs are now sourced from the `types.xml` file and embedded on demand. There are 3 modes to embedding types:

1. <a name="standard">*Standard*</a>, no flags required: places only _VSCode_ compatible code. Can be used when no Closure-compilation will be performed on packages. Does not utilise namespaces. Expands the parameters of complex types for better visibility.
    <details>
    <summary>Show Standard JSDoc</summary>
    <table><tr/><tr><td>

    ```js
    /**
     * @param {Conf} conf The configuration object.
     * @param {string} conf.source The source of where to read the data.
     * @param {boolean} [conf.closeOnFinish=true] Closes the stream when done. Default `true`.
     * @param {TransformOptions} options
     */
    const prog = (conf, options) => {}
    
    /* typal example/cli/types.xml */
    /**
     * @typedef {import('stream').TransformOptions} TransformOptions
     * @typedef {Object} Conf The configuration object.
     * @prop {string} source The source of where to read the data.
     * @prop {boolean} [closeOnFinish=true] Closes the stream when done. Default `true`.
     */
    ```
    </tr></td></table>
    </details>
1. <a name="closure">*Closure*</a> with `-c` flag: suppresses standard typedefs' annotations so that Closure Compiler does not show warnings. Introduces namespaces for internal as well as external APIs to make types' sources more visible.
    <details>
    <summary>Show Closure JSDoc</summary>
    <table><tr/><tr><td>

    ```js
    /**
     * @param {_typal.Conf} conf The configuration object.
     * @param {string} conf.source The source of where to read the data.
     * @param {boolean} [conf.closeOnFinish=true] Closes the stream when done. Default `true`.
     * @param {stream.TransformOptions} options
     */
    const prog = (conf, options) => {}
    
    /* typal example/cli/types.xml */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {_typal.Conf} Conf The configuration object.
     */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {Object} _typal.Conf The configuration object.
     * @prop {string} source The source of where to read the data.
     * @prop {boolean} [closeOnFinish=true] Closes the stream when done. Default `true`.
     */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {import('stream').TransformOptions} stream.TransformOptions
     */
    ```
    </tr></td></table>
    </details>
1. <a name="externs">*Externs*</a> with `-e` flag: generates types only understood by the _Google Closure Compiler_, primarily in the `externs.js` file. These types do not have any meaning for the coding process and are only used in compilation either as types for programs, or externs for libraries.
    <details>
    <summary>Show Externs JSDoc</summary>
    <table><tr/><tr><td>

    ```js
    /* typal example/cli/types.xml */
    /** @const */
    var _typal = {}
    /**
     * The configuration object.
     * @typedef {{ source: string, closeOnFinish: (boolean|undefined) }}
     */
    _typal.Conf
    ```
    </tr></td></table>
    </details>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true" width="25"></a></p>

### _Typal_ Arguments

```sh
$ typal source [--closure|externs] [-o output] [-vh]
```

The following arguments are supported by this software.

<table>
 <thead>
  <tr>
   <th>Argument</th> 
   <th>Short</th>
   <th>Description</th>
  </tr>
 </thead>
  <tr>
   <td>source</td>
   <td></td>
   <td>The path to the source file or directory with files to embed types into. Can specify multiple values, e.g., <code>typal types/index.js types/vendor.js</code>.</td>
  </tr>
  <tr>
   <td>--output</td>
   <td>-o</td>
   <td>The destination where to save output.
    If not passed, the file will be overwritten.
    If <code>-</code> is passed, prints to stdout.</td>
  </tr>
  <tr>
   <td>--closure</td>
   <td>-c</td>
   <td>Whether to generate types in <em>Closure</em> mode.</td>
  </tr>
  <tr>
   <td>--externs</td>
   <td>-e</td>
   <td>Whether to generate externs for <em>GCC</em>.</td>
  </tr>
  <tr>
   <td>--types</td>
   <td>-t</td>
   <td>Comma-separated location of files to read types from.</td>
  </tr>
  <tr>
   <td>--migrate</td>
   <td>-m</td>
   <td>Extracts types from JavaScript source code and saves them
    into the types.xml file specified in the output option.</td>
  </tr>
  <tr>
   <td>--help</td>
   <td>-h</td>
   <td>Print the help information and exit.</td>
  </tr>
  <tr>
   <td>--version</td>
   <td>-v</td>
   <td>Show the version's number and exit.</td>
  </tr>
</table>

_Typal_ will look for its marker in the source files, and insert all types definitions below it. There **must** be a single new line after the marker, even at the bottom of the file. It is possible to override the arguments, or pass them via the marker itself. When these are specified, there is no need to supply them via the CLI.

```js
function sourceCode() {}

/* typal types/index.xml [closure|externs] [skipNsDecl] [noSuppress] [ignore:_ns.Type,Type] */
_ // remember new line!
```

- <kbd>closure</kbd>: enable the closure mode;
- <kbd>externs</kbd>: enable the externs mode;
- <kbd>noSuppress</kbd>: don't add `@suppress` annotations (see the [files](#keeping-types-in-separate-file) section below).
- <kbd>ignore:_nsType,Type</kbd>: the types to ignore when placing JSDoc into JS files. This can be useful, for example, when the package is built with _Depack_ and has no dependencies, but depends on imported types from other packages. Therefore, these imported types need to be vendored using a separate file, and then imported from there, rather than from their original source file. See [`@zoroaster/mask/types/vendor.js`](https://github.com/contexttesting/mask/blob/master/types/vendor.js) and [`@zoroaster/mask/types/index.js`](https://github.com/contexttesting/mask/blob/master/types/index.js) for a practical application.
- <kbd>skipNsDecl</kbd>: Disables the declaration of the namespace. The types will still be prefixed with a namespace, but it won't be declared at the top as `/** @const */ var ns = {}`. This is useful when the externs are split by multiple files, and the namespace will only need to appear in one of them, otherwise the `Variable _ns declared more than once.` error will be thrown.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/4.svg?sanitize=true" width="25"></a></p>

### Missing Types Warnings

When placing _JSDoc_ into source code files where functions are annotated with `@params`, _Typal_ in addition to expanding object arguments into the developer-friendly notation as discussed above, will check to see if the types were found in the xml files specified in via the `/* typal types.xml */` marker to warn of possible errors. This feature aims at helping to identify when some annotations were not done properly, e.g., when missing a namespace, an import, or when type names become outdated. This does not work for record types such as `{}` since although we have a parser for types themselves, we only use a regular expression which cannot understand things like `@param {{ s: string, t }}` at the moment. Also only [Closure-style types](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#optional) are parsed, i.e., _VSCode_ JSDoc is not supported right now, and the union must be explicitly put in parenthesis.

```js
/**
 * @param {stream.Writable} writable
 * @param {stream.Readable} readable
 * @param {_ns.Type} type
 * @param {_ns.MissingType} missingType
 * @param {Array<_ns.MissingType>} array
 * @param {Promise<MissingType>} promise
 * @param {Object<string, _ns.MissingType>} object
 * @param {(Type | MissingType | _ns.Type)} union
 * @param {(s: string) => number} error
 * @param {MissingType & Type2} intersection Only first type will be parsed
 * @param {string} string
 */
function example (
  writable, readable,
  type, missingType,
  array, promise, object, union,
  error,
  string,
) {}

/* typal example/warnings.xml */
```
```
Detected type marker: example/warnings.xml
Type stream.Readable was not found.
example/warnings.js:3:11
Type _ns.MissingType was not found.
example/warnings.js:5:11
Type _ns.MissingType in Array<_ns.MissingType> was not found.
example/warnings.js:6:11
Type MissingType in Promise<MissingType> was not found.
example/warnings.js:7:11
Type _ns.MissingType in Object<string, _ns.MissingType> was not found.
example/warnings.js:8:11
Type Type in (Type | MissingType | _ns.Type) was not found.
example/warnings.js:9:11
Type MissingType in (Type | MissingType | _ns.Type) was not found.
example/warnings.js:9:11
Error while parsing the type (s: string) => number
Expecting closing )
example/warnings.js:10:11
Type MissingType in MissingType & Type2 was not found.
example/warnings.js:11:11
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/5.svg?sanitize=true" width="25"></a></p>

### Keeping Types In Separate File

If the types are numerous and it is desired to put them in a separate JS file (like `types.d.ts` but for JSDoc) and then import them in code from there for expansions of function's configs, it is possible with the `-t` argument pointing to the location of XML files. Keeping all files in a `types.js` file allows to import them from anywhere in the code, or other packages (the file needs to be added to the `files` field of `package.json`, if such field exists).

_For example, we can create a `types.js` file with the `typal` marker:_

```js
// types.js
export {} // important for enabling of importing
/* typal types/index.xml closure noSuppress */

```

The types can be placed in there with `typal types.js` command. We also add the `noSuppress` command because the file will not be imported and checked by the _Google Closure Compiler_ therefore the `@suppress` annotations would be redundant. Now the aim is to update the source code which has a variable of a particular type that we want to expand and we run `typal src/index.js -t types/index.xml` to do that:

```js
// src/index.js
/**
 * @param {_ns.Config} config
 */
function example(config = {}) {
  const { test } = config
}

// manually add the namespace and dependencies' imports
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Config} _ns.Config
 */
```
```js
// src/index.js
/**
 * @param {_ns.Config} config The config for the program
 * @param {string} config.test The test property.
 * @param {stream.Readable} config.rs The stream to read.
 */
function example(config = {}) {
  const { test } = config
}

// manually add the namespace and dependencies' imports
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Config} _ns.Config
 */
```

Any external types referenced in properties must be manually imported, because otherwise their types will be unknown in the scope of the file. This can be done with the snippet that can be put either in the workspace directory as `.vscode/import.code-snippets`, or configured to be included in _<a name="user-snippet">User Snippet</a>s_ (<kbd>⌘</kbd><kbd>⇧&nbsp;</kbd><kbd>P</kbd> > Preferences: Configure User Snippets).

```json
{
	"Import Type And Suppress": {
		"prefix": "@typedef",
		"body": [
			"/**",
			" * @suppress {nonStandardJsDocs}",
			" * @typedef {import('$1')$2} $3",
			" */"
		],
		"description": "Insert import typedef"
	}
}
```

In future, we plan to introduce full-scale management of types so that all import statements will be added automatically by _Typal_.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/6.svg?sanitize=true" width="25"></a></p>

### Migration

When there are JSDoc types written in JavaScript files, and they need to be put in the `types.xml` file, it can be done automatically with the `--migrate` command. In this case, _Typal_ will scan the source code for the type definitions and their properties, defined as `@prop` or `@property` tags, and place them either in the output file when specified, or print to the stdout. This will help to move all types into XML declarations, which can then be manually adjusted if necessary, and embedded into the source code using the `/* typal types.xml */` marker, and in README documentation using [_Documentary_](https://artdecocode.com/documentary/).

<table>
<tr><th>Using Migrate Command</th></tr>
<tr><td>

```js
/**
 * @typedef {import('koa-multer').StorageEngine} StorageEngine
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('koa-multer').File} File
 */

/**
 * @typedef {Object} Example An example type.
 * @typedef {Object} SessionConfig Description of Session Config.
 * @prop {string} key The cookie key.
 * @prop {number|'session'} [maxAge=86400000] maxAge in ms. Default is 1 day.
 * @prop {boolean} [overwrite] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly] httpOnly or not or not. Default `true`.
 * @prop {boolean} [signed=false] Signed or not. Default `false`.
 * @prop {boolean} [rolling] Force a session identifier cookie to be set.
 * @prop {boolean} [renew] Renew session when session is nearly expired.
 */
```
</td></tr>
<tr><td>
For example, the types above can be extracted into the types file using the <code>typal src/index.js -m [-o types/index.xml]</code> command.
</td></tr>
<tr><td>

```xml
<types>
  <import name="StorageEngine" from="koa-multer" />
  <import name="IncomingMessage" from="http" />
  <import name="File" from="koa-multer" />
  <type name="Example" desc="An example type." />
  <type name="SessionConfig" desc="Description of Session Config.">
    <prop string name="key">
      The cookie key.
    </prop>
    <prop type="number|'session'" name="maxAge" default="86400000">
      maxAge in ms. Default is 1 day.
    </prop>
    <prop boolean name="overwrite" default="true">
      Can overwrite or not.
    </prop>
    <prop boolean name="httpOnly" default="true">
      httpOnly or not or not.
    </prop>
    <prop boolean name="signed" default="false">
      Signed or not.
    </prop>
    <prop opt boolean name="rolling">
      Force a session identifier cookie to be set.
    </prop>
    <prop opt boolean name="renew">
      Renew session when session is nearly expired.
    </prop>
  </type>
</types>
```
</td></tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/7.svg?sanitize=true"></a></p>

## Schema

The types can be defined according to the following schema. It consists of the `types`, `type` and `property` elements.

### Types

```xml
<types
  namespace="_namespace">
  <import .../>
  <type ...>...</type>
</types>

```

The single root element for the XML file.

- `namespace` [_optional_]: how all types will be prefixed in the source code and externs. The use of namespaces is generally only needed for when using _GCC_ to prevent clashes of types, e.g., it is common to name the config objects _"Config"_. The namespace will typically start with `_` to also prevent variable name clashes with extern namespaces.
    ```js
    // SOURCE.js
    // The first line is to enable exporting via VSCode's typedef import.
    /**
     * @typedef {_restream.Rule} Rule The replacement rule.
     */
    // The second line is to use within the source file, so that the externs
    // match the annotated type.
    /**
     * @typedef {Object} _namespace.Rule The replacement rule.
     */

    /**
     * @param {_namespace.Rule} rule
     */
    function hello(rule) {}

    // EXTERNS.js
    /** @const */
    var _namespace = {}
    /** @typedef { myType: boolean } */
    _namespace.Type
    ```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/8.svg?sanitize=true" width="25"></a></p>

### Type

The type represents a _JSDoc_ type.

```xml
<type
  name="Type"
  desc="The description of the type."
  type="(name: string) => number"
  constructor interface record
  extends="_namespace.ParentType"
  closure="function(string): number">
    <prop name="...">...</prop>
</type>
```

- `name`: [_required_]: the name of the type.
- `desc` [_optional_]: the optional description.
- `type` [_optional_]: what is the type, default `Object`.
- `constructor` [_optional_]: for externs, adds the `@constructor` annotation and declares the properties via the _prototype_.
    <details>
    <summary><strong>Show <a name="prototype-notation">Prototype Notation</a></strong></summary>

    ```js
    /* typal example/schema/constructor.xml */
    /** @const */
    var _test = {}
    /**
     * The example type.
     * @extends {_ns.ParentType}
     * @constructor
     */
    _test.Test
    /**
     * A prop.
     * @type {boolean|undefined}
     */
    _test.Test.prototype.bool
    ```
    </details>
- `interface` [_optional_]: for externs, same as `@constructor`, but adds the `@interface` annotation.
- `record` [_optional_]: for externs, same as `@constructor`, but adds the `@record` annotation. This type is called [Structural Interfaces](https://github.com/google/closure-compiler/wiki/Structural-Interfaces-in-Closure-Compiler) and is the best choice for configs _etc_. Types without `@constructor`/`@interface`/`@record` in externs will be presented as `{{ a: string, b: number }}` but when denoted with `@record`, externs will have the same meaning, but will be easier to read. However, `@record` types can be nullable, whereas simple `{{ record }}` types are explicitly non-nullable.
- `extends` [_optional_]: for `constructors`, `interfaces` and `records` this allows to inherit properties from the parent types (see above).
    <details>
    <summary><strong>Show <a name="extends-notation">Extends Notation</a></strong></summary>
    <table>
    <tr><th align="center">Extends Type (<a href="example/schema/extends.xml">view extends.xml</a>)</th></tr>
    <tr><td>

    ```js
    /* typal example/schema/extends.xml */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {_test.Test} Test `＠record` The example type.
     */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {_ns.ParentType & _test.$Test} _test.Test `＠record` The example type.
     */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {Object} _test.$Test `＠record` The example type.
     * @prop {boolean} [bool] A prop.
     */
    ```
    </td></tr>
    <tr><td><em>JSDoc</em> typedefs will contain an extra class denoted with <code>$</code> to be able to extend the parent class, because there's no other way to do it: if the typedef had the parent in its type notation (instead of <code>{Object}</code>), then the properties wouldn't be applied. The internal <code>$</code> class is then merged with the parent class using the <code>&</code> symbol which is <em>TypeScript</em>-specific, but understood by <em>VSCode</em> (not part of the <em>JSDoc</em> spec, but should be).</tr></td>
    <tr><td>

    ```js
    /* typal example/schema/extends.xml */
    /** @const */
    var _test = {}
    /**
     * The example type.
     * @extends {_ns.ParentType}
     * @record
     */
    _test.Test
    /**
     * A prop.
     * @type {boolean|undefined}
     */
    _test.Test.prototype.bool
    ```
    </td></tr>
    <tr><td><em>Externs</em> just add the <code>@extends</code> marker when the type is either <code>@constructor</code>, <code>@interface</code> or <code>@record</code>.</tr></td>
    </table>
    </details>
- `closure` [_optional_]: an override of the type when generating doc in closure mode.
    <details>
    <summary><strong>Show <a name="closure-override">Closure Override</a></strong></summary>

    <table>
    <tr><th align="center">Closure Override (<a href="example/schema/closure.xml">view closure.xml</a>)</th></tr>
    <tr><td>

    ```js
    /* typal example/schema/closure.xml */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {_test.Example} Example
     */
    /**
     * @suppress {nonStandardJsDocs}
     * @typedef {function(string): number} _test.Example
     */
    ```
    </td></tr>
    <tr><td>In <em>Closure</em> mode, <em>Typal</em> will print the value of the <code>closure</code> property. This is helpful for displaying user-readable documentation in README files, but using the types for compilation. There's no way to use both in source code (i.e., the standard type for <em>VSCode</em> and the closure type for <em>GCC</em>).</tr></td>
    <tr><td>

    ```js
    /* typal example/schema/closure.xml */
    /**
     * @typedef {(s: string) => number} Example
     */
    ```
    </td></tr>
    <tr><td>In standard mode, only the <code>type</code> attribute is displayed. This is not compatible with <em>GCC</em>, therefore should only be used for <a href="../../wiki/3-use-cases#jsdoc-approach"><em>JSDoc</em> approach</a> programming.</tr></td>
    </table>
    </details>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/9.svg?sanitize=true" width="25"></a></p>

### Property

The properties are found inside of the `Type` elements. At the moment, the *must* have a description, otherwise the parsing won't work.

```xml
<prop
  name="property"
  string boolean number type="Type"
  opt default="The default value"
  closure="_ns.Type">
Property Description.
</prop>
```

- `name`: the name of the property.
- `string` [_optional_]: sets the type to be `string`.
- `boolean` [_optional_]: sets the type to be `boolean`.
- `number` [_optional_]: sets the type to be `number`.
- `type` [_optional_]: sets the type of the property. Default `*`.
- `opt` [_optional_]: whether the property is optional. In externs this will result in `{ prop: (string|undefined) }`.
- `default` [_optional_]: the default value of the property. Used to add the `Default: value.` to the property description, and `@param {type} [prop=default]` when annotating JS functions.
- `closure` [_optional_]: an override of the type when generating doc in closure mode.

<table>
<tr><th>
  Properties (<a href="example/schema/import.xml">view property.xml</a>)
</th></tr>
<tr><td>

```xml
<types>
  <type name="Example">
    <prop boolean name="boolean">The boolean property.</prop>
    <prop number name="number">The number property.</prop>
    <prop string name="string">The string property.</prop>
    <prop type="Example" name="example">The custom type property.</prop>
    <prop opt type="Example" name="optional">The optional property.</prop>
    <prop string name="default" default="hello-world">
      The default property.
    </prop>
    <prop type="Example" closure="_ns.Example" name="closure">
      The Closure override property.
    </prop>
  </type>
</types>
```
</td></tr>
<tr><td>The properties are listed inside of types and must have descriptions which are trimmed.</tr></td>
<tr><td>

```js
/* typal example/schema/property.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} Example
 * @prop {boolean} boolean The boolean property.
 * @prop {number} number The number property.
 * @prop {string} string The string property.
 * @prop {Example} example The custom type property.
 * @prop {Example} [optional] The optional property.
 * @prop {string} [default="hello-world"] The default property. Default `hello-world`.
 * @prop {_ns.Example} closure The Closure override property.
 */
```
</td></tr>
<tr><td><em>Typal</em> will extract properties from xml file and insert them into <em>JSDoc</em>.</tr></td>
</table>


<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/10.svg?sanitize=true"></a></p>

### Import

```xml
<import
  name="Type"
  from="package-name/src"
  ns="_packageName"
  link="https://docs.page/package-name"
  desc="The imported type from another package.">
</import>
```

- `name`: the name of the imported type.
- `from`: the package (`restream`) or path (`restream/src/Rule`) to import from.
- `ns` [_optional_]: if different from the path, the namespace with which the type will be imported.
- `link` [_optional_]: the link to display in documentation with _Documentary_.
- `desc` [_optional_]: the description to print in documentation.

<table>
<tr><th>
  Imports (<a href="example/schema/import.xml">view import.xml</a>)
</th></tr>
<tr><td>

```js
/* typal example/schema/import.xml */
/**
 * @typedef {import('restream').Rule} Rule
 * @typedef {import('restream/src/markers').Marker} Marker
 * @typedef {import('stream').Readable} Readable
 */
```
</td></tr>
<tr><td>In standard mode, <em>Typal</em> does not use namespaces.</tr></td>
<tr><td>

```js
/* typal example/schema/import.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream/src/markers').Marker} _restream.Marker
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
```
</td></tr>
<tr><td>In <em>Closure</em> mode, <em>Typal</em> adds namespaces so that they will match externs.</tr></td>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/11.svg?sanitize=true"></a></p>

## Markdown Documentation

_Typal_ allows to paste types into documentation using the [_Documentary_](http://artdecocode.com/documentary/) package. It will also link the types it knows about for easier navigation. The supported types are based on the [Google Closure Compiler types](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#optional) and include the following:

__<a name="type-type">`Type`</a>__: A type which can be linked.

__<a name="type-example">`Example`</a>__: An example type which can link to other types.

|      Name       |                                                                                                                   Type                                                                                                                    |                                    Description                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| type            | <em><a href="#type-type" title="A type which can be linked.">?Type</a></em>                                                                                                                                                               | The type itself, possibly nullable.                                               |
| union           | <em>!(<a href="#type-type" title="A type which can be linked.">Type</a> \| string)</em>                                                                                                                                                   | The union of types.                                                               |
| record          | <em>{ t: <a href="#type-type" title="A type which can be linked.">Type</a>, r }</em>                                                                                                                                                      | The record with a type.                                                           |
| application     | <em>Object&lt;string, <a href="#type-type" title="A type which can be linked.">Type</a>&gt;</em>                                                                                                                                          | The application with a type.                                                      |
| function        | <em>function(this: <a href="#type-type" title="A type which can be linked.">Type</a>, string, <a href="#type-type" title="A type which can be linked.">!Type</a>): <a href="#type-type" title="A type which can be linked.">Type</a></em> | The function with arguments and return type.                                      |
| variable-args   | <em>function(...<a href="#type-type" title="A type which can be linked.">Type</a>)</em>                                                                                                                                                   | Functions with `...` for variable argument types.                                 |
| vscode-function | <em>(type: Type, s: string) => Type</em>                                                                                                                                                                                                  | Linking in the _VSCode_ (_TypeScript_) functions are not supported at the moment. |

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/12.svg?sanitize=true"></a></p>

## API

The package is available by importing its named functions and classes:

```js
import { Type, Property, getNameWithDefault, parseFile } from 'typal'
```

Its primary use is in _Documentary_, and the API is therefore semi-private.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/13.svg?sanitize=true" width="25"></a></p>

### class `Type`

This class represents the type.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/14.svg?sanitize=true" width="25"></a></p>

### class `Property`

This class represents the properties of the type.

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/15.svg?sanitize=true" width="25"></a></p>

### `getNameWithDefault(`<br/>&nbsp;&nbsp;`name: string,`<br/>&nbsp;&nbsp;`defaultValue: ?(string|boolean|number),`<br/>&nbsp;&nbsp;`type: string=,`<br/>&nbsp;&nbsp;`parentParam: string=,`<br/>`): string`

Returns the name of a property with its default value, and surrounded by square brackets if default is given. If type is boolean or number, the default value is not surrounded by "". The default values are only used for _VSCode_ because _GCC_ does not use this information.

```js
/**
 * @param {*} requiredParam
 * @param {*} [optionalDefaultParam=false]
 * @param {*} [optionalDefaultParamString="test"]
 * @param {*} [optionalParam]
 *
 * @param {*} parentParam.requiredParam
 * @param {*} [parentParam.optionalDefaultParam=false]
 * @param {*} [parentParam.optionalDefaultParamString="test"]
 * @param {*} [parentParam.optionalParam]
 */
```

```js
import { getNameWithDefault } from 'typal'

console.log(getNameWithDefault('arg', 'test', 'string'))
console.log(getNameWithDefault('hello', true, 'boolean', 'arg'))
console.log(getNameWithDefault('world', 27, 'number', 'arg'))
```
```js
arg="test"
arg.hello=true
arg.world=27
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/16.svg?sanitize=true" width="25"></a></p>

### `parseFile(`<br/>&nbsp;&nbsp;`xml: string,`<br/>&nbsp;&nbsp;`rootNamespace: string=,`<br/>`): { types, imports, namespace }`

Returns the string parsed into _Types_ and _Properties_.

_Given the following types file:_

```xml
<types>
  <import name="ServerResponse" from="http" />
  <type name="SetHeaders"
    type="(s: ServerResponse) => void"
    closure="function(http.ServerResponse)"
    desc="Function to set custom headers on response." />
  <type name="StaticConfig" desc="Options to setup `koa-static`.">
    <prop string name="root">
      Root directory string.
    </prop>
    <prop number name="maxage" default="0">
      Browser cache max-age in milliseconds.
    </prop>
    <prop boolean name="hidden" default="false">
      Allow transfer of hidden files.
    </prop>
  </type>
</types>
```

_It can be parsed using the following call:_

```js
import read from '@wrote/read'
import { parseFile } from 'typal'

const getFile = async () => {
  const file = await read('test/fixture/types.xml')
  const res = parseFile(file)
  return res
}
```

_The result will contain Types and Imports:_

```js
{ namespace: undefined,
  types: 
   [ Type {
       name: 'SetHeaders',
       type: '(s: ServerResponse) => void',
       closureType: 'function(http.ServerResponse)',
       description: 'Function to set custom headers on response.',
       noToc: false,
       spread: false,
       import: false,
       noExpand: false,
       link: null,
       properties: [],
       namespace: null,
       isConstructor: false,
       isInterface: false,
       isRecord: false,
       extends: null },
     Type {
       name: 'StaticConfig',
       type: null,
       closureType: null,
       description: 'Options to setup `koa-static`.',
       noToc: false,
       spread: false,
       import: false,
       noExpand: false,
       link: null,
       properties: 
        [ Property {
            name: 'root',
            description: 'Root directory string.',
            type: 'string',
            closureType: 'string',
            hasDefault: false,
            default: null,
            optional: false,
            aliases: [],
            parsed: { name: 'string' },
            noParams: false },
          Property {
            name: 'maxage',
            description: 'Browser cache max-age in milliseconds.',
            type: 'number',
            closureType: 'number',
            hasDefault: true,
            default: 0,
            optional: true,
            aliases: [],
            parsed: null,
            noParams: false },
          Property {
            name: 'hidden',
            description: 'Allow transfer of hidden files.',
            type: 'boolean',
            closureType: 'boolean',
            hasDefault: true,
            default: false,
            optional: true,
            aliases: [],
            parsed: null,
            noParams: false } ],
       namespace: null,
       isConstructor: false,
       isInterface: false,
       isRecord: false,
       extends: null } ],
  imports: 
   [ Import {
       ns: 'http',
       name: 'ServerResponse',
       from: 'http',
       desc: undefined,
       link: undefined } ],
  Imports: 
   [ Type {
       name: 'ServerResponse',
       type: 'import(\'http\').ServerResponse',
       closureType: 'import(\'http\').ServerResponse',
       description: null,
       noToc: true,
       spread: false,
       import: true,
       noExpand: false,
       link: null,
       properties: [],
       namespace: 'http',
       isConstructor: false,
       isInterface: false,
       isRecord: false,
       extends: null } ] }
```

#### Root Namespace

Passing the `rootNamespace` allows to ignore the given namespace in types and properties. This can be used for compiling documentation when only single namespace is used, and readers can assume where the types come from. However, this should only be used when printing to docs, but when compiling JSDoc, the full namespaces should be used to allow integration with externs.

_Given the following types file which uses namespaces:_

```xml
<types namespace="ns">
  <type name="HelloWorld" desc="The example type.">
  </type>
  <type type="ns.HelloWorld" name="GoodMorning"
    desc="Life is seeing sunlight every day." />
  </type>
  <type name="Conf" desc="The configuration object">
    <prop type="ns.HelloWorld" name="propName">
      The property description.
    </prop>
  </type>
</types>
```

_It can be parsed so that the `ns.` prefix is ignored:_

```js
import read from '@wrote/read'
import { parseFile } from 'typal'

const getFile = async () => {
  const file = await read('example/root.xml')
  const res = parseFile(file, 'ns')
  return res
}
```
```js
{ namespace: 'ns',
  types: 
   [ Type {
       name: 'HelloWorld',
       type: null,
       closureType: null,
       description: 'The example type.',
       noToc: false,
       spread: false,
       import: false,
       noExpand: false,
       link: null,
       properties: [],
       namespace: null,
       isConstructor: false,
       isInterface: false,
       isRecord: false,
       extends: null },
     Type {
       name: 'GoodMorning',
       type: 'HelloWorld',
       closureType: 'ns.HelloWorld',
       description: 'Life is seeing sunlight every day.',
       noToc: false,
       spread: false,
       import: false,
       noExpand: false,
       link: null,
       properties: [],
       namespace: null,
       isConstructor: false,
       isInterface: false,
       isRecord: false,
       extends: null },
     Type {
       name: 'Conf',
       type: null,
       closureType: null,
       description: 'The configuration object',
       noToc: false,
       spread: false,
       import: false,
       noExpand: false,
       link: null,
       properties: 
        [ Property {
            name: 'propName',
            description: 'The property description.',
            type: 'HelloWorld',
            closureType: 'ns.HelloWorld',
            hasDefault: false,
            default: null,
            optional: false,
            aliases: [],
            parsed: { name: 'ns.HelloWorld' },
            noParams: false } ],
       namespace: null,
       isConstructor: false,
       isInterface: false,
       isRecord: false,
       extends: null } ],
  imports: [],
  Imports: [] }
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/17.svg?sanitize=true"></a></p>

Optional And Default
---

- Optional (`opt`) means that the property of a type can be `undefined`.
- Default (`default`) means that when not given, the property will take the `default` value.
- In configs, default implies optional. However, in other types, it does not have to be so.
- Currently, default will trigger optional. Possibly fix that and make specifying optionals implicit.
## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>