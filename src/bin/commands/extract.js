import read from '@wrote/read'
import write from '@wrote/write'
import extract from '../../lib/extract'

export default async (source, opts = {}) => {
  const { output } = opts
  const data = await read(source)
  const types = await extract(data)
  if (output) {
    await write(output, types)
  } else {
    console.log(types)
  }
}