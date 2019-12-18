## Property

The properties are found inside of the `Type` elements. At the moment, the *must* have a description, otherwise the parsing won't work.

```xml
<prop
  name="property"
  string boolean number type="Type"
  opt default="The default value"
  closure="_ns.Type">
Property Description.
</prop>
```

- `name`: the name of the property.
- `string` [_optional_]: sets the type to be `string`.
- `boolean` [_optional_]: sets the type to be `boolean`.
- `number` [_optional_]: sets the type to be `number`.
- `type` [_optional_]: sets the type of the property. Default `*`.
- `opt` [_optional_]: whether the property is optional. In externs this will result in `{ prop: (string|undefined) }`.
- `default` [_optional_]: the default value of the property. Used to add the `Default: value.` to the property description, and `@param {type} [prop=default]` when annotating JS functions.
- `closure` [_optional_]: an override of the type when generating doc in closure mode.
- `example` [_optional_]: the comma-separated paths to examples (e.g., `example/jsdoc/hello.js,example/jsdoc/world.js`). When starts with `.`, the paths are resolved relative to the type file. The content of examples can be wrapped like so:
    ```js
    import test from 'test'
    function run() {
      /* start example */
      test('hello')
      /// A triple slash lines will break the example code block
      /// and appear as normal text.
      test('world')
      /* end example */
    }
    ```
- `example-override` [_optional_]: the comma-separated overrides for imports in examples, e.g., `../../src => @scope/package`. This allows to print user-friendly examples to documentation, and execute examples as the same time.
- `template-no-return` [_optional_]: when generating templates for constructors, this will prevent their return type (_deprecated_).

<table>
<tr><th>
  Properties (<a href="example/schema/property.xml">view property.xml</a>)
</th></tr>
<tr><td>

%EXAMPLE: example/schema/property.xml%
</td></tr>
<tr><td><md2html>

The properties are listed inside of types and must have descriptions which are trimmed.
</md2html></tr></td>
<tr><td>

%FORK-js src/bin/typal example/schema/prop.js -u -o -%
</td></tr>
<tr><td><md2html>

_Typal_ will extract properties from xml file and insert them into _JSDoc_.
</md2html></tr></td>
<tr><td>

```js
import outsideExample from 'rqt'
/* start example */
```
%EXAMPLE: example/schema/jsdoc%
```js
/* end example */
```
</td></tr>
<tr><td><md2html>

The examples can take advantage of `/* start/end example */` markers and imports renaming.
</md2html></tr></td>
</table>


%~%