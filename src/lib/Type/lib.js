import { getLinks } from '../get-links'

const removeNullable = (n) => {
  return n.replace(/^!?/, '')
}

/**
 * Generates a line for headings.
 * @param {string} Extends Comma-separated list of types that are extended.
 * @param {!Array<!_typal.Type>} allTypes All existing types for linking.
 * @param {!_typal.LinkingOptions} [opts] Linking options.
 */
export const markdownExtendsList = (Extends, allTypes, opts = {}) => {
  function getName(n) {
    let r = removeNullable(n)
    r = `\`${n}\``
    return r
  }
  const E = Extends.split(/,\s*/).map((ee) => {
    const rr = getLinks(allTypes, ee, {
      flatten: true,
      ...opts,
      nameProcess: opts.nameProcess ? (n) => {
        const p = opts.nameProcess(n)
        if (/[_*~>]/.test(p)) return `<code>${p}</code>`
        return getName(p)
      } : getName,
    })
    return rr
  })
  return E.join(', ')
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').LinkingOptions} _typal.LinkingOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types').Type} _typal.Type
 */