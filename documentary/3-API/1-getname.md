```### getNameWithDefault => string
[
  ["name", "string"],
  ["defaultValue", "?(string|boolean|number)"],
  ["type", "string="],
  ["parentParam", "string="]
]
```

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

%EXAMPLE: example/get-name, ../src => typal%
%FORK-js example/get-name%

%~ width="25"%