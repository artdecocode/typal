## adds examples
<types namespace="typal">
  <interface name="Component" desc="The component.">
    <fn example="test/fixture/examples/2.js" name="fn">
      The function.
    </fn>
    <fn example="test/fixture/examples/goa.js" name="fn2">
      Another function.
    </fn>
  </interface>
</types>

/*@ expected */
/* typal test/temp/types.xml namespace */
/**
 * @typedef {typal.Component} Component `＠interface` The component.
 * @typedef {Object} typal.Component `＠interface` The component.
 * @prop {() => ?} fn The function.
 * another example
 * 2.js
 * ```js
 * console.log('hello')
 *
 * ```
 * some text
 * ```js
 * console.log('world')
 * ```
 * @prop {() => ?} fn2 Another function.
 * - Accept: text/＊
 * ```js
 * ctx.request.accepts('html') // => "html"
 * ```
 */

/*@*/