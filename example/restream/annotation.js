import { Restream } from './compat'

/**
 * The rule to enable `<em>` tag conversion from Markdown.
 * @type {_restream.Rule}
 */
const rule = {
  regex: /__(.+?)__/,
  replacement(match, s) {
    return `<em>${s}</em>`
  },
}
const restream = new Restream(rule)

restream.pipe(process.stdout)
restream.end('__hello world__')

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */