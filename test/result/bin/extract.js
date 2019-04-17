// extracts the types
--migrate

/*@ program */
/**
 * @typedef {Object} test The test.
 * @prop {string} hello The hello property.
 * @prop {number} [world=10] The world property.
 * @prop {boolean} [universe=true] The universe property.
 * @prop {Type} type The type property.
 */
/*@*/

/*@ stdout */
<types>
  <type name="test" desc="The test.">
    <prop string name="hello">
      The hello property.
    </prop>
    <prop number name="world" default="10">
      The world property.
    </prop>
    <prop boolean name="universe" default="true">
      The universe property.
    </prop>
    <prop type="Type" name="type">
      The type property.
    </prop>
  </type>
</types>
/*@*/

// extracts imports
-m -o test/temp/types.xml

/*@ program */
/**
 * @typedef {import('stream').Transform} Transform The transform.
 * @typedef {Transform} Transformed The transformed type.
 */
/*@*/

/*@ expected */
<types>
  <import name="Transform" from="stream" />
  <type name="Transformed" type="Transform" desc="The transformed type." />
</types>
/*@*/