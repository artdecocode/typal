The difference between `default` and `initial` attributes on a property is the following:

- **default** is used for records, such as configs, and will set the property to be optional which means that in addition to specified types, it will be able to take the _undefined_ type.
- **initial** is used for interfaces and constructors, which will initialise the property in their constructor to the given initial value, however the property is not optional anymore, since it will always be present on the type.

_For example, given the following types_:

%EXAMPLE: doc-wiki/Default-And-Initial/types.xml%

_The next externs will be generated:_

<fork lang="js">src/bin doc-wiki/Default-And-Initial/externs.js -o -</fork>

Whereas the _default_ can be set both on records, and primitive records (`{}`), it does not really make sense to set _initial_ value on the latter since they will never have a chance to initialise the initial variable.

The need to set _default_ arises from the fact that configs passed to functions can be assigned a default value by the function itself.

%EXAMPLE: doc-wiki/Default-And-Initial/config.js%