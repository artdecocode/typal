## Purpose

The main purpose of this package is to generate _JSDoc_ annotations that are understood both by _VSCode_, and compatible with _Google Closure Compiler_ via its externs system. The project deliberately deviates from _TypeScript_ and is meant for _JavaScript_ development, and it proves that typing can be achieved perfectly well with _JSDoc_. It's idea is to store files in an XML file, and then embed them in JS and README files and externs.

_For example, lets implement a transform stream that updates data using regular expressions specified in the constructor:_

%EXAMPLE: example/restream%

In the file, we have defined a type using typedef, and imported a type from the internal Node.JS API. All is well, and we get our _JSDoc_ autosuggestions that help us understand that what we're doing is correct.

![JSDoc autosuggestions for defined types](doc/restream1.gif)

However, there are 2 problems with that:

1. _Google Closure Compiler_ does not understand typedefs without variables. The format for _GCC_ typedefs is the following one:
    ```js
    /**
     * @typedef {{ regex: RegExp, replacement: function(...string): string }}
     */
    var Rule
    ```
1. _Google Closure Compiler_ does not understand imports syntax. It is currently not supported, and to be able to reference files from other packages, there need to be externs. So for the _TransformOptions_, we need `stream.TransformOptions` externs.
1. The documentation that we wrote as JSDoc type declarations, has to be copied and pasted into the README file manually, and all tables need to be also constructed.
1. It is not clear what interface the _Rule_ type adheres to, because _VSCode_ does not show that information:
    ![VSCode does not show properties of a type](doc/restream2.png)

%~%