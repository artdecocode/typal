import Zoroaster from 'zoroaster'

/**
 * A testing context for the package.
 */
export default class Context {
  static get BIN() {
    return process.env.ALAMODE_ENV == 'test-build' ? 'build/bin/typal' : 'src/bin'
  }
}

export class MarkdownSnapshot extends Zoroaster {
  static get snapshotExtension() { return 'md' }
}