_**[Closure approach](###)**: Finally, if we want to allow our package to be compiled as part of other packages with GCC (or compile a binary from the lib we've written), we need to make sure the JSDoc is in the format that it accepts._

<table>
<tr>
  <th>We create a simple program that uses our Restream library:</th>
  <th>And run it with Node.JS:</th>
</tr>
<tr>
  <td>

%EXAMPLE: example/restream/program, ./compat => restream%
  </td>
  <td>

%FORK-html example/restream/program%
  </td>
</tr>
</table>

Let's try to compile a program using _GCC_ now (using [_Depack_](https://github.com/dpck/depack)) and see what happens:

<table>
<tr><th colspan="2">[Shell Command To Spawn Closure](t)</th></tr>
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
     example/restream/program.js \
     example/restream/compat.js
```
</td></tr>
<tr>
  <td rowspan="2">

The command above was generated with _Depack_ call on the right, where:
- `-c` means Node.JS compilation (adds the wrapper, mocks and externs),
- `-a` means ADVANCED mode,
- and `-p` means pretty-printing.
  </td>
</tr>
<!-- <tr/> -->
<tr>
  <td>
<em>

```sh
depack example/restream/program -c -a -p
```
</em>
  </td>
</tr>
</table>

> _Google Closure Compiler_ does not discover source code files the list of which must be passed manually. In addition, it does not work with internal Node.JS modules natively. The software that performs static analysis of programs to detect what files to feed to the compiler, as well as mocking Node.JS built-in modules in the `node_modules` folder and providing externs for them is called _Depack_.

After finishing its job, the compiler will give us warnings shown below, which tell us that the program was not type-checked correctly. Sometimes we can ignore warnings, but we loose the ability to ensure correct typing. It is also possible that the compiler will perform the advanced optimisations incorrectly by mangling property names (e.g., `regex` becomes `a`), but it is not the case here because all files are used together, but if we were publishing the library, the first parameter `rule` would not adhere to the _Rule_ interface.

<table>
<tr><th>[Google Closure Compiler Warnings](t)</th></tr>
<!-- <tr/> -->
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

The warnings produced by the compiler tell us the points discussed in the beginning:
- the classic typedefs `{Object} Rule`,
- function types `(...args:string) => string`,
- and imports `import('stream').TransformOptions` are not understood.
</td></tr>
</table>

This is because the traditional JSDoc annotation is not compatible with the compiler. To solve that, we need to compile JSDoc in _Closure_ mode with _Typal_. First, we want to adjust our types to include more features:

<table>
<tr><th>Updated Types For Closure (<a href="example/restream/types2.xml">view source</a>)</th></tr>
<tr><td>

%EXAMPLE: example/restream/types2.xml%
</td></tr>
<tr><td>

1. Annotate the nullability of our types using **!**, since there's attention to *`null`* in _GCC_, not like traditional JS.
1. We also add the `closure` property to the `prop` elements to make them use that type instead of the traditional one. Unfortunately, there's no way to use both in code for _VSCode_ and for _GCC_, however we can still use more readable `type` descriptions when generating README documentation.
1. Add the namespace, because we're going to generate externs and if there are other programs that define the _Rule_ extern, there would be a conflict between two. Adding namespace ensures that the chances of that happening are minimal. In addition, we prefix the namespace with `_` because we'll put it in externs, and if we or people using our library called a variable `restream`, the compiler will think that its related to the extern which it is not because it's a namespace in externs, but an instance of _Restream_ in source code.
1. Finally, add another type _Rules_ just to illustrate how to reference types across and within namespaces. Although defined in the same namespace, the properties need to give full reference to the type.
</td></tr>

</table>

If we now compile the source code using `--closure` flag (so that the command is `typal example/restream/closure.js -c`), our source code will have JSDoc that is fully compatible with the _Google Closure Compiler_:

<table>
<tr><th>
The Source Code With [Closure-Compatible JSDoc](t) (<a href="example/restream/compat.js">view source</a>)
</th></tr>
<tr>
  <td>

%EXAMPLE: example/restream/index2.js%
  </td>
</tr>
<tr>
  <td>

  There have to be some manual modifications to the source:

  - We rename the `@params` to use the namespace: `@param {_restream.Rule} rule`;
  - We also add the namespace to the internal module `@param {stream.TransformOptions}`, because in _Closure_ the externs are provided for the `stream` namespace.
  <hr/>

  The following changes are introduced automatically by _Typal_ after we started using the `--closure` mode:
  </td>
</tr>
<tr><td>

```js
/* typal example/restream/types2.xml */
/**
  * @suppress {nonStandardJsDocs}
  * @typedef {_restream.Rule} Rule The replacement rule.
  */
/**
  * @suppress {nonStandardJsDocs}
  * @typedef {Object} _restream.Rule The replacement rule.
  * @prop {!RegExp} regex The regular expression.
  * @prop {function(...string): string} replacement The function used to update input.
  */
```
</td></tr>
<tr><td>

The _Rule_ type is now defined using 2 `@typedefs`, which are also suppressed to prevent warnings. The reason for the first item is so that the type can be imported in other files from our package, using `{import('restream').Rule}`. This is so because `{import('restream')._restream.Rule}` does not work in _VSCode_. The second type stays as is, and is printed with the namespace. It is still not picked up by _GCC_, but the warning is suppressed. Instead, when we come to generate externs in a minute, their name will match `_restream.Rule`, and the param for the function will be recognised by the compiler.
</td></tr>
<tr><td>

```js
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').TransformOptions} stream.TransformOptions
 */
```
</td></tr>
<tr><td>

The imports are now also suppressed (but the change will come into effect in the next version of the compiler), and printed with the namespace, so that we can refer to them in params and get both the autosuggestions, and _Closure_ compatibility.
</td></tr>
<tr><td>

```js
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_restream.Rules} Rules Multiple replacement rules.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {!Array<!_restream.Rule>} _restream.Rules Multiple replacement rules.
 */
