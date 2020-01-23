## 23 January 2020

### [1.26.0](https://github.com/artdecocode/typal/compare/v1.25.1...v1.26.0)

- [license] Change to AGPL.

### [1.25.1](https://github.com/artdecocode/typal/compare/v1.25.0...v1.25.1)

- [feature] Support `no-embed` attribute and inherit attributes for embedding.

## 22 January 2020

### [1.25.0](https://github.com/artdecocode/typal/compare/v1.24.20...v1.25.0)

- [feature] Add `<embed>` element to the schema.

## 26 December 2019

### [1.24.20](https://github.com/artdecocode/typal/compare/v1.24.19...v1.24.20)

- [fix] Fix the typedef order of extended types (nominal comes first).

## 21 December 2019

### [1.24.19](https://github.com/artdecocode/typal/compare/v1.24.18...v1.24.19)

- [fix] Fix how constructors are parsed and serialised.

### [1.24.18](https://github.com/artdecocode/typal/compare/v1.24.17...v1.24.18)

- [fix] Fix the order when flattening.

## 20 December 2019

### [1.24.17](https://github.com/artdecocode/typal/compare/v1.24.16...v1.24.17)

- [feature] Read `<record>` tags.
- [fix] Pass through `flatten` to extends markdown generation.

### [1.24.16](https://github.com/artdecocode/typal/compare/v1.24.15...v1.24.16)

- [fix] Run `nameProcess` on the extends type.
- [feature] Pass odd or even argument to the `nameProcess` when generating mdTable.

## 19 December 2019

### [1.24.15](https://github.com/artdecocode/typal/compare/v1.24.14...v1.24.15)

- [feature] Add the `return` property to the _Property_.
- [doc] Update `schema` to include examples.

## 18 December 2019

### [1.24.14](https://github.com/artdecocode/typal/compare/v1.24.13...v1.24.14)

- [feature] Arguments for interfaces/constructors in externs.

### [1.24.13](https://github.com/artdecocode/typal/compare/v1.24.12...v1.24.13)

- [feature] Template no return.

### [1.24.12](https://github.com/artdecocode/typal/compare/v1.24.11...v1.24.12)

- [fix] Add constructor property on constructors/interfaces even without args.

### [1.24.11](https://github.com/artdecocode/typal/compare/v1.24.10...v1.24.11)

- [fix] Add location to the template.

### [1.24.10](https://github.com/artdecocode/typal/compare/v1.24.9...v1.24.10)

- [fix] Fix reading examples for `fns`.

### [1.24.9](https://github.com/artdecocode/typal/compare/v1.24.8...v1.24.9)

- [fix] Read relative properties' examples.

### [1.24.8](https://github.com/artdecocode/typal/compare/v1.24.7...v1.24.8)

- [feature] Relative example paths.

### [1.24.7](https://github.com/artdecocode/typal/compare/v1.24.6...v1.24.7)

- [fix] Fix ordering.

### [1.24.6](https://github.com/artdecocode/typal/compare/v1.24.5...v1.24.6)

- [fix] Fix examples' indentation.

### [1.24.5](https://github.com/artdecocode/typal/compare/v1.24.4...v1.24.5)

- [fix] Add examples to `prop`.

## 17 December 2019

### [1.24.4](https://github.com/artdecocode/typal/compare/v1.24.3...v1.24.4)

- [fix] Fix variable arg param names in externs.
- [fix] Print descriptions of var args.

### [1.24.3](https://github.com/artdecocode/typal/compare/v1.24.2...v1.24.3)

- [fix] Variable args names in template.

### [1.24.2](https://github.com/artdecocode/typal/compare/v1.24.1...v1.24.2)

- [fix] Fix examples parsing.

## 16 December 2019

### [1.24.1](https://github.com/artdecocode/typal/compare/v1.24.0...v1.24.1)

- [fix] Pass `examples` to constructor prop.

### [1.24.0](https://github.com/artdecocode/typal/compare/v1.23.2...v1.24.0)

- [feature] Generate classes in templates.

### [1.23.2](https://github.com/artdecocode/typal/compare/v1.23.1...v1.23.2)

