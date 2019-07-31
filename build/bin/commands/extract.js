let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;
let write = require('@wrote/write'); if (write && write.__esModule) write = write.default;
const extract = require('../../lib/extract');

module.exports=async (source, opts = {}) => {
  const { output } = opts
  await Promise.all(source.map(async (s) => {
    const data = await read(s)
    const types = await extract(data)
    if (output) {
      await write(output, types)
    } else {
      console.log(types)
    }
  }))
}