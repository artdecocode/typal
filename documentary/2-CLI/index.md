## CLI

_Typal_ is the command-line utility that is used to manage _JSDoc_ types in JavaScript source files. The typedefs are now sourced from the `types.xml` file and embedded on demand. There are 3 modes to embedding types:

1. [*Standard*](t), no flags required: places only _VSCode_ compatible code. Can be used when no Closure-compilation will be performed on packages. Does not utilise namespaces. Expands the parameters of complex types for better visibility.
    <details>
    <summary>Show Standard JSDoc</summary>
    <table><tr/><tr><td>

    %FORK-js depack/bin/typal example/cli/standard.js -o -%
    </tr></td></table>
    </details>
1. [*Closure*](t) with `-c` flag: suppresses standard typedefs' annotations so that Closure Compiler does not show warnings. Introduces namespaces for internal as well as external APIs to make types' sources more visible.
    <details>
    <summary>Show Closure JSDoc</summary>
    <table><tr/><tr><td>

    %FORK-js depack/bin/typal example/cli/closure.js -c -o -%
    </tr></td></table>
    </details>
1. [*Externs*](t) with `-e` flag: generates types only understood by the _Google Closure Compiler_, primarily in the `externs.js` file. These types do not have any meaning for the coding process and are only used in compilation either as types for programs, or externs for libraries.
    <details>
    <summary>Show Externs JSDoc</summary>
    <table><tr/><tr><td>

    %FORK-js depack/bin/typal example/cli/externs.js -e -o -%
    </tr></td></table>
    </details>

%~ width="25"%