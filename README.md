# typal

[![npm version](https://badge.fury.io/js/typal.svg)](https://npmjs.org/package/typal)

`typal` Keeps Types In XML files And Converts Them To (1) JavaScript JSDoc, (2) Closure Externs and (3) Markdown Documentation. It is the alternative to TypeScript definitions and utilises the power of JSDoc for excellent developer experience, documentation readability and compiler annotation. It also makes integration between _Google Closure Compiler_ and _VSCode_ easy, using the JSDoc notations that are understood by both at the same time.

The package has an API, as well as the CLI tool to generate types.

```sh
yarn add -DE typal
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Purpose](#purpose)
  * [Example](#example)
    * [Naïve approach](#naïve-approach)
    * [JSDoc approach](#jsdoc-approach)
    * [Closure approach](#closure-approach)
- [API](#api)
  * [class `Type`](#class-type)
  * [class `Property`](#class-property)
  * [`getNameWithDefault(name: string, defaultValue: ?(string|boolean|number), type: string=, parentParam: string=)`](#getnamewithdefaultname-stringdefaultvalue-stringbooleannumbertype-stringparentparam-string-void)
  * [`parseFile(xml: string, rootNamespace: string=): { types, imports, namespace }`](#parsefilexml-stringrootnamespace-string--types-imports-namespace-)
    * [Root Namespace](#root-namespace)
- [Optional And Default](#optional-and-default)
- [Copyright](#copyright)

## Purpose

The main purpose of this package is to generate _JSDoc_ annotations that are understood both by _VSCode_, and compatible with _Google Closure Compiler_ via its externs system. The project deliberately deviates from _TypeScript_ and is meant for _JavaScript_ development, and it proves that typing can be achieved perfectly well with _JSDoc_. It's idea is to store files in an XML file, and then embed them in JS and README files and externs.

The solutions provided by _Typal_ are:

1. Manage types from an external XML location.
1. Compile types for JSDoc compatible both with _GCC_ and _VSCode_.
1. Compile types as externs for _GCC_ and use in other packages.
1. Place types' descriptions as formatted tables in markdown (used in [_Documentary_](https://github.com/artdecocode/documentary)).
1. Improve the DevX by increasing the visibility of functions' APIs.

---


### Example

This example will illustrate why _Typal_ is extremely useful as the tool both for plain JSDoc management and JSDoc for _Google Closure Compiler_ workflow.

_**<a name="naïve-approach">Naïve approach</a>**: Let's implement a transform stream that updates data using regular expressions specified in the constructor:_

```js
import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the regular expression.
   * @param {Rule} rule The replacement rule.
   * @param {TransformOptions} [options] Additional options for _Transform_.
   */
  constructor(rule, options) {
    super(options)
    this.rule = rule
  }
  _transform(chunk, enc, next) {
    this.push(
      `${chunk}`.replace(this.rule.regex, this.rule.replacer)
    )
    next()
  }
}

/**
 * @typedef {Object} Rule The replacement rule.
 * @prop {RegExp} regex The regular expression.
 * @prop {(...args:string) => string} replacer The function used to update input.
 * @typedef {import('stream').TransformOptions} TransformOptions
 */
```

In the file, we have defined a type using typedef, and imported a type from the internal Node.JS API. All is well, and we get our _JSDoc_ autosuggestions that help us understand that what we're doing is correct.

![JSDoc autosuggestions for defined types](doc/restream1.gif)

However, there are 2 problems with that:

1. _Google Closure Compiler_ does not understand typedefs a) without `var`iable declaration underneath, b) with `@prop`erties and c) with functions in `(...args: string) => string` notation. The format for _GCC_ typedef for our example would be the one below. And if we tried to use it, VSCode would not understand it, and we would loose the description of individual properties of the type.
    ```js
    /**
     * @typedef {{ regex: RegExp, replacement: function(...string): string }}
     */
    var Rule
    ```
1. _Google Closure Compiler_ does not understand `@typedef {import('from').Name}` syntax. It is currently not supported, and to be able to reference types from other packages, they must have externs. So for the _TransformOptions_, we need `stream.TransformOptions` externs. To reference types from the same package but across files, _GCC_ will need types to be imported as ES6 imports (like how things were in 2018), e.g.,
    ```js
    import Rule from './src' // pre-typedef import
    /**
     * @param {Rule} rule
     */
    const fn = (rule) => {}
    ```
1. The documentation that we wrote as _JSDoc_ type declarations has to be copied and pasted into the `README.md` file manually, and all tables need to be also constructed.
1. It is not clear what interface the _Rule_ type adheres to, because _VSCode_ does not show that information:
    <p align="center">
      <img src="doc/restream2.png" title="VSCode does not show properties of a type">
    </p>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true" width="20"></a></p>

_**<a name="jsdoc-approach">JSDoc approach</a>**: Now let's refactor the code that we have, and place the types definitions in the `types.xml` file instead of the source code:_

```xml
<types>
  <import from="stream" name="TransformOptions"
    link="https://nodejs.org/api/stream.html#stream_class_stream_transform" />
  <type name="Rule" desc="The replacement rule." noToc>
    <prop type="RegExp" name="regex">
      The regular expression.
    </prop>
    <prop type="(...args:string) => string" name="replacement">
      The function used to update input.
    </prop>
  </type>
</types>
```

The types files support `<import>`, `<type>` and `<prop>` tags. We then update the source code to indicate the location of where types should be read from (there needs to be a newline before the end of the file):

```js
import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the regular expression.
   * @param {Rule} rule The replacement rule.
   * @param {TransformOptions} [options] Additional options for _Transform_.
   */
  constructor(rule, options) {
    super(options)
    this.rule = rule
  }
  // ...
}