```
</td></tr>
<tr><td>

Any types within the namespace must refer to each other using their full name.
</td></tr>
</table>

Before we continue to compilation, we still need to generate externs, because the _Closure_ compiler does not know about the _Rule_ type. Externs is the way of introducing types to the compiler, so that it can do type checking and property renaming more accurately. Once again, we place the `/* typal example/restream/types2.xml */` marker in the empty `externs.js` file, and let _Typal_ to the job with `typal example/restream/externs.js --externs` command (or `-e`).

<table>
<tr><th>[Generated Externs](t) For Restream (<a href="example/restream/externs.js">view source</a>)</th></tr>
<tr><td>

%EXAMPLE: example/restream/externs%
</td></tr>
<tr><td>
The externs are generated with the Closure-compatible syntax and ready to be used for compilation of our example program.
</td></tr>
</table>

To continue, we run `depack example/restream/program -c -a -p --externs restream/externs.js` again, and this time, _Depack_ will pass the externs argument to the compiler as we request.

<table>
<tr><th colspan="2">[Result Of Compilation](t)</th></tr>
<tr><td>

%FORK-js node_modules/depack/src/bin/depack example/restream/program -c -a -p --externs example/restream/externs.js%
</td></tr>
<tr><td><em>stdout</em></td></tr>
<tr><td>

%FORKERR-js node_modules/depack/src/bin/depack example/restream/program -c -a -p --externs example/restream/externs.js%
</td></tr>
<tr><td><em>stderr</em></td></tr>
<!-- <tr><td>stderr</td></tr> -->
</table>

And so that's it! We've successfully compiled our Node.JS program with _Google Closure Compiler_ using _Depack_ as the CLI interface, and _Typal_ as the utility to organise types, both for README documentation, JSDoc annotation and Compiler externs information. There is just one last thing to add.

<table>
<tr><th>[Annotating Types](t)</th></tr>
<tr><td>

%EXAMPLE: example/restream/annotation, ./compat => restream%
</td></tr>
</table>

When writing code that imports types from libraries, we can use the `{import('lib').Type}` notation for _VSCode_ to give us auto-completions, but we need to suppress it. However, because now we're naming imported types with the namespace, _Closure_ will pick them up from externs it it finds it. Packages can publish their externs and point to them using the `externs` field in their **package.json** file, which will be read by _Depack_ and passed to _GCC_ in the `--externs` flag.

<!-- %~ width="20"% -->
%~%