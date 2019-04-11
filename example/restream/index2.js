import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the regular expression.
   * @param {Rule} rule The replacement rule.
   * @param {RegExp} rule.regex The regular expression.
   * @param {(...args:string) => string} rule.replacements The function used to update input.
   * @param {TransformOptions} [options] Additional options for _Transform_.
   */
  constructor(rule, options) {
    super(options)
    this.rule = rule
  }
  // ...
}

/* typal example/restream/types.xml */
/**
 * @typedef {import('stream').TransformOptions} stream.TransformOptions
 */
/**
 * @typedef {Object} Rule The replacement rule.
 * @prop {RegExp} regex The regular expression.
 * @prop {(...args:string) => string} replacements The function used to update input.
 */
