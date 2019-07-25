import { equal } from '@zoroaster/assert'
import { getLinks } from '../../src/lib/Type'

/** */
const ts = {
  context: {
    allTypes: [{ fullName: 'Type' }],
    wrapApp(app) {
      return `&lt;${app}&gt;`
    },
  },
  'links a type'({ allTypes }) {
    const type = 'Type'
    const res = getLinks(allTypes, type)
    equal(res, '[Type](#type-type)')
  },
  'records': {
    'links a record'({ allTypes }) {
      const type = '{ a, b: Type }'
      const res = getLinks(allTypes, type)
      equal(res, '{ a, b: [Type](#type-type) }')
    },
    'links a record with multiple types'({ allTypes }) {
      const type = '{ a, b: Type, c: Type }'
      const res = getLinks(allTypes, type)
      equal(res, '{ a, b: [Type](#type-type), c: [Type](#type-type) }')
    },
  },
  'unions': {
    'links a union'({ allTypes }) {
      const type = '(Type | string)'
      const res = getLinks(allTypes, type)
      equal(res, '([Type](#type-type) \\| string)')
    },
    'links a multiple union'({ allTypes }) {
      const type = '(Type | Type)'
      const res = getLinks(allTypes, type)
      equal(res, '([Type](#type-type) \\| [Type](#type-type))')
    },
  },
  'applications': {
    'links Promises'({ allTypes, wrapApp }) {
      const type = '!Promise<!Type>'
      const res = getLinks(allTypes, type)
      equal(res, `!Promise${wrapApp('[!Type](#type-type)')}`)
    },
    'links Arrays'({ allTypes, wrapApp }) {
      const type = '!Promise<!Array<Type>>'
      const res = getLinks(allTypes, type)
      equal(res, `!Promise${wrapApp(`!Array${wrapApp('[Type](#type-type)')}`)}`)
    },
    'links nested Types'({ allTypes, wrapApp }) {
      const type = '!Promise<!Type<Type>>'
      const res = getLinks(allTypes, type)
      let w = `[!Type](#type-type)${wrapApp('[Type](#type-type)')}`
      w = `!Promise${wrapApp(w)}`
      equal(res, w)
    },
    'links Objects'({ allTypes, wrapApp }) {
      const type = 'Object<string, !Type>'
      const res = getLinks(allTypes, type)
      equal(res, `Object${wrapApp('string, [!Type](#type-type)')}`)
    },
    'links nested Objects'({ allTypes, wrapApp }) {
      const type = 'Object<string, !Object<!Type>>'
      const res = getLinks(allTypes, type)
      let w = '!Object' + wrapApp('[!Type](#type-type)')
      equal(res, `Object${wrapApp(`string, ${w}`)}`)
    },
    'links Objects with dot'({ allTypes, wrapApp }) {
      const type = 'Object.<string, !Type>'
      const res = getLinks(allTypes, type)
      equal(res, `Object${wrapApp('string, [!Type](#type-type)')}`)
    },
  },
  'functions': {
    'links args'({ allTypes }) {
      const type = 'function(Type)'
      const res = getLinks(allTypes, type)
      equal(res, 'function([Type](#type-type))')
    },
    'links return'({ allTypes }) {
      const type = 'function(): Type'
      const res = getLinks(allTypes, type)
      equal(res, 'function(): [Type](#type-type)')
    },
    'links application return'({ allTypes, wrapApp }) {
      const type = 'function(): Array<Type>'
      const res = getLinks(allTypes, type)
      equal(res, `function(): Array${wrapApp('[Type](#type-type)')}`)
    },
    'links this'({ allTypes }) {
      const type = 'function(this: Type)'
      const res = getLinks(allTypes, type)
      equal(res, 'function(this: [Type](#type-type))')
    },
    'links this and args'({ allTypes }) {
      const type = 'Function(this: Type, Type)'
      const res = getLinks(allTypes, type)
      equal(res, 'Function(this: [Type](#type-type), [Type](#type-type))')
    },
    'links variable args'({ allTypes }) {
      const type = 'function(...Type)'
      const res = getLinks(allTypes, type)
      equal(res, 'function(...[Type](#type-type))')
    },
    'escapes return union correctly'({ allTypes }) {
      const type = 'function(): Promise|void'
      const res = getLinks(allTypes, type)
      equal(res, 'function(): (Promise \\| void)')
    },
    'adds return nullability'({ allTypes }) {
      const type = '?function(): !(Promise|string)'
      const res = getLinks(allTypes, type)
      equal(res, '?function(): !(Promise \\| string)')
    },
  },
}

export const params = {
  'uses the link function'({ allTypes }) {
    const type = '{ a, b: Type }'
    const res = getLinks(allTypes, type, {
      link({ link, type: t }) {
        return `${t.fullName}#${link}`
      },
    })
    equal(res, '{ a, b: [Type](Type#type-type) }')
  },
}

export default ts