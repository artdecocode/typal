import { throws } from 'assert'
import { equal } from '@zoroaster/assert'
import Zoroaster from 'zoroaster'
import Property from '../../src/lib/Property'

class context {
  get desc() {
    return 'Test description.'
  }
  /** Property name. */
  get name() {
    return 'test'
  }
  /** A property instance. */
  get p() {
    return new Property()
  }
  get type() {
    return 'Type'
  }
  /** The parent parameter, e.g., `config` in `@param {string} config.param` */
  get parentParam() {
    return 'config'
  }
}

/** @type {Object.<string, (c: context)>} */
const PropertyFromXml = {
  context: [context, class extends Zoroaster {
    /**
     * @param {Property} prop
     */
    static serialise(prop) {
      return { ...prop }
    }
  }],
  'creates a string property'({ p, name, desc }) {
    const props = { string: true, name }
    p.fromXML(desc, props)
    return p
  },
  'creates a number property with default'({ p, name, desc }) {
    const props = { number: true, name, default: 0 }
    p.fromXML(desc, props)
    return p
  },
  'creates a boolean property'({ p, name, desc }) {
    const props = { boolean: true, name, default: false }
    p.fromXML(desc, props)
    return p
  },
  'creates a custom type property'({ p, name, type, desc }) {
    const props = { name, type, opt: true }
    p.fromXML(desc, props)
    return p
  },
  'creates any type property'({ p, name, desc }) {
    const props = { name }
    p.fromXML(desc, props)
    return p
  },
  'creates a property without description'({ p, name }) {
    const props = { name }
    p.fromXML('', props)
    return p
  },
  'throws an error when no name is given'({ p }) {
    throws(() => {
      p.fromXML('test', {})
    }, 'Property does not have a name.')
  },
}

/** @type {Object.<string, Object.<string, (c: context )>>} */
const PropertyToPropParam = {
  context,
  'writes a string property': {
    'required'({ p, name, desc, parentParam }) {
      const props = { string: true, name }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {string} ${name} ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {string} ${parentParam}.${name} ${desc}`)
    },
    'optional'({ p, name, desc, parentParam }) {
      const props = { string: true, name, opt: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {string} [${name}] ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {string} [${parentParam}.${name}] ${desc}`)
    },
    'default'({ p, name, desc, parentParam }) {
      const d = 'test'
      const props = { string: true, name, default: d }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {string} [${name}="${d}"] ${desc} Default \`${d}\`.`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {string} [${parentParam}.${name}="${d}"] ${desc} Default \`${d}\`.`)
    },
  },
  'writes a boolean property': {
    'required'({ p, name, desc, parentParam }) {
      const props = { boolean: true, name }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {boolean} ${name} ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {boolean} ${parentParam}.${name} ${desc}`)
    },
    'optional'({ p, name, desc, parentParam }) {
      const props = { boolean: true, name, opt: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {boolean} [${name}] ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {boolean} [${parentParam}.${name}] ${desc}`)
    },
    'default (true)'({ p, name, desc, parentParam }) {
      const props = { boolean: true, name, default: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {boolean} [${name}=true] ${desc} Default \`true\`.`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {boolean} [${parentParam}.${name}=true] ${desc} Default \`true\`.`)
    },
    'default (false)'({ p, name, desc, parentParam }) {
      const props = { boolean: true, name, default: false }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {boolean} [${name}=false] ${desc} Default \`false\`.`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {boolean} [${parentParam}.${name}=false] ${desc} Default \`false\`.`)
    },
  },
  'writes a number property': {
    'required'({ p, name, desc, parentParam }) {
      const props = { number: true, name }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {number} ${name} ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {number} ${parentParam}.${name} ${desc}`)
    },
    'optional'({ p, name, desc, parentParam }) {
      const props = { number: true, name, opt: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {number} [${name}] ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {number} [${parentParam}.${name}] ${desc}`)
    },
    'default'({ p, name, desc, parentParam }) {
      const d = 10
      const props = { number: true, name, default: d }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {number} [${name}=${d}] ${desc} Default \`${d}\`.`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {number} [${parentParam}.${name}=${d}] ${desc} Default \`${d}\`.`)
    },
  },
  'writes a custom type property': {
    'required'({ p, name, desc, parentParam, type }) {
      const props = { name, type }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {${type}} ${name} ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {${type}} ${parentParam}.${name} ${desc}`)
    },
    'optional'({ p, name, desc, parentParam, type }) {
      const props = { name, type, opt: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {${type}} [${name}] ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {${type}} [${parentParam}.${name}] ${desc}`)
    },
    'default'({ p, name, desc, parentParam, type }) {
      const d = 'hello-world'
      const props = { name, type, default: d }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {${type}} [${name}="${d}"] ${desc} Default \`${d}\`.`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {${type}} [${parentParam}.${name}="${d}"] ${desc} Default \`${d}\`.`)
    },
  },
  'writes any type property': {
    'required'({ p, name, desc, parentParam }) {
      const props = { name }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {*} ${name} ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {*} ${parentParam}.${name} ${desc}`)
    },
    'optional'({ p, name, desc, parentParam }) {
      const props = { name, opt: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {*} [${name}] ${desc}`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {*} [${parentParam}.${name}] ${desc}`)
    },
    'default'({ p, name, desc, parentParam }) {
      const props = { name, default: true }
      p.fromXML(desc, props)
      const prop = p.toProp()
      equal(prop, ` * @prop {*} [${name}=true] ${desc} Default \`true\`.`)
      const param = p.toParam(parentParam)
      equal(param, ` * @param {*} [${parentParam}.${name}=true] ${desc} Default \`true\`.`)
    },
  },
  'writes a prop without description'({ p, name, parentParam }) {
    const props = { name }
    p.fromXML('', props)
    const prop = p.toProp()
    equal(prop, ` * @prop {*} ${name}`)
    const param = p.toParam(parentParam)
    equal(param, ` * @param {*} ${parentParam}.${name}`)
  },
}

const T = {
  'property from xml': PropertyFromXml,
  'property to prop/param': PropertyToPropParam,
}

export default T