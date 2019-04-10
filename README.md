# typal

[![npm version](https://badge.fury.io/js/typal.svg)](https://npmjs.org/package/typal)

`typal` Keeps Types In XML files And Converts Them To (1) JavaScript JSDoc, (2) Closure Externs and (3) Markdown Documentation. It is the alternative to TypeScript definitions and utilises the power of JSDoc for excellent developer experience, documentation readability and compiler annotation. It also makes integration between Google Closure Compiler and VSCode easy, using the JSDoc notations that are understood by both at the same time.

```sh
yarn add -E typal
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`typal(arg1: string, arg2?: boolean)`](#typalarg1-stringarg2-boolean-void)
- [Optional And Default](#optional-and-default)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import typal from 'typal'
```

### `typal(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example/ */
import typal from 'typal'

(async () => {
  await typal()
})()
```

```

```

Optional And Default
---

- Optional (`opt`) means that the property of a type can be `undefined`.
- Default (`default`) means that when not given, the property will take the `default` value.
- In configs, default implies optional. However, in other types, it does not have to be so.
- Currently, default will trigger optional. Possibly fix that and make specifying optionals implicit.
## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>