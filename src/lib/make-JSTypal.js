import { makeMarkers, makeCutRule, makePasteRule } from 'restream'
import typedefJsRule from './typedef/rule'
import JSDocRule from './typedef/jsdoc'
import JSTypal from './JSTypal'

export default (conf, onlyTypedef = false) => {
  const { externsTypedef } = makeMarkers({
    externsTypedef: /^\/\*\*? (documentary|typal) (.+?) externs (.*?)\*\/\n(?:([^\n][\s\S]+?\n))?$/mg,
  })
  // to exclude @params in externs block from JSDoc warnings
  const cr = makeCutRule(externsTypedef)
  const pr = makePasteRule(externsTypedef)
  const rules = onlyTypedef ? [typedefJsRule] : [typedefJsRule,
    cr,
    JSDocRule,
    pr,
  ]
  const jsTypal = new JSTypal(rules, conf)
  return jsTypal
}