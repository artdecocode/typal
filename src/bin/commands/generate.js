import read from '@wrote/read'
import write from '@wrote/write'
import { collect } from 'catchment'
import readDirStructure, { getFiles } from '@wrote/read-dir-structure'
import { lstat } from 'fs'
import makePromise from 'makepromise'
import makeJSTypal from '../../lib/make-JSTypal'

export default async (source, opts = {}) => {
  const { closure = false, externs = false, output } = opts
  const ls = await makePromise(lstat, source)
  let files
  if (ls.isFile()) {
    files = [source]
  } else if (ls.isDirectory()) {
    const dir = await readDirStructure(source)
    files = getFiles(/** @type {!_readDirStructure.Content } */(dir.content), source)
  }
  await processFiles(files, closure, externs, output)
}

/**
 * @param {Array<string>} files The list of files.
 */
const processFiles = async (files, closure = false, externs = false, output = null) => {
  await Promise.all(files.map(async (file) => {
    const content = await read(file)
    const js = makeJSTypal({ closure, externs })
    js.file = file
    js.LOG = console.error
    js.lines = content.split('\n')
    js.end(content)
    const res = await collect(js)
    if (output == '-') {
      console.log(res)
    } else if (output) {
      await write(output, res)
    } else {
      await write(file, res)
    }
  }))
}