- [fix] Add `examples` to Type's externs.

## 15 December 2019

### [1.23.1](https://github.com/artdecocode/typal/compare/v1.23.0...v1.23.1)

- [fix] Indent templates with multiple lines in descriptions.

### [1.23.0](https://github.com/artdecocode/typal/compare/v1.22.9...v1.23.0)

- [feature] Read and embed examples into templates.

## 9 December 2019

### [1.22.9](https://github.com/artdecocode/typal/compare/v1.22.8...v1.22.9)

- [feature] Allow to extend multiple supers.

## 8 December 2019

### [1.22.8](https://github.com/artdecocode/typal/compare/v1.22.7...v1.22.8)

- [fix] Print methods in externs as typedefs.c

## 29 November 2019

### [1.22.7](https://github.com/artdecocode/typal/compare/v1.22.6...v1.22.7)

- [feature] Allows to pass a directory via `-t` for source JSDoc generation.

## 6 September 2019

### [1.22.6](https://github.com/artdecocode/typal/compare/v1.22.5...v1.22.6)

- [fix] Fix arguments names in function assignment in externs.

### [1.22.5](https://github.com/artdecocode/typal/compare/v1.22.4...v1.22.5)

- [fix] Fix _JSDoc_ regex to pickup descriptions over multiple lines.

### [1.22.4](https://github.com/artdecocode/typal/compare/v1.22.3...v1.22.4)

- [fix] Print `*` in descriptions with new lines in _JSDoc_ rule.

## 5 September 2019

### [1.22.3](https://github.com/artdecocode/typal/compare/v1.22.2...v1.22.3)

- [fix] Correct `this` args count and allow to print `...custom` var args in typescript types.

### [1.22.2](https://github.com/artdecocode/typal/compare/v1.22.1...v1.22.2)

- [fix] Pass `this` and `...args` arguments in _`<fn><arg>`_ correctly.

## 18 August 2019

### [1.22.1](https://github.com/artdecocode/typal/compare/v1.22.0...v1.22.1)

- [fix] Pass `useNamespace` via arguments for source (non-closure) _JSDoc_.

## 10 August 2019

### [1.22.0](https://github.com/artdecocode/typal/compare/v1.21.1...v1.22.0)

- [refactor] Create a separate class for _Method_ which together with the _Interface_ now extend the _Type_.
- [refactor] Extract all possible tags at once, fix root namespace of constructor/interfaces arguments.
- [package] Compile the library to remove dependencies.
- [fix] Better _TypeScript_ serialisation, assume unknown return not `*` or `void`.
- [feature] `initial` attribute for constructors and interfaces in addition to default of records.
- [feature] Display `constructor` property of constructors/interfaces in the table.
- [feature] `@methodType` in templates.
- [types] Write interfaces.
- [doc] Populate Wiki.

## 7 August 2019

### [1.21.1](https://github.com/artdecocode/typal/compare/v1.21.0...v1.21.1)

- [fix] Fix parsing the _null_ return of functions.

### [1.21.0](https://github.com/artdecocode/typal/compare/v1.20.2...v1.21.0)

- [feature] Display VSCode-style types in _README_ documentation.
- [feature] Show static types at the top of typedef markdown table.
- [fix] Remove root namespace from fn args.

## 6 August 2019

### [1.20.2](https://github.com/artdecocode/typal/compare/v1.20.1...v1.20.2)

- [fix] Don't print static methods and properties in typedef.

### [1.20.1](https://github.com/artdecocode/typal/compare/v1.20.0...v1.20.1)

- [fix] Don't specify _void_ return in externs.

## 5 August 2019

### [1.20.0](https://github.com/artdecocode/typal/compare/v1.19.2...v1.20.0)

- [fix] Respect root namespace in arguments.
- [fix] Allow static properties that are not methods.
- [fix] Correct `/** */` when no description is given for properties.
- [feature] Add the `namespace` flag to decouple closure from namespaces and allow writing types for _VSCode_.
- [feature] Write `<methods>` as types, with return and async properties.
- [feature] Type aliases will create a cloned type with a different name.
- [feature] `<interface>` and `<constructor>` shortcuts for types.
- [api] Export `getLinks` method.

