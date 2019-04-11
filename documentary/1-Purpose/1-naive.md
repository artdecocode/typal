### Example

This example will illustrate why _Typal_ is extremely useful as the tool both for plain JSDoc management and JSDoc for _Google Closure Compiler_ workflow.

_**[Naïve approach](t)**: Let's implement a transform stream that updates data using regular expressions specified in the constructor:_

%EXAMPLE: example/restream%

In the file, we have defined a type using typedef, and imported a type from the internal Node.JS API. All is well, and we get our _JSDoc_ autosuggestions that help us understand that what we're doing is correct.

![JSDoc autosuggestions for defined types](doc/restream1.gif)

However, there are 2 problems with that:

1. _Google Closure Compiler_ does not understand typedefs a) without `var`iable declaration underneath, b) with `@prop`erties and c) with functions in `(...args: string) => string` notation. The format for _GCC_ typedef for our example would be the one below. And if we tried to use it, VSCode would not understand it, and we would loose the description of individual properties of the type.
    ```js
    /**
     * @typedef {{ regex: RegExp, replacement: function(...string): string }}
     */
    var Rule
    ```
1. _Google Closure Compiler_ does not understand `@typedef {import('from').Name}` syntax. It is currently not supported, and to be able to reference types from other packages, they must have externs. So for the _TransformOptions_, we need `stream.TransformOptions` externs. To reference types from the same package but across files, _GCC_ will need types to be imported as ES6 imports (like how things were in 2018), e.g.,
    ```js
    import Rule from './src' // pre-typedef import
    /**
     * @param {Rule} rule
     */
    const fn = (rule) => {}
    ```
1. The documentation that we wrote as _JSDoc_ type declarations has to be copied and pasted into the `README.md` file manually, and all tables need to be also constructed.
1. It is not clear what interface the _Rule_ type adheres to, because _VSCode_ does not show that information:
    <p align="center">
      <img src="doc/restream2.png" title="VSCode does not show properties of a type">
    </p>