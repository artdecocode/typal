_**[JSDoc approach](t)**: Now let's refactor the code that we have, and place the types definitions in the `types.xml` file instead of the source code:_

%EXAMPLE: example/restream/types.xml%

The types files support `<import>`, `<type>` and `<prop>` tags. We then update the source code to indicate the location of where types should be read from (there needs to be a newline before the end of the file):

%EXAMPLE: example/restream/index1%

Then, we call the `typal` binary to get it to update the source: `typal example/restream/index.js`:

%FORK-js src/bin/typal example/restream/index1.js -o -%

From that point onward, the JSDoc documentation is managed from the separate file. It can also be embedded into the Markdown, using the _Documentary_ documentation pre-processor by adding the `%TYPEDEF: example/restream/types.xml%` marker in the README file:

%TYPEDEF example/restream/types.xml%

The link to the _Rule_ type was also added to the Table of Contents, however it can be skipped if the `type` element had the `noToc` property set on it. We also added the `link` property to the `import` element to place a link to Node.JS API docs in documentation.

Another advantage, is that the `Rule` type was expanded into individual properties in JSDoc above the constructor method. It allows to preview all properties and their descriptions when hovering over functions:

<p align="center">
  <img src="doc/restream3.png" title="JSDoc expansion of properties above functions.">
</p>

%~ width="20"%