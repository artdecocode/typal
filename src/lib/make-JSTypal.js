import typedefJsRule from './typedef/rule'
import JSDocRule from './typedef/jsdoc'
import JSTypal from './JSTypal'

export default (conf) => {
  const jsTypal = new JSTypal([typedefJsRule, JSDocRule], conf)
  return jsTypal
}