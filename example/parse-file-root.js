import { inspect } from 'util'
/* start example */
import read from '@wrote/read'
import { parseFile } from '../src'

const getFile = async () => {
  const file = await read('example/root.xml')
  const res = parseFile(file, 'ns')
  return res
}
/* end example */
(async () => {
  const res = await getFile()
  console.log(inspect(res, false, 10).replace(/\\n/g, '\n'))
})()