import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the regular expression.
   * @param {_restream.Rule} rule The replacement rule.
   * @param {!RegExp} rule.regex The regular expression.
   * @param {function(...string): string} rule.replacement The function used to update input.
   * @param {stream.TransformOptions} [options] Additional options for _Transform_.
   */
  constructor(rule, options) {
    super(options)
    this.rule = rule
  }
  _transform(chunk, enc, next) {
    this.push(
      `${chunk}`.replace(this.rule.regex, this.rule.replacement)
    )
    next()
  }
}

/* typal example/restream/types2.xml */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_restream.Rule} Rule The replacement rule.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {Object} _restream.Rule The replacement rule.
 * @prop {!RegExp} regex The regular expression.
 * @prop {function(...string): string} replacement The function used to update input.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {_restream.Rules} Rules Multiple replacement rules.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {!Array<!_restream.Rule>} _restream.Rules Multiple replacement rules.
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('stream').TransformOptions} stream.TransformOptions
 */
