<typedef name="parseFile" noArgTypesInToc>types/API.XML</typedef>

_Given the following types file:_

%EXAMPLE: test/fixture/types.xml%

_It can be parsed using the following call:_

%EXAMPLE: example/parse-file, ../src => typal%

_The result will contain Types and Imports:_

%FORK-js example/parse-file%

%~ width="25"%

### Root Namespace

Passing the `rootNamespace` allows to ignore the given namespace in types and properties. This can be used for compiling documentation when only single namespace is used, and readers can assume where the types come from. However, this should only be used when printing to docs, but when compiling JSDoc, the full namespaces should be used to allow integration with externs.

_Given the following types file which uses namespaces:_

%EXAMPLE: example/root.xml%

_It can be parsed so that the `ns.` prefix is ignored:_

%EXAMPLE: example/parse-file-root, ../src => typal%
%FORK-js example/parse-file-root%

%~%