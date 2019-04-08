import read from '@wrote/read'
import write from '@wrote/write'
import { collect } from 'catchment'
import readDirStructure, { getFiles } from '@wrote/read-dir-structure'
import { lstat } from 'fs'
import makePromise from 'makepromise'
import JSTypal from '../../lib/JSTypal'

export default async (source) => {
  const ls = await makePromise(lstat, source)
  let files
  if (ls.isFile()) {
    files = [source]
  } else if (ls.isDirectory()) {
    const dir = await readDirStructure(source)
    files = getFiles(dir.content, source)
  }
  await processFiles(files)
}

/**
 * @param {Array<string>} files The list of files.
 */
const processFiles = async (files) => {
  await Promise.all(files.map(async (file) => {
    const content = await read(file)
    const js = new JSTypal()
    js.end(content)
    const res = await collect(js)
    await write(file, res)
  }))
}