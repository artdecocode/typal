import read from '@wrote/read'
import write from '@wrote/write'
import { collect } from 'catchment'
import readDirStructure, { getFiles } from '@wrote/read-dir-structure'
import { lstat } from 'fs'
import makePromise from 'makepromise'
import makeJSTypal from '../../lib/make-JSTypal'
import parseFile from '../../lib/parse'
import { getTypes } from './template'

export default async (source, opts = {}) => {
  const {
    closure = false,
    useNamespace = false,
    externs = false, output, types,
  } = opts
  const typesFiles = await getTypes(types)
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
    await processFiles(files, closure, externs, output, typesFiles, useNamespace)
  }))
}

/**
 * Processs all source files to include JSDoc documentation in them.
 * @param {Array<string>} files The list of files.
 * @param {Boolean} closure
 * @param {Boolean} externs
 * @param {Boolean} output Where to save the output.
 * @param {Array<string>} types Paths to types.xml files.
 */
const processFiles = async (files, closure = false, externs = false, output = null, types = [], useNamespace = false) => {
  const existingTypes = []
  await Promise.all(types.map(async (typesLocation) => {
    const content = await read(typesLocation)
    const { types: tt, imports } = parseFile(content)
    existingTypes.push(tt, imports)
  }))
  await Promise.all(files.map(async (file) => {
    const content = await read(file)
    const js = makeJSTypal({ closure, externs, useNamespace }, externs)
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