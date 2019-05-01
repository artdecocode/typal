{closure: true}

## generates both ns and non-ns types for Closure
/**
 * @param {ns.Conf} param
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */


/*@ expected */
/**
 * @param {ns.Conf} param config
 * @param {string} param.propName The prop description.
 */
var a = (param) => {}

/* typal test/fixture/ns.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {ns.Conf} Conf config
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} ns.Conf config
 * @prop {string} propName The prop description.
 */

/*@*/

## generates closure types
/**
 * @param {ns.Test} param
 */
var a = (param) => {}

/* typal test/temp/types.xml */


/*@ types */
<types namespace="ns">
  <type name="Test" desc="test">
    <prop type="(i: number) => string" closure="function(number): string" name="prop">
      The property.
    </prop>
  </type>
</types>
/*@*/

/*@ expected */
/**
 * @param {ns.Test} param test
 * @param {function(number): string} param.prop The property.
 */
var a = (param) => {}

/* typal test/temp/types.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {ns.Test} Test test
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} ns.Test test
 * @prop {function(number): string} prop The property.
 */

/*@*/

## generates imports
/**
 * @param {stream.Readable} readable
 */
var a = (param) => {}

/* typal test/temp/types.xml */


/*@ types */
<types namespace="ns">
  <import from="stream" name="Readable" />
  <import from="restream" name="ReplaceableInterface" ns="_restream" />
</types>
/*@*/

/*@ expected */
/**
 * @param {stream.Readable} readable
 */
var a = (param) => {}

/* typal test/temp/types.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').Readable} stream.Readable
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').ReplaceableInterface} _restream.ReplaceableInterface
 */

/*@*/

## adds tags
/* typal test/temp/types.xml noSuppress */


/*@ types */
<types namespace="ns">
  <type record name="Record" desc="Hello"/>
  <type constructor name="Constructor" desc="World"/>
  <type interface name="Interface" />
</types>
/*@*/

/*@ expected */
/* typal test/temp/types.xml noSuppress */
/**
 * @typedef {ns.Record} Record `@record` Hello
 */
/**
 * @typedef {Object} ns.Record `@record` Hello
 */
/**
 * @typedef {ns.Constructor} Constructor `@constructor` World
 */
/**
 * @typedef {Object} ns.Constructor `@constructor` World
 */
/**
 * @typedef {ns.Interface} Interface `@interface`
 */
/**
 * @typedef {Object} ns.Interface `@interface`
 */

/*@*/