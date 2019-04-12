# Typal: Smart Typedefs

_Typal_ allows to organise typedefs by keeping them in separate XML files, and then embed them into the source code as JSDoc annotations, README documentation as nicely formatted tables, and _Google Closure Compiler_ externs as type definitions. It is the alternative to managing types using _TypeScript_ and is meant for JavaScript developers who want the best developer experience in their IDE along with ultimate power of the _Closure_ compiler that optimises the code and produces a single executable program or library file where all dependencies are put together. The goals for the project are the following:

<ul>
* Allow to keep types in separate file according to an XML schema, to eliminate the need to manually copy and paste documentation between the source code and README files, and embed and update it in both places instantly.
* Befriend _VSCode_ and _Google Closure Compiler_, making it possible to use types for hints during the development process, as well as for compilation by machines.
* Generate good-looking tables for markdown, so that the information is quickly and easily accessible to people reading the documentation, and allow them to jump between types using links, and link external documentation.
* Provide the means to create externs files from existing types information so that packages can be compiled and type-checked using the _Closure_ compiler, including Node.JS source code.
* Improve the visibility of functions' API by automatically expanding the properties of arguments above functions.
</ul>

<section-break/>