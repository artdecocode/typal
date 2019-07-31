## generates narrow table
<types>
  <import from="stream/src" ns="stream" name="Readable" />
  <type name="Test">
    <prop type="!stream.Readable" name="p">Prop desc</prop>
  </type>
</types>

/* expected */
[
  {
    "LINE": "`import('stream/src').Readable` __[`stream.Readable`](l-type)__",
    "table": ""
  },
  {
    "LINE": "__[`Test`](t-type)__",
    "table": {
      "props": [
        {
          "prop": {
            "name": "p",
            "description": "Prop desc",
            "type": "!stream.Readable",
            "closureType": "!stream.Readable",
            "hasDefault": false,
            "default": null,
            "optional": false,
            "aliases": [],
            "parsed": {
              "nullable": false,
              "name": "stream.Readable"
            },
            "noParams": false,
            "args": []
          },
          "typeName": "[!stream.Readable](#type-streamreadable)",
          "name": "p*",
          "de": "Prop desc",
          "d": "-"
        }
      ],
      "anyHaveDefault": false
    }
  }
]
/**/