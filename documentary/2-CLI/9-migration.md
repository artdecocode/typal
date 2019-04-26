### Migration

When there are JSDoc types written in JavaScript files, and they need to be put in the `types.xml` file, it can be done automatically with the `--migrate` command. In this case, _Typal_ will scan the source code for the type definitions and their properties, defined as `@prop` or `@property` tags, and place them either in the output file when specified, or print to the stdout. This will help to move all types into XML declarations, which can then be manually adjusted if necessary, and embedded into the source code using the `/* typal types.xml */` marker, and in README documentation using [_Documentary_](https://artdecocode.com/documentary/).

<table>
<tr><th>Using Migrate Command</th></tr>
<tr><td>

%EXAMPLE: example/extract%
</td></tr>
<tr><td>
<md2html>

For example, the types above can be extracted into the types file using the `typal src/index.js -m [-o types/index.xml]` command.
</md2html>
</td></tr>
<tr><td>

%FORK-xml src/bin/typal example/extract.js -m%
</td></tr>
</table>

%~%