import typedefJsRule from './typedef/rule'
import JSDocRule from './typedef/jsdoc'
import JSTypal from './JSTypal'

export default (conf, onlyTypedef = false) => {
  const rules = onlyTypedef ? [typedefJsRule] : [typedefJsRule, JSDocRule]
  const jsTypal = new JSTypal(rules, conf)
  return jsTypal
}