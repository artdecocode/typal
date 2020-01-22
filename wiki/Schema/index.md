The types can be defined according to the following schema. The root element is always `<types>` which generally includes N `<type>` and `<method>` elements. A type can be:

- `<interface>` for interfaces, most suitable to define interfaces of classes.
- `<constructor>` which is not used much.
- `<record>` for objects without a class, like configs.

The type will then have N `<prop>` or `<property>` elements each describing a prop. A member of a type which is a function can also be written as `<function>` or `<fn>`.

Additionally, a `<method>` is used to describe exported functions from a packages. Therefore, the meaning of method is that an independent API member, whereas a function is a property of a class (i.e. the reverse traditional meaning).

```js
export const method = (arg, arg2) => {
  // this is a method as it's exported by package
}
/**
 * @implements {namespace.Example}
 */
class Example {
  // this is a function as a member of class
  function() {

  }
}
```

We define methods in XML files also, so that [templates](Templates) can be generated.

Finally, an `<embed>` element can be used to automatically include types from the specified locations in the generated typedefs. This is useful for vendoring, when types from 3rd party packages need to be included in package's own types because during compilation, the source code is merged and no dependencies will be installed when consuming the package. Therefore, to preserve types, they need to be embedded. This could be done manually with markers like `/* typal node_modules/@3rdparty/package/types/index.xml` however the `embed` element simplifies the process.

%TOC%