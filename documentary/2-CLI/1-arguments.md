### _Typal_ Arguments

```sh
$ typal source [--closure|externs] [-o output] [-vh]
```

The following arguments are supported by this software.

<argufy>types/arguments.xml</argufy>

_Typal_ will look for its marker in the source files, and insert all types definitions below it. There **must** be a single new line after the marker, even at the bottom of the file. It is possible to override the arguments, or pass them via the marker itself. When these are specified, there is no need to supply them via the CLI.

```js
function sourceCode() {}

/* typal types/index.xml [closure|externs] [noSuppress] [ignore:_ns.Type,Type] */
_ // remember new line!
```

- <kbd>closure</kbd>: enable the closure mode;
- <kbd>externs</kbd>: enable the externs mode;
- <kbd>noSuppress</kbd>: don't add `@suppress` annotations (see the [files](#keeping-types-in-separate-file) section below).
- <kbd>ignore:_nsType,Type</kbd>: the types to ignore when placing JSDoc into JS files. This can be useful, for example, when the package is built with _Depack_ and has no dependencies, but depends on imported types from other packages. Therefore, these imported types need to be vendored using a separate file, and then imported from there, rather than from their original source file. See [`@zoroaster/mask/types/vendor.js`](https://github.com/contexttesting/mask/blob/master/types/vendor.js) and [`@zoroaster/mask/types/index.js`](https://github.com/contexttesting/mask/blob/master/types/index.js) for a practical application.

%~ width="25"%