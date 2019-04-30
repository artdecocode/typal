### Keeping Types In Separate File

If the types are numerous and it is desired to put them in a separate JS file (like `types.d.ts` but for JSDoc) and then import them in code from there for expansions of function's configs, it is possible with the `-t` argument pointing to the location of XML files. Keeping all files in a `types.js` file allows to import them from anywhere in the code, or other packages (the file needs to be added to the `files` field of `package.json`, if such field exists).

_For example, we can create a `types.js` file with the `typal` marker:_

```js
// types.js
export {} // important for enabling of importing
/* typal types/index.xml */

```

The types can be placed in there with `typal types.js` command. But if we wanted to update the source code which has a variable of a particular type that we want to expand, we can run `typal src/index.js -t types/index.xml` to do that:

%EXAMPLE: example/files%
%FORK-js src/bin/typal example/files/index.js -c -t example/files/types.xml -o -%

In future, we plan to introduce full-scale management of types so that all import statements will be added automatically by _Typal_.

%~%