<typedef name="getNameWithDefault" noArgTypesInToc>types/API.XML</typedef>

The default values are only used for visual feedback as _VSCode_ does not show that information anywhere, and _GCC_ does not use it in compilation.

Constructors and interfaces don't have optional properties since _Closure Compiler_ expects all declared options to be initialised in the constructor method, or specified with getters.

_E.g., the following JSDoc includes the params generated with this method (with the addition of `[]` and annotations' tags):_

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

%~%