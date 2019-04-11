_**[JSDoc approach](t)**: Now let's refactor the code that we have, and place the types definitions in the `types.xml` file instead of the source code:_

%EXAMPLE: example/restream/types.xml%

The types files support `<import>`, `<type>` and `<prop>` tags. We then update the source code to indicate the location of where types should be read from (there needs to be a newline before the end of the file):

%EXAMPLE: example/restream/index1%

Then, we call the `typal` binary to get it to update the source: `typal example/restream/index.js`:

%FORK-js src/bin/typal example/restream/index1.js -o -%

%~%