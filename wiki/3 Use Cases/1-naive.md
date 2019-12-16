<!-- ### Example -->
The example given below will illustrate why _Typal_ is extremely useful as the tool both for plain JSDoc management and JSDoc for _Google Closure Compiler_ workflow.

_**[Naïve approach](##)**: Let's implement a transform stream that updates data using regular expressions specified in the constructor:_

<table>
<tr/>
<tr><td>

%EXAMPLE: example/restream%
<hr>

%EXAMPLE: example/restream/index-types%
</td></tr>
</table>

In the file, we have defined a type using typedef, and imported a type from the internal Node.JS API. All is well, and we get our _JSDoc_ autosuggestions that help us understand that what we're doing is correct.

<p align="center">
  [[restream1.gif|width=500|alt=JSDoc autosuggestions for defined types.]]
</p>

However, there are 2 problems with that:

1. _Google Closure Compiler_ does not understand typedefs a) without `var`iable declaration underneath, b) with `@prop`erties and c) with functions in `(...args: string) => string` notation. The format for _GCC_ typedef for our example would be the one below. And if we tried to use it, VSCode would not understand it, and we would loose the description of individual properties of the type.
    ```js
    /**
     * @typedef {{ regex: RegExp, replacement: function(...string): string }}
     */
    var Rule

    // or, as a record type

    /** @record */
    var Rule
    /** @type {RegExp} */
    Rule.prototype.regex
    /**
     * @param {...string} args
     * @returns {string}
     */
    Rule.prototype.replacement = function(...args) {}
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
1. When trying to create a new _Restream_ instance, it is not clear what properties the _Rule_ type should have, because _VSCode_ does not expand that information:
    <p align="center">
      [[restream2.png|alt=VSCode does not show properties of a type.]]
    </p>

%~%