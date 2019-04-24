## Schema

The types can be defined according to the following schema. It consists of the `types`, `type` and `property` elements.

### Types

```xml
<types
  namespace?="_namespace">
```

The single root element for the XML file.

- `namespace` [_optional_]: how all types will be prefixed in the source code and externs. The use of namespaces is generally only needed for when using _GCC_ to prevent clashes of types, e.g., it is common to name the config objects _"Config"_. The namespace will typically start with `_` to also prevent variable name clashes with extern namespaces.
    ```js
    // SOURCE.js
    // The first line is to enable exporting via VSCode's typedef import.
    /**
     * @typedef {_restream.Rule} Rule The replacement rule.
     */
    // The second line is to use within the source file, so that the externs
    // match the annotated type.
    /**
     * @typedef {Object} _namespace.Rule The replacement rule.
     */

    /**
     * @param {_namespace.Rule} rule
     */
    function hello(rule) {}

    // EXTERNS.js
    /** @const */
    var _namespace = {}
    /** @typedef { myType: boolean } */
    _namespace.Type
    ```

%~ width="20"%

### Type

The type represents a _JSDoc_ type.

```xml
<type
  name="Type"
  desc="The description of the type."
  type="(name: string) => number"
  constructor interface record
  extends="_namespace.ParentType"
  closure="function(string): number">
    <prop name="...">...</prop>
</type>
```

- `name`: [<code><code>required</code></code>]: the name of the type.
- `desc` [_optional_]: the optional description.
- `type` [_optional_]: what is the type, default `Object`.
- `constructor` [_optional_]: for externs, adds the `@constructor` annotation and declares the properties via the _prototype_.
    <details>
    <summary><strong>Show [Prototype Notation](t)</strong></summary>

    %FORK-js src/bin/typal example/schema/constructor.js -e -o -%
    </details>
- `interface` [_optional_]: for externs, same as `@constructor`, but adds the `@interface` annotation.
- `record` [_optional_]: for externs, same as `@constructor`, but adds the `@record` annotation.
- `extends` [_optional_]: for `constructors`, `interfaces` and `records` this allows to inherit properties from the parent types (see above).
    <details>
    <summary><strong>Show [Extends Notation](t)</strong></summary>
    <table>
    <tr><th>Extends Type (<a href="example/schema/extends.xml">view extends.xml</a>)</th></tr>
    <tr><td>

    %FORK-js src/bin/typal example/schema/extends.js -c -o -%
    </td></tr>
    <tr><td><md2html>

    _JSDoc_ typedefs will contain an extra class denoted with `$` to be able to extend the parent class, because there's no other way to do it: if the typedef had the parent in its type notation (instead of `{Object}`), then the properties wouldn't be applied.
    </md2html></tr></td>
    <tr><td>

    %FORK-js src/bin/typal example/schema/extends.js -e -o -%
    </td></tr>
    <tr><td><md2html>

    _Externs_ just add the `@extends` marker when the type is either `@constructor`, `@interface` or `@record`.
    </md2html></tr></td>
    </table>
    </details>
- `closure` [_optional_]: an override of the type when generating doc in closure mode.
    <details>
    <summary><strong>Show [Closure Override](t)</strong></summary>

    <table>
    <tr><th>Closure Override (<a href="example/schema/closure.xml">view closure.xml</a>)</th></tr>
    <tr><td>

    %FORK-js src/bin/typal example/schema/closure.js -c -o -%
    </td></tr>
    <tr><td><md2html>

    In _Closure_ mode, _Typal_ will print the value of the `closure` property. This is helpful for displaying user-readable documentation in README files, but using the types for compilation. There's no way to use both in source code (i.e., the standard type for _VSCode_ and the closure type for _GCC_).
    </md2html></tr></td>
    <tr><td>

    %FORK-js src/bin/typal example/schema/closure.js -o -%
    </td></tr>
    <tr><td><md2html>

    In standard mode, only the `type` attribute is displayed. This is not compatible with _GCC_, therefore should only be used for [_JSDoc_ approach](#jsdoc-approach) programming.
    </md2html></tr></td>
    </table>
    </details>

%~ width="20"%

### Property

The properties are found inside of the `Type` elements. At the moment, the *must* have a description, otherwise the parsing won't work.

```xml
<prop
  name="property"
  string? boolean? number? type?="Type"
  opt? default?="The default value"
  closure?="_ns.Type">
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

%~%