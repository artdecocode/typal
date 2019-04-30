### Keeping Types In Separate File

If the types are numerous and it is desired to put them in a separate JS file (like `types.d.ts` but for JSDoc) and then import them in code from there for expansions of function's configs, it is possible with the `-t` argument pointing to the location of XML files. Keeping all files in a `types.js` file allows to import them from anywhere in the code, or other packages (the file needs to be added to the `files` field of `package.json`, if such field exists).

_For example, we can create a `types.js` file with the `typal` marker:_

```js
// types.js
export {} // important for enabling of importing
/* typal types/index.xml closure noSuppress */

```

The types can be placed in there with `typal types.js` command. We also add the `noSuppress` command because the file will not be imported and checked by the _Google Closure Compiler_ therefore the `@suppress` annotations would be redundant. Now the aim is to update the source code which has a variable of a particular type that we want to expand and we run `typal src/index.js -t types/index.xml` to do that:

%EXAMPLE: example/files%
%!FORK-js src/bin/typal example/files/index.js -c -t example/files/types.xml -o -%

Any external types referenced in properties must be manually imported, because otherwise their types will be unknown in the scope of the file. This can be done with the snippet that can be put either in the workspace directory as `.vscode/import.code-snippets`, or configured to be included in _[User Snippet](t)s_ (<kbd>⌘</kbd><kbd>⇧</kbd><kbd>P</kbd> > Preferences: Configure User Snippets).

%EXAMPLE: .vscode/import.code-snippets, json%

In future, we plan to introduce full-scale management of types so that all import statements will be added automatically by _Typal_.

%~ width="25"%