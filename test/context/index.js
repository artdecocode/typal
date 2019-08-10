import { c } from 'erte'
import Zoroaster from 'zoroaster'

/**
 * A testing context for the package.
 */
export default class Context {
  static get BIN() {
    const [,, line] = new Error().stack.split('\n', 3)
    const [, from] = /\((.+?)\)$/.exec(line)
    if (process.env.ALAMODE_ENV == 'test-compile') {
      const b = 'compile/bin/typal.js'
      console.log('Testing %s at %s', c(b, 'yellow'), from)
      return b
    } else return 'src/bin'
  }
  get typesLocation() {
    return 'test/fixture/types.xml'
  }
}

export class MarkdownSnapshot extends Zoroaster {
  static get snapshotExtension() { return 'md' }
}
export class XmlSnapshot extends Zoroaster {
  static get snapshotExtension() { return 'xml' }
}