import read from '@wrote/read'
import write from '@wrote/write'
import extract from '../../lib/extract'

export default async (source, opts = {}) => {
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