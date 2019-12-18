# Types

```xml
<types
  namespace="_namespace">
  <import .../>
  <type ...>...</type>
</types>

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

%~ width="25"%
