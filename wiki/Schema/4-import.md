## Import

```xml
<import
  name="Type"
  from="package-name/src"
  ns="_packageName"
  link="https://docs.page/package-name"
  desc="The imported type from another package.">
</import>
```

- `name`: the name of the imported type.
- `from`: the package (`restream`) or path (`restream/src/Rule`) to import from.
- `ns` [_optional_]: if different from the path, the namespace with which the type will be imported.
- `link` [_optional_]: the link to display in documentation with _Documentary_.
- `desc` [_optional_]: the description to print in documentation.

<table>
<tr><th>
  Imports (<a href="example/schema/import.xml">view import.xml</a>)
</th></tr>
<tr><td>

%FORK-js src/bin/typal example/schema/import.js -o -%
</td></tr>
<tr><td><md2html>

In standard mode, _Typal_ does not use namespaces.
</md2html></td></tr>
<tr><td>

%FORK-js src/bin/typal example/schema/import.js -c -o -%
</td></tr>
<tr><td><md2html>

In _Closure_ mode, _Typal_ adds namespaces so that they will match externs.
</md2html></td></tr>
</table>

%~%