## 3 August 2019

### [1.19.2](https://github.com/artdecocode/typal/compare/v1.19.1...v1.19.2)

- [deps] Install missing `@wrote/read`.

## 1 August 2019

### [1.19.1](https://github.com/artdecocode/typal/compare/v1.19.0...v1.19.1)

- [fix] Allow to template constructor methods and properties.

### [1.19.0](https://github.com/artdecocode/typal/compare/v1.18.0...v1.19.0)

- [feature] Static methods and interfaces in schema.

## 31 July 2019

### [1.18.0](https://github.com/artdecocode/typal/compare/v1.17.0...v1.18.0)

- [feature] Generate source code from template
- [feature] Update XML schema to specify properties which are functions and their args with `<args>`.
- [feature] Create externs in form of
    ```js
    /**
     * Fn desc.
     * @param {string} param1 Arg1 Desc
     * @param {boolean} param2 Arg2 Desc
     */
    _ns.Type.prototype.fn = function(param1, param2)
    ```
- [doc] Move some documentation to wiki.
- [API] `Type.toMarkdown` now always returns _{ LINE, table }_.

## 29 July 2019

### [1.17.0](https://github.com/artdecocode/typal/compare/v1.16.0...v1.17.0)

- [feature] Allow to write properties as functions.

## 26 July 2019

### [1.16.0](https://github.com/artdecocode/typal/compare/v1.15.3...v1.16.0)

- [fix] Indent new lines in JSDoc descriptions with `*`.
- [feature] Support aliases for properties.
- [feature] Link types in a type's line tag (Closed #13).
- [feature] Link types in extends.
- [feature] Add the `link` property to be able to link types across _all files_.
- [fix] Don't warn of global API types, such as Date, Buffer, _etc_.
- [fix] Don't warn of `*` usage.

## 24 July 2019

### [1.15.3](https://github.com/artdecocode/typal/compare/v1.15.2...v1.15.3)

- [feature] Better trimming of info from XML files.
- [feature] Aliases to types.
- [feature] Narrow table for _Documentary_.

## 22 July 2019

### [1.15.2](https://github.com/artdecocode/typal/compare/v1.15.1...v1.15.2)

- [fix] Use the `<strong>` tag in props.

## 21 July 2019

### [1.15.1](https://github.com/artdecocode/typal/compare/v1.15.0...v1.15.1)

- [fix] Call flatten callback.

### [1.15.0](https://github.com/artdecocode/typal/compare/v1.14.0...v1.15.0)

- [feature] Write `extends` information and link to external source if present.
- [feature] Flatten links, i.e., don't link on the same page but to the `link`ed location straight away, and display the description (`desc`) in the title attribute.
- [feature] Narrow display style, for GitHub Wiki.

## 20 June 2019

### [1.14.0](https://github.com/artdecocode/typal/compare/v1.13.1...v1.14.0)

