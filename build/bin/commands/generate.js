let read = require('@wrote/read'); if (read && read.__esModule) read = read.default;
let write = require('@wrote/write'); if (write && write.__esModule) write = write.default;
const { collect } = require('catchment');
let readDirStructure = require('@wrote/read-dir-structure'); const { getFiles } = readDirStructure; if (readDirStructure && readDirStructure.__esModule) readDirStructure = readDirStructure.default;
const { lstat } = require('fs');
let makePromise = require('makepromise'); if (makePromise && makePromise.__esModule) makePromise = makePromise.default;
const makeJSTypal = require('../../lib/make-JSTypal');
const parseFile = require('../../lib/parse');

module.exports=async (source, opts = {}) => {
  const { closure = false, externs = false, output, types } = opts
  await Promise.all(source.map(async (s) => {
    const ls = await makePromise(lstat, s)
    let files
    if (ls.isFile()) {
      files = [s]
    } else if (ls.isDirectory()) {
      const dir = await readDirStructure(s)
      files = getFiles(
        /** @type {!_readDirStructure.Content } */(dir.content), s)
    }
    await processFiles(files, closure, externs, output, types)
  }))
}

/**
 * @param {Array<string>} files The list of files.
 */
const processFiles = async (files, closure = false, externs = false, output = null, types = null) => {
  const existingTypes = []
  if (types) {
    const t = types.split(',')
    await Promise.all(t.map(async (typesLocation) => {
      const content = await read(typesLocation)
      const { types: tt, imports } = parseFile(content)
      existingTypes.push(tt, imports)
    }))
  }
  await Promise.all(files.map(async (file) => {
    const content = await read(file)
    const js = makeJSTypal({ closure, externs }, externs)
    existingTypes.forEach(type => js.emit('types', type))
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