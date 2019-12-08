After _Closure_ compilation, the source code will loose all annotated types.

[[Templates/lostTypes.png|alt=The types annotations from JSDoc become lost.]]

To enable types again for developer experience of those who will use the package, the types need to be overridden. This can be achieved with the **template** feature of _Typal_. The process is the following:

1. Create the `src/depack.js` file that imports APIs from the source, and assigns them to `module.exports` object using quoted props notation, so that the properties don't get renamed, for example:
    %EXAMPLE: src/depack.js%
1. Compile the source code into `compile/package-name.js` file using the `depack` command:
    ```json5
    {
      "compile": "depack src/depack -c -o compile/package-name.js -a -p -s -O 2018 --source_map_include_content"
    }
    ```
1. Create a template file `compile/template.js`, that requires the compiled file:
    %EXAMPLE: src/template.js%
1. Run _Typal_ to include the correct annotations, with `-t` argument pointing to the folder with all types (each XML file will be read recursively):
    ```sh
    typal compile/template.js -T compile/index.js -t types
    ```

The tags supported by the template are `@methodType` and `@fnType`, where the method type is used to enrich methods with _JSDoc_, and the function type is used to place _JSDoc_ above methods of a class.