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

The only required attribute is either `src` or `path` that point to the XML file to read for embedding. A new marker will inherit all attributes from its parent, e.g., if the parent used `extern`, the new one will also have `externs`. This is because they are used in the same file. If, for some reason, they need to be explicitly overridden, new values can also be passed.

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

Embeds are mostly used in typedefs, but should be skipped in externs as the compiler will discover the externs during compilation. To prevent embeds, the `no-embed` (or `noEmbed`) attribute should be set on the parent market.

```js
/* typal types/index.xml externs no-embed */

// no embedding will take place
```