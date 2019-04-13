import Zoroaster from 'zoroaster'

/**
 * A testing context for the package.
 */
export default class Context {
  static get BIN() {
    return process.env.ALAMODE_ENV == 'test-build' ? 'depack/bin/typal' : 'src/bin'
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