{ flatten: true }

## adds a link in type top-line description
<types>
  <import name="Server" ns="_goa" from="http" link="https://nodejs.com/api/http.html#_section" />
  <type type="function(_goa.Server)" name="Test"/>
</types>

/* expected */
[`import('http').Server`](https://nodejs.com/api/http.html#_section) <strong>[`_goa.Server`](l-type)</strong>
<code>function([_goa.Server](https://nodejs.com/api/http.html#_section))</code> __[`Test`](t-type)__
/**/

## adds links with multiple extends
<types>
  <import name="one" from="http" link="https://1" />
  <import name="two" from="http" link="https://2" />
  <type name="Test" interface extends="http.one,http.two"/>
</types>

/* expected */
[`import('http').one`](https://1) __[`http.one`](l-type)__
[`import('http').two`](https://2) __[`http.two`](l-type)__
__[`Test`](t-type) extends <a href="https://1">`http.one`</a>, <a href="https://2">`http.two`</a>__
/**/