- [deps] Upgrade `rexml` to 2.0.0 (major).
- [fix] Print `＠` (Fullwidth Commercial At) instead of `@` in JSDoc tags (e.g., `@interface`) for _TypeScript_ [3.5](https://github.com/microsoft/TypeScript/issues/31993).

## 15 May 2019

### [1.13.1](https://github.com/artdecocode/typal/compare/v1.13.0...v1.13.1)

- [fix] Fix escaping `null` in property table.

## 9 May 2019

### [1.13.0](https://github.com/artdecocode/typal/compare/v1.12.0...v1.13.0)

- [feature] Add the `skipNsDecl` tag to prevent adding of the namespace declaration.

## 1 May 2019

### [1.12.0](https://github.com/artdecocode/typal/compare/v1.11.1...v1.12.0)

- [feature] Add tags (`@constructor/record/interface`) to JSDoc typedefs' description.

### [1.11.1](https://github.com/artdecocode/typal/compare/v1.11.0...v1.11.1)

- [fix] Print nullability in linking.

## 30 April 2019

### [1.11.0](https://github.com/artdecocode/typal/compare/v1.10.0...v1.11.0)

- [fix] Group types when optional is given to prevent merging with `undefined`.
- [fix] Don't escape `\\|` twice if the link to a type.
- [feature] Add `title` attribute to the link to a type if it has description.

### [1.10.0](https://github.com/artdecocode/typal/compare/v1.9.2...v1.10.0)

- [feature] Ignore types from the marker.

### [1.9.2](https://github.com/artdecocode/typal/compare/v1.9.1...v1.9.2)

- [package] Publish again as registry does not find `v1.9.1`.

### [1.9.1](https://github.com/artdecocode/typal/compare/v1.9.0...v1.9.1)

- [fix] Correct the imports with namespace printing and linking (including for the `rootNamespace`); return `Imports` in from the _parse_ method.

### [1.9.0](https://github.com/artdecocode/typal/compare/v1.8.0...v1.9.0)

- [feature] Pass multiple source files.

### [1.8.0](https://github.com/artdecocode/typal/compare/v1.7.0...v1.8.0)

- [feature] Pass arguments via the marker; allow to disable suppress annotations with `@suppress`.

### [1.7.0](https://github.com/artdecocode/typal/compare/v1.6.3...v1.7.0)

- [feature] Pass `-t` flag to fetch types' info from a given file.
- [doc] Fix import schema, discuss **Structural Interfaces**.

## 29 April 2019

### [1.6.3](https://github.com/artdecocode/typal/compare/v1.6.2...v1.6.3)

- [fix] Fix disabling the root namespace for multiple properties of a type.

### [1.6.2](https://github.com/artdecocode/typal/compare/v1.6.1...v1.6.2)

- [fix] Fix multiple escapes in types' names.

### [1.6.1](https://github.com/artdecocode/typal/compare/v1.6.0...v1.6.1)

- [fix] Fix order of joining function's linked args.

### [1.6.0](https://github.com/artdecocode/typal/compare/v1.5.0...v1.6.0)

- [feature] Support variable arguments linking.

### [1.5.0](https://github.com/artdecocode/typal/compare/v1.4.0...v1.5.0)

- [feature] Use `@typedefs/parser` for better types linking and source code warnings.

## 24 April 2019

### [1.4.0](https://github.com/artdecocode/typal/compare/v1.3.2...v1.4.0)

- [doc] Document schema.
- [feature] Prototypes notation, `@constructors`, `@interfaces` and `@records`; _extends_ annotations.

## 20 April 2019

### [1.3.2](https://github.com/artdecocode/typal/compare/v1.3.1...v1.3.2)

- [feature] Basic parsing of the types in a function type, to link.

## 17 April 2019

### [1.3.1](https://github.com/artdecocode/typal/compare/v1.3.0...v1.3.1)

- [fix] Fix the `bin` location.

### [1.3.0](https://github.com/artdecocode/typal/compare/v1.2.3...v1.3.0)

- [feature] Compile binary with _Google Closure Compiler_ via [_Depack_](https://artdecocode.com/depack/).
- [feature] Update library to support namespaces.
- [doc] Write documentation.

## 4 April 2019

### [1.2.3](https://github.com/artdecocode/typal/compare/v1.2.2...v1.2.3)

- [fix] Fix escape bug in property with no description.
- [deps] Unfix deps.

## 28 March 2019

### [1.2.2](https://github.com/artdecocode/typal/compare/v1.2.1...v1.2.2)

- [fix] Implement the `whitespace` argument, e.g., when used inside of classes.

## 12 March 2019

### 1.2.1

- [package] Add module and `src`.
- [fix] Escape pipes in description.
- [fix] Add space before and after `|` in piped types (todo: test when types are given inside of brackets eg `(type|type2)`).

## 25 September 2018

### 1.2.0

- [feature] Skip printing `Default` column when no properties have it.

### 1.1.0

- [feature] Parse types inside of the `Object.<string, Type>` construct.

## 24 September 2018

### 1.0.0

- Create `typal` with [`mnp`][https://mnpjs.org]
- [repository]: `src`, `test`
