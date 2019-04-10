## generates the table
<types>
  <type name="Test">
    <prop boolean name="p">Prop desc</prop>
    <prop opt string name="p1">Prop desc</prop>
  </type>
</types>

/* expected */
__[`Test`](t-type)__

```table
[
  [
    "Name",
    "Type",
    "Description"
  ],
  [
    "__p*__",
    "_boolean_",
    "Prop desc"
  ],
  [
    "p1",
    "_string_",
    "Prop desc"
  ]
]
```
/**/

## generates the table for imports
<types>
  <import from="stream" name="Readable" />
  <type name="Test">
    <prop type="!stream.Readable" name="p">Prop desc</prop>
  </type>
</types>

/* expected */
`import('stream').Readable` __[`stream.Readable`](l-type)__
__[`Test`](t-type)__

```table
[
  [
    "Name",
    "Type",
    "Description"
  ],
  [
    "__p*__",
    "_[!stream.Readable](#type-streamreadable)_",
    "Prop desc"
  ]
]
```
/**/