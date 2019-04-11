_**[Closure approach](t)**: Finally, if we want to allow our package to be compiled as part of other packages with GCC, we need to make sure the JSDoc is in the format that it accepts._

<table>
<tr>
  <th>We create a simple program that uses our Restream library:</th>
  <th>And run it with Node.JS:</th>
</tr>
<tr>
  <td>

%EXAMPLE: example/restream/warnings, ./index2 => restream%
  </td>
  <td>

%FORK-html example/restream/warnings%
  </td>
</tr>
</table>

Let's try to compile a program using _GCC_ now (using [_Depack_](https://github.com/dpck/depack)) and see what happens:

<table>
<tr/>
<tr><td colspan="2">

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
</td></tr>
<tr>
  <td rowspan="2">

  _Google Closure Compiler_ does not discover source code files the list of which must be passed manually. In addition, it does not work with internal Node.JS modules natively. The software that performs static analysis of programs to detect what files to feed to the compiler, as well as mocking Node.JS built-in modules in the `node_modules` folder and providing externs for them is called _Depack_.
  </td>
  <td>

  The command above was generated with _Depack_ call shown below, where `-c` means Node.JS compilation (which adds the wrapper, mocks and externs), `-a` means ADVANCED mode, and `-p` means pretty-printing.
  </td>
</tr>
<tr>
  <td>

```sh
depack restream/index2 -c -a -p
```
  </td>
</tr>
</table>

After finishing its job, the compiler will give us warnings shown below, which tell us that the program was not typed checked correctly. Sometimes we can ignore warnings, but we loose the ability to ensure correct typing. It is also possible that the compiler will perform the advanced optimisations incorrectly by mangling property names (e.g., `regex` becomes `a`), but it is not the case here because all files are used together, but if we were publishing the library, the first parameter `rule` would not adhere to the _Rule_ interface.

<table>
<tr/>
<tr><td>

```js
restream/index2.js:6: WARNING - Bad type annotation. Unknown type Rule
   * @param {Rule} rule The replacement rule.
             ^

restream/index2.js:8: WARNING - Bad type annotation. type not recognized due to syntax error.
See https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
for more information.
   * @param {(...args:string) => string} rule.replacement The function used to update input.
              ^

restream/index2.js:9: WARNING - Bad type annotation. Unknown type TransformOptions
   * @param {TransformOptions} [options] Additional options for _Transform_.
             ^

restream/index2.js:25: WARNING - Bad type annotation. expected closing }
See https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
for more information.
 * @typedef {import('stream').TransformOptions} TransformOptions
                   ^

restream/index2.js:26: WARNING - Bad type annotation. type annotation incompatible with
other annotations.
See https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
for more information.
 * @typedef {Object} Rule The replacement rule.
   ^
```
</td></tr>
<tr><td>

The warnings produced by the compiler tell us the points discussed in the beginning: <br/>
- the classic typedefs <code>{Object} Rule</code>, <br/>
- function types <code>(...args:string) => string</code>, <br/>
- and imports <code>import('stream').TransformOptions</code> are not understood.
</td></tr>
</table>

This is because the traditional JSDoc annotation is not compatible with the compiler. To solve that, we need to compile JSDoc in _Closure_ mode with _Typal_. First, we want to adjust our types with the following things:

1. Annotate the nullability of our types, since there's attention to _Null_ in GCC, not like traditional JS.
1. We also add the `closure` property to the `prop` elements to make them use that type instead of the traditional one. Unfortunately, there's no way to use both in code for _VSCode_ and for _GCC_, however we can still use more readable `type` descriptions when generating README documentation.
1. Add the namespace, because we're going to generate externs and if there are other programs that define the _Rule_ extern, there would be a conflict between two. Adding namespace ensures that the chances of that happening are minimal. In addition, we prefix the namespace with `_` because we'll put it in externs, and if we or people using our library called a variable `restream`, the compiler will think that its related to the extern which it is not because it's a namespace in externs, but an instance of _Restream_ in source code.
1. Finally, add another type _Rules_ just to illustrate how to reference types across and withing namespaces. Although defined in the same namespace, the properties need to give full reference to the type.

%EXAMPLE: example/restream/types2.xml%

If we now compile the source code using `--closure` flag (so that the command is `typal example/restream/closure.js -c`), our source code will have JSDoc that is fully compatible with the _Google Closure Compiler_:

%FORK-js src/bin/typal example/restream/index2.js -c -o -%

%~ width="20"%