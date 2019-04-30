const typedefJsRule = require('./typedef/rule');
const JSDocRule = require('./typedef/jsdoc');
const JSTypal = require('./JSTypal');

module.exports=(conf, onlyTypedef = false) => {
  const rules = onlyTypedef ? [typedefJsRule] : [typedefJsRule, JSDocRule]
  const jsTypal = new JSTypal(rules, conf)
  return jsTypal
}