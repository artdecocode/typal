import { _source, _closure, _externs } from './get-args'
import generate from './commands/generate'

(async () => {
  try {
    return await generate(_source, {
      closure: _closure,
      externs: _externs,
    })
  } catch (err) {
    if (process.env['DEBUG']) console.log(err.stack)
    else console.log(err.message)
  }
})()
