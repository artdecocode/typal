## generates table for properties
{ "name": "prop1",
"description": "`echo abc | node consume.js`",
"type": "string" }

/* expected */


```table
[
  [
    "Name",
    "Type",
    "Description"
  ],
  [
    "__prop1*__",
    "<em>string</em>",
    "`echo abc \\| node consume.js`"
  ]
]
```
/**/

## adds spaces to typedef pipes
{ "name": "prop1",
"description": "The prop.",
"type": "(string|number)" }

/* expected */


```table
[
  [
    "Name",
    "Type",
    "Description"
  ],
  [
    "__prop1*__",
    "<em>(string \\\\| number)</em>",
    "The prop."
  ]
]
```
/**/
