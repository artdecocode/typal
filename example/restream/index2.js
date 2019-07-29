import { Transform } from 'stream'

export class Restream extends Transform {
  /**
   * Sets up a transform stream that updates data using the regular expression.
   * @param {!_restream.Rule} rule The replacement rule.
   * @param {!RegExp} rule.regex The regular expression.
   * @param {(...args:string) => string} rule.replacement Updates matches.
   * @param {!stream.TransformOptions} [options] Additional _Transform_ props.
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