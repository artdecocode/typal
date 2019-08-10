Imports can be used to generate `@typedef {import('packageName').Type}` in JavaScript source code to make types available for hints. They are also used in documentation to link to external API docs and add titles to imported names.

<typedef narrow>types/Import.xml</typedef>

%~%

## Vendoring Typedefs

When a package is compiled, it will be distributed without dependencies. Therefore, imports' typedefs need to be included in the package's typedefs, to make them accessible at runtime if the dependency that they refer to does not exist.