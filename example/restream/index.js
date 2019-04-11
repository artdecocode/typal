import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the
   * regular expression.
   * @param {Rule} rule The replacement rule.
   * @param {TransformOptions} [options] Additional options for
   * _Transform_.
   */
  constructor(rule, options) {
    super(options)
    this.rule = rule
  }
  _transform(chunk, enc, next) {
    this.push(
      `${chunk}`.replace(this.rule., this.rule.replacer)
    )
    next()
  }
}

/**
 * @typedef {Object} Rule
 * @prop {RegExp} regex The regular expression.
 * @prop {(...args:string) => string} replacer The regular expression.
 * @typedef {import('stream').TransformOptions} TransformOptions
 */