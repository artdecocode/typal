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