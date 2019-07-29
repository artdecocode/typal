## Schema

The XML schema supports types, imports, properties and functions (which are aliases to properties with special attributes used to construct a function type).

<kbd>📝 [Typal Schema](../../wiki/Schema)</kbd>

```xml
<types>
  <import from="http" name="IncomingMessage"
    link="https://nodejs.org/api/http.html#incoming_message"
    desc="The readable stream from the connection." />

  <type name="Example" >
    <prop type="string" name="test">The property.</prop>
    <fn async args="number" return="boolean">A method property.</fn>
  </type>
</types>
```

%~%