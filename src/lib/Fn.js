import Property from './Property'

/**
 * This is a property of a constructor/interface which is a function.
 * @implements {_typal.Fn}
 */
export default class Fn extends Property {
  constructor(...args) {
    super(...args)
    /**
     * Whether this is an async function.
     */
    this.async = false
    /**
     * If this property of a type is its constructor.
     */
    this.isConstructor = false
    /**
     * The return type.
     */
    this.return = ''
  }
  fromXML(content, props) {
    super.fromXML(content, props)
    if (props['name'] == 'constructor') {
      this.isConstructor = true
    }
    this.async = props.async
    this.return = props.return
  }
}