## CLI

_Typal_ is the command-line utility that is used to manage _JSDoc_ types in JavaScript source files. The typedefs are now sourced from the `types.xml` file and embedded on demand. There are 3 modes to embedding types:

1. *Standard*, no flags required: places only _VSCode_ compatible code. Can be used when no Closure-compilation will be performed on packages. Does not utilise namespaces.
1. *Closure* with `-c` flag: suppresses standard typedefs' annotations so that Closure Compiler does not show warnings. Introduces namespaces for internal as well as external APIs to make types' sources more visible.
1. *Externs* with `-e` flag: generates types only understood by the _Google Closure Compiler_, primarily in the `externs.js` file. These types do not have any meaning for the coding process and are only used in compilation either as types for programs, or externs for libraries.

%~ width="20"%

### _Typal_ Arguments

`typal source [--closure|externs] [-o output] [-vh]`

<argufy>types/arguments.xml</argufy>

%~%