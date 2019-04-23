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

### Type

The type represents a _JSDoc_ type.

```xml
<type
  name="Type"
  desc="The description of the type."
  type?="(name: string) => number"
  constructor?
  extends?="_namespace.ParentType"
  closure?="function(string): number">
    <prop name="...">...</prop>
</type>
```

- `name`: the name of the type.
- `desc` [_optional_]: the optional description.
- `type` [_optional_]: what is the type, default `Object`.
- `constructor` [_optional_]: for externs, adds the `@constructor` annotation and declares the properties via the `prototype`:
    %FORK-js src/bin/typal example/schema/constructor.js -e -o -%
- `extends` [_optional_]: for `constructors`, `interfaces` and `records` this allows to inherit properties from the parent types (see above).
- `closure` [_optional_]: an override of the type when generating doc in closure mode.

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