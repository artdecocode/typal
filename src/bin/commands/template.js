import read from '@wrote/read'
import write from '@wrote/write'
import { collect } from 'catchment'
import readDirStructure, { getFiles } from '@wrote/read-dir-structure'
import { lstat } from 'fs'
import makePromise from 'makepromise'
import Template from '../../lib/Template'
import { readTypesFile } from '../../lib/parse'

/**
 * Constructs the list of all types.xml files, whether the path to a single file is passed, or to a directory.
 * @param {string} path The path or comma-separated paths to scan for XML files.
 */
export const getTypes = async (path) => {
  if (!path) return []
  const pp = path.split(',')
  const manyPaths = await Promise.all(pp.map(async (Path) => {
    /** @type {!Array<string>} */
    let files = []
    const ls = await makePromise(lstat, Path)
    if (ls.isFile()) {
      files = [Path]
    } else if (ls.isDirectory()) {
      const dir = await readDirStructure(Path)
      files = getFiles(
        /** @type {!_wrote.DirectoryStructure} */(dir.content), Path)
      files = files.filter(a => a.endsWith('.xml'))
    }
    return files
  }))
  const files = manyPaths.reduce((acc, p) => [...acc, ...p], [])
  return files
}

/**
 * @param {!Array<string>} locations
 */
const readTypes = async (locations) => {
  const data = await Promise.all(locations.map(async (location) => {
    const d = await readTypesFile(location)
    return {
      ...d,
      location,
    }
  }))
  const res = data.reduce((acc, { imports, types }) => {
    acc.push(...imports)
    acc.push(...types)
    return acc
  }, [])
  return res
}

/**
 * The template should read the input file.
 * @param {!Array<string>} source
 * @param {Object} [opts] Options
 * @param {string} [opts.output] Where to write output. STDOUT by default.
 * @param {string} [opts.types] The location of types' file(s).
 */
export default async function template(source, opts = {}) {
  const { output, types } = opts
  const typesFiles = await getTypes(types)
  const t = await readTypes(typesFiles)

  await Promise.all(source.map(async (s) => {
    const ls = await makePromise(lstat, s)
    let files
    if (ls.isFile()) {
      files = [s]
    } else if (ls.isDirectory()) {
      const dir = await readDirStructure(s)
      files = getFiles(
        /** @type {!_wrote.DirectoryStructure} */(dir.content), s)
    }
    await processFiles(files, t, output)
  }))
}

/**
 * @param {!Array<string>} files The list of files.
 */
const processFiles = async (files, types = [], output = null) => {
  // const existingTypes = []
  // if (types) {
  //   const t = types.split(',')
  //   await Promise.all(t.map(async (typesLocation) => {
  //     const content = await read(typesLocation)
  //     const { types: tt, imports } = parseFile(content)
  //     existingTypes.push(tt, imports)
  //   }))
  // }
  await Promise.all(files.map(async (file) => {
    const content = await read(file)
    const js = new Template(types, file)
    // js.end(content)
    // const js = makeJSTypal({ closure, externs }, externs)
    // existingTypes.forEach(type => js.emit('types', type))
    // js.file = file
    // js.LOG = console.error
    // js.lines = content.split('\n')
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