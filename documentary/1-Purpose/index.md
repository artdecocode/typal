## Purpose

The main purpose of this package is to generate _JSDoc_ annotations that are understood both by _VSCode_, and compatible with _Google Closure Compiler_ via its externs system. The project deliberately deviates from _TypeScript_ and is meant for _JavaScript_ development, and it proves that typing can be achieved perfectly well with _JSDoc_. It's idea is to store files in an XML file, and then embed them in JS and README files and externs.

The solutions provided by _Typal_ are:

1. Manage types from an external XML location.
1. Compile types for JSDoc compatible both with _GCC_ and _VSCode_.
1. Compile types as externs for _GCC_ and use in other packages.
1. Place types' descriptions as formatted tables in markdown (used in [_Documentary_](https://github.com/artdecocode/documentary)).
1. Improve the DevX by increasing the visibility of functions' APIs.

---
