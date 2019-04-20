const typedefJsRule = require('./typedef/rule');
const JSDocRule = require('./typedef/jsdoc');
const JSTypal = require('./JSTypal');

module.exports=(conf) => {
  const jsTypal = new JSTypal([typedefJsRule, JSDocRule], conf)
  return jsTypal
}