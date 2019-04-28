## 29 April 2019

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
