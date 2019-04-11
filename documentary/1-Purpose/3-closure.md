_**[Closure approach](t)**: Finally, if we want to allow our package to be compiled as part of other packages with GCC, we need to make sure the JSDoc is in the format that it accepts._

We create a simple program that uses our _Restream_ library:
%EXAMPLE: example/restream/warnings%

And run it with Node.JS:
%FORK-html example/restream/warnings%

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

%EXAMPLE: example/restream/types2.xml%

%~ width="20"%