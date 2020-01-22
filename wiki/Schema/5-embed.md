## Embed

Any additional types that need to be put in the source code can be added with the `<embed>` method. This will generate automatic `/* typal-embed location.xml ...args */` marker in the source code but without a line break, so that it is managed by _Typal_.

```xml
<embed
  src="location.xml"
  path="location.xml"
  ignore="_ns.Ignored,_ns2.Ignored"
  closure namespace externs no-supprss>
</import>
```

- `src`: the path to the XML file.
- `path`: alternative attribute name to `src`.
- `ignore` [_optional_]: comma-separated list of types to ignore.
- `closure` [_optional_]: generate Closure types.
- `namespace` [_optional_]: use namespace (VSCode typedefs).
- `externs` [_optional_]: generate externs.

<table>
<tr><td>

%EXAMPLE: example/schema/embed.xml%
</td></tr>
<tr><td>

%FORK-js src/bin/typal example/schema/embed.js -o -%
</td></tr>
</table>
