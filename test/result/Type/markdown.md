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
    "<em>boolean</em>",
    "Prop desc"
  ],
  [
    "p1",
    "<em>string</em>",
    "Prop desc"
  ]
]
```
/**/

## escapes the types correctly
<types>
  <type name="Test">
    <prop type="string|number" name="p">Prop desc</prop>
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
    "<em>(string \\| number)</em>",
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
    "<em>[!stream.Readable](#type-streamreadable)</em>",
    "Prop desc"
  ]
]
```
/**/

## generates the table for imports with namespace
<types>
  <import from="stream/src" ns="stream" name="Readable" />
  <type name="Test">
    <prop type="!stream.Readable" name="p">Prop desc</prop>
  </type>
</types>

/* expected */
`import('stream/src').Readable` __[`stream.Readable`](l-type)__
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
    "<em>[!stream.Readable](#type-streamreadable)</em>",
    "Prop desc"
  ]
]
```
/**/