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