/* typal example/restream/types.xml */
```

Then, we call the `typal` binary to get it to update the source: `typal example/restream/index.js`:

```js
import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the regular expression.
   * @param {Rule} rule The replacement rule.
   * @param {RegExp} rule.regex The regular expression.
   * @param {(...args:string) => string} rule.replacement The function used to update input.
   * @param {TransformOptions} [options] Additional options for _Transform_.
   */
  constructor(rule, options) {
    super(options)
    this.rule = rule
  }
  // ...
}

/* typal example/restream/types.xml */
/**
 * @typedef {import('stream').TransformOptions} TransformOptions
 * @typedef {Object} Rule The replacement rule.
 * @prop {RegExp} regex The regular expression.
 * @prop {(...args:string) => string} replacement The function used to update input.
 */
```

From that point onward, the JSDoc documentation is managed from the separate file. It can also be embedded into the Markdown, using the _Documentary_ documentation pre-processor by adding the `%TYPEDEF: example/restream/types.xml%` marker in the README file:

[`import('stream').TransformOptions`](https://nodejs.org/api/stream.html#stream_class_stream_transform) __<a name="type-transformoptions">`TransformOptions`</a>__

__<a name="type-rule">`Rule`</a>__: The replacement rule.

|       Name       |              Type               |            Description             |
| ---------------- | ------------------------------- | ---------------------------------- |
| __regex*__       | _RegExp_                        | The regular expression.            |
| __replacement*__ | _(...args:string) =&gt; string_ | The function used to update input. |

The link to the _Rule_ type was also added to the Table of Contents, however it can be skipped if the `type` element had the `noToc` property set on it. We also added the `link` property to the `import` element to place a link to Node.JS API docs in documentation.

Another advantage, is that the `Rule` type was expanded into individual properties in JSDoc above the constructor method. It allows to preview all properties and their descriptions when hovering over functions:

<p align="center">
  <img src="doc/restream3.png" title="JSDoc expansion of properties above functions.">
</p>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true" width="20"></a></p>

_**<a name="closure-approach">Closure approach</a>**: Finally, if we want to allow our package to be compiled as part of other packages with GCC, we need to make sure the JSDoc is in the format that it accepts._

We create a simple program that uses our _Restream_ library:
```js
import { Restream } from './index2'

const restream = new Restream({
  regex: /__(.+?)__/,
  replacement(match, s) {
    return `<em>${s}</em>`
  },
})

restream.pipe(process.stdout)
restream.end('__hello world__')
```

And run it with Node.JS:
```html
<em>hello world</em>
```

But if we try to compile a program using _GCC_ now (using [_Depack_](https://github.com/dpck/depack)), we'll get warnings:

```js
java -jar google-closure-compiler-java/compiler.jar --compilation_level ADVANCED \
--language_out ECMASCRIPT_2017 --formatting PRETTY_PRINT \
--externs @depack/externs/v8/stream.js --externs @depack/externs/v8/events.js \
--externs @depack/externs/v8/global.js --externs @depack/externs/v8/nodejs.js \
--module_resolution NODE --output_wrapper "#!/usr/bin/env node
'use strict';
const stream = require('stream');%output%" \
--js node_modules/stream/package.json \
     node_modules/stream/index.js \
     example/restream/warnings.js \
     example/restream/index2.js
```

```js
example/restream/index2.js:6: WARNING - Bad type annotation. Unknown type Rule
   * @param {Rule} rule The replacement rule.
             ^

