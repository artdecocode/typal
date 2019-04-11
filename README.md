# typal

[![npm version](https://badge.fury.io/js/typal.svg)](https://npmjs.org/package/typal)

`typal` Keeps Types In XML files And Converts Them To (1) JavaScript JSDoc, (2) Closure Externs and (3) Markdown Documentation. It is the alternative to TypeScript definitions and utilises the power of JSDoc for excellent developer experience, documentation readability and compiler annotation. It also makes integration between _Google Closure Compiler_ and _VSCode_ easy, using the JSDoc notations that are understood by both at the same time.

The package has an API, as well as the CLI tool to generate types.

```sh
yarn add -DE typal
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [CLI](#cli)
- [API](#api)
  * [`getNameWithDefault(name: string, ?defaultValue: (string|boolean|number), type: string=, parentParam: string=)`](#getnamewithdefaultname-stringdefaultvalue-stringbooleannumbertype-stringparentparam-string-void)
  * [`parseFile(xml: string, rootNamespace: string=)`](#parsefilexml-stringrootnamespace-string-void)
  * [Root Namespace](#root-namespace)
- [Optional And Default](#optional-and-default)
- [Copyright](#copyright)

## CLI

The package can be used

## API

The package is available by importing its named functions and classes:

```js
import { Type, Property, getNameWithDefault, parseFile } from 'typal'
```

Its primary use is in _Documentary_, and the API is therefore semi-private.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true" width="25"></a></p>

### `getNameWithDefault(`<br/>&nbsp;&nbsp;`name: string,`<br/>&nbsp;&nbsp;`?defaultValue: (string|boolean|number),`<br/>&nbsp;&nbsp;`type: string=,`<br/>&nbsp;&nbsp;`parentParam: string=,`<br/>`): void`

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true" width="25"></a></p>

### `parseFile(`<br/>&nbsp;&nbsp;`xml: string,`<br/>&nbsp;&nbsp;`rootNamespace: string=,`<br/>`): void`

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

### Root Namespace

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="25"></a></p>

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