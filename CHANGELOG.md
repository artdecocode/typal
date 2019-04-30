## 30 April 2019

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
