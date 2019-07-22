## generates narrow table
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
    "Type & Description"
  ],
  [
    "__p*__",
    "<em>[!stream.Readable](#type-streamreadable)</em><br>Prop desc"
  ]
]
```
/**/

## correct function() ? notation
<types>
  <type name="Test">
    <prop type="function(): ?" name="inspect">
      util.inspect() implementation, which just returns the JSON output.
    </prop>
  </type>
</types>

/* expected */
__[`Test`](t-type)__

```table
[
  [
    "Name",
    "Type & Description"
  ],
  [
    "__inspect*__",
    "<em>function(): ?</em><br>util.inspect() implementation, which just returns the JSON output."
  ]
]
```
/**/