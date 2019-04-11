## API

The package is available by importing its named functions and classes:

```js
import { Type, Property, getNameWithDefault, parseFile } from 'typal'
```

Its primary use is in _Documentary_, and the API is therefore semi-private.

%~ width="25"%

```### getNameWithDefault
[
  ["name", "string"],
  ["?defaultValue", "(string|boolean|number)"],
  ["type", "string="],
  ["parentParam", "string="]
]
```

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

%~ width="25"%

```### parseFile
[
  ["xml", "string"],
  ["rootNamespace", "string="]
]
```

Returns the string parsed into _Types_ and _Properties_.

_Given the following types file:_

%EXAMPLE: test/fixture/types.xml%

_It can be parsed using the following call:_

%EXAMPLE: example/parse-file, ../src => typal%

_The result will contain Types and Imports:_

%FORK-js example/parse-file%

### Root Namespace

Passing the `rootNamespace` allows to ignore the given namespace in types and properties. This can be used for compiling documentation when only single namespace is used, and readers can assume where the types come from. However, this should only be used when printing to docs, but when compiling JSDoc, the full namespaces should be used to allow integration with externs.

_Given the following types file which uses namespaces:_

%EXAMPLE: example/root.xml%

_It can be parsed so that the `ns.` prefix is ignored:_

%EXAMPLE: example/parse-file-root, ../src => typal%
%FORK-js example/parse-file-root%

%~ width="25"%