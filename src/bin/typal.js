import { _source } from './get-args'

(async () => {
  try {
    console.log(_source)

    await processFiles(files)
  } catch (err) {
    if (process.env['DEBUG']) console.log(err.stack)
    else console.log(err.message)
  }
})()
