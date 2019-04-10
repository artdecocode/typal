let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;
let write = require('@wrote/write'); if (write && write.__esModule) write = write.default;
const { collect } = require('catchment');
let readDirStructure = require('@wrote/read-dir-structure'); const { getFiles } = readDirStructure; if (readDirStructure && readDirStructure.__esModule) readDirStructure = readDirStructure.default;
const { lstat } = require('fs');
let makePromise = require('makepromise'); if (makePromise && makePromise.__esModule) makePromise = makePromise.default;
const JSTypal = require('../../lib/JSTypal');

module.exports=async (source, opts = {}) => {
  const { closure = false, externs = false } = opts
  const ls = await makePromise(lstat, source)
  let files
  if (ls.isFile()) {
    files = [source]
  } else if (ls.isDirectory()) {
    const dir = await readDirStructure(source)
    files = getFiles(/** @type {!_readDirStructure.Content } */(dir.content), source)
  }
  await processFiles(files, closure, externs)
}

/**
 * @param {Array<string>} files The list of files.
 */
const processFiles = async (files, closure = false, externs = false) => {
  await Promise.all(files.map(async (file) => {
    const content = await read(file)
    const js = new JSTypal({ closure, externs })
    js.LOG = console.error
    js.end(content)
    const res = await collect(js)
    await write(file, res)
  }))
}