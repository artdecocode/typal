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

## shows extended class with a link and description
<types>
  <import name="Server" from="http" desc="The server class to handle connections." link="https://nodejs.com/api/http.html#Server"/>
  <type extends="http.Server" name="Test"/>
</types>

/* expected */
[`import('http').Server`](https://nodejs.com/api/http.html#Server) __[`http.Server`](l-type)__: The server class to handle connections.
__[`Test`](t-type) extends <a href="https://nodejs.com/api/http.html#Server" title="The server class to handle connections.">`http.Server`</a>__
/**/

## shows extended class with a link
<types>
  <import name="Server" from="http" link="https://nodejs.com/api/http.html#Server"/>
  <type extends="http.Server" name="Test"/>
</types>

/* expected */
[`import('http').Server`](https://nodejs.com/api/http.html#Server) __[`http.Server`](l-type)__
__[`Test`](t-type) extends [`http.Server`](https://nodejs.com/api/http.html#Server)__
/**/

## shows extended class
<types>
  <import name="Server" from="http" />
  <type extends="http.Server" name="Test"/>
</types>

/* expected */
`import('http').Server` __[`http.Server`](l-type)__
__[`Test`](t-type) extends [`http.Server`](#type-httpserver)__
/**/

## shows extended strong
<types>
  <import name="Server" ns="_goa" from="http" link="https://nodejs.com/api/http.html#_section" />
  <type extends="_goa.Server" name="Test"/>
</types>

/* expected */
[`import('http').Server`](https://nodejs.com/api/http.html#_section) <strong>[`_goa.Server`](l-type)</strong>
<strong>[`Test`](t-type) extends [`_goa.Server`](https://nodejs.com/api/http.html#_section)</strong>
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
    "Type",
    "Description"
  ],
  [
    "__inspect*__",
    "<em>() => ?</em>",
    "util.inspect() implementation, which just returns the JSON output."
  ]
]
```
/**/