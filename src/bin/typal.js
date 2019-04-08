import { _source, _closure } from './get-args'
import generate from './commands/generate'

(async () => {
  try {
    return await generate(_source, _closure)
  } catch (err) {
    if (process.env['DEBUG']) console.log(err.stack)
    else console.log(err.message)
  }
})()
