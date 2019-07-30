import { _source, _closure, _externs, _output, _help, _version, _migrate, _types,
  argsConfig, _template } from './get-args'
import usually from 'usually'
import { reduceUsage } from 'argufy'
import generate from './commands/generate'
import extract from './commands/extract'
import templ from './commands/template'

if (_help) {
  const usage = reduceUsage(argsConfig)
  console.log(usually({
    usage,
    description: `Embeds and maintains Closure-compatible types JSDoc in
JavaScript source code from an external types.xml file.`,
    line: 'typal source [--closure|externs] [--migrate] [-o output] [-hv]',
    example: 'typal src/index.js -c',
  }))
  process.exit()
} else if (_version) {
  console.log(require('../../package.json').version)
  process.exit()
}

(async () => {
  try {
    if (_migrate) {
      return await extract(_source, {
        output: _output,
      })
    } else if (_template) {
      return await templ(_source, {
        output: _template,
        types: _types,
      })
    }
    return await generate(_source, {
      closure: _closure,
      externs: _externs,
      output: _output,
      types: _types,
    })
  } catch (err) {
    if (process.env['DEBUG']) console.log(err.stack)
    else console.log(err.message)
  }
})()