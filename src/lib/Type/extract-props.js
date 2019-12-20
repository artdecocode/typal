import extractTags from 'rexml'
import Property from '../Property'
import Fn from '../Fn'
import { extractArgs } from '../Arg'
import { toType, updateExampleProp } from '../'

/**
 * Extract properties from the body of a type (or constructor/interface).
 * @param {string} content
 * @param {string} rootNamespace
 * @param {string|null} file
 * @param {string} fullName
 */
export default function extractProperties(content, rootNamespace, file, fullName) {
  const ps = extractTags('prop', content)
  const props = ps.map(({ content: c, props: p }) => {
    const pr = new Property()
    updateExampleProp(p, file)
    pr.fromXML(c, p)
    return pr
  })
  const functions = extractTags(['function', 'fn', 'static'], content)

  const fnProps = functions.map(({ content: c, props: p, tag }) => {
    const isStatic = tag == 'static'
    const { newContent, argsArgs } = extractArgs(c, rootNamespace)

    const pr = new Fn(argsArgs)
    const { rest, fnType } = toType(p, argsArgs, fullName)
    rest['type'] = fnType

    updateExampleProp(rest, file)
    pr.fromXML(newContent, rest)
    if (isStatic) pr._static = true
    return pr
  })
  const all = [...props, ...fnProps]
  const { c, s, n } = all.reduce((acc, p) => {
    if (p.isConstructor) acc.c.push(p)
    else if (p.static) acc.s.push(p)
    else acc.n.push(p)
    return acc
  }, { c: [], s: [], n: [] })
  /** @type {Fn} */
  const constructor = c[0] || null
  return { constructor, properties: [...c, ...s, ...n] }
}