example/restream/index2.js:8: WARNING - Bad type annotation. type not recognized due to syntax error. See https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler for more information.
   * @param {(...args:string) => string} rule.replacement The function used to update input.
              ^

example/restream/index2.js:9: WARNING - Bad type annotation. Unknown type TransformOptions
   * @param {TransformOptions} [options] Additional options for _Transform_.
             ^

example/restream/index2.js:25: WARNING - Bad type annotation. expected closing } See https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler for more information.
 * @typedef {import('stream').TransformOptions} TransformOptions
                   ^

example/restream/index2.js:26: WARNING - Bad type annotation. type annotation incompatible with other annotations. See https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler for more information.
 * @typedef {Object} Rule The replacement rule.
   ^
```

This is because the traditional JSDoc annotation is not compatible with the compiler. To solve that, we need to compile JSDoc in _Closure_ mode with _Typal_. First, we want to adjust our types with the following things:

1. Annotate the nullability of our types, since there's attention to _Null_ in GCC, not like traditional JS.
1. We also add the `closure` property to the `prop` elements to make them use that type instead of the traditional one. Unfortunately, there's no way to use both in code for _VSCode_ and for _GCC_, however we can still use more readable `type` descriptions when generating README documentation.
1. Add the namespace, because we're going to generate externs and if there are other programs that define the _Rule_ extern, there would be a conflict between two. Adding namespace ensures that the chances of that happening are minimal. In addition, we prefix the namespace with `_` because we'll put it in externs, and if we or people using our library called a variable `restream`, the compiler will think that its related to the extern which it is not exactly.
1. Finally, add another type just to illustrate how to reference types across and withing namespaces. Although defined in the same namespace, the properties need to give full reference to the type.

```xml
<types namespace="_restream">
  <import from="stream" name="TransformOptions"
    link="https://nodejs.org/api/stream.html#stream_class_stream_transform" />
  <type name="Rule" desc="The replacement rule.">
    <prop type="!RegExp" name="regex">
      The regular expression.
    </prop>
    <prop type="function(...string): string" name="replacement">
      The function used to update input.
    </prop>
  </type>
  <type type="!Array<!_restream.Rule>" name="Rules"
    desc="Multiple replacement rules.">
  </type>
</types>
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="20"></a></p>

## API

The package is available by importing its named functions and classes:

```js
import { Type, Property, getNameWithDefault, parseFile } from 'typal'
```

Its primary use is in _Documentary_, and the API is therefore semi-private.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true" width="25"></a></p>

### class `Type`

This class represents the type.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/4.svg?sanitize=true" width="25"></a></p>

### class `Property`

This class represents the properties of the type.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/5.svg?sanitize=true" width="25"></a></p>

### `getNameWithDefault(`<br/>&nbsp;&nbsp;`name: string,`<br/>&nbsp;&nbsp;`defaultValue: ?(string|boolean|number),`<br/>&nbsp;&nbsp;`type: string=,`<br/>&nbsp;&nbsp;`parentParam: string=,`<br/>`): void`

Return a name of a property with its default value, and surrounded by square brackets if default is given. If type is boolean or number, the default value is not surrounded by "".

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
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/6.svg?sanitize=true" width="25"></a></p>

### `parseFile(`<br/>&nbsp;&nbsp;`xml: string,`<br/>&nbsp;&nbsp;`rootNamespace: string=,`<br/>`): { types, imports, namespace }`

Returns the string parsed into _Types_ and _Properties_.

_Given the following types file:_

```xml
<types>
  <import name="ServerResponse" from="http" />
  <type name="SetHeaders"
    type="function(http.ServerResponse)"
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
       type: 'function(http.ServerResponse)',
       closureType: 'function(http.ServerResponse)',
       description: 'Function to set custom headers on response.',
       noToc: false,
       spread: false,
       import: false,
       noExpand: false,
       link: null,
       properties: [],
       namespace: null },
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
            optional: false },
          Property {
            name: 'maxage',
            description: 'Browser cache max-age in milliseconds.',
            type: 'number',
            closureType: 'number',
            hasDefault: true,
            default: 0,
            optional: true },
          Property {
            name: 'hidden',
            description: 'Allow transfer of hidden files.',
            type: 'boolean',
            closureType: 'boolean',
            hasDefault: true,
            default: false,
            optional: true } ],
       namespace: null } ],
  imports: 
   [ { name: 'ServerResponse',
       from: 'http',
       desc: undefined,
       link: undefined } ] }
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
       namespace: null },
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
       namespace: null },
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
            optional: false } ],
       namespace: null } ],
  imports: [] }
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/7.svg?sanitize=true"></a></p>

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
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>