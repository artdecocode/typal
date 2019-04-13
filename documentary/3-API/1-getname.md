```### getNameWithDefault => string
[
  ["name", "string"],
  ["defaultValue", "?(string|boolean|number)"],
  ["type", "string="],
  ["parentParam", "string="]
]
```

Returns the name of a property with its default value, and surrounded by square brackets if default is given. If type is boolean or number, the default value is not surrounded by "".

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
%FORK example/get-name%

%~ width="25"%