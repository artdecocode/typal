### Missing Types Warnings

When placing _JSDoc_ into source code files where functions are annotated with `@params`, _Typal_ in addition to expanding object arguments into the developer-friendly notation as discussed above, will check to see if the types were found in the xml files specified in via the `/* typal types.xml */` marker to warn of possible errors. This feature aims at helping to identify when some annotations were not done properly, e.g., when missing a namespace, an import, or when type names become outdated. This does not work for record types such as `{}` since although we have a parser for types themselves, we only use a regular expression which cannot understand things like `@param {{ s: string, t }}` at the moment. Also only [Closure-style types](https://github.com/google/closure-compiler/wiki/Types-in-the-Closure-Type-System#optional) are parsed, i.e., _VSCode_ JSDoc is not supported right now, and the union must be explicitly put in parenthesis.

%EXAMPLE: example/warnings%
%FORKERR src/bin/typal example/warnings.js -c -o -%

%~ width="25"%