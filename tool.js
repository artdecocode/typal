import read from '@wrote/read'
import { inspect } from 'util'

const [,,required, requiredVersion] = process.argv

/**
 * @param {Array<string>} input
 * @returns {Array<Package>}
 */
const getFiles = (input) => {
  const files = input.map((f) => {
    let [meta, deps = ''] = f.split('\n  dependencies:\n')
    let [names, version] = meta.split('\n', 2)
    version.replace(/version "(.+?)"/, (m, v) => {
      version = v
    })
    const nameAndVersions = names.replace(/:$/, '')
      .split(', ')
      .reduce((acc, current) => {
        current.replace(/"?(.+)@(.+?)"?$/, (m, name, ver) => {
          acc.name = name
          acc.versions.push(ver)
        })
        return acc
      }, { versions: [] })
    deps = deps.split('\n').filter(Boolean)
      .map(a => a.trim())
      .map((a) => {
        a.replace(/(.+?) "(.+?)"/, (m, name, v ) => {
          a = { name: name.replace(/"/g, ''), version: v }
        })
        return a
      })
    return { ...nameAndVersions, deps, version }
  })
  return files
}

(async () => {
  console.log('Looking for package %s', required)
  const file = (await read('yarn.lock')).replace(`# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
# yarn lockfile v1


`, '')
  let files = file.split('\n\n')
  const parsed = getFiles(files)

  if (!required) {
    console.log(inspect(files, false, Infinity, true))
  } else {
    let max
    try {
      const { 'version': version } = JSON.parse(await read(`node_modules/${required}/package.json`))
      max = version
    } catch (err) {
      console.log(err)
    }
    const allVersions = parsed.reduce((acc, current) => {
      const dep = current.deps.find(({ name, version }) => {
        if (!requiredVersion) return name == required
        return name == required && version.replace(/^\^/, '') == requiredVersion
      })
      if (!dep) return acc
      if (acc.includes(dep.version)) return acc
      return [...acc, dep.version]
    }, []).sort()
    allVersions.forEach((version) => {
      if (version.replace(/^\^/, '') == max) process.stdout.write('[CURRENT] ')
      printLevel(parsed, [version], required, version)
    }, [])
  }
})()

const printLevel = (parsed, versions, name, version, level = 0, {
  hasNext = false,
  last = false,
  nexts = [],
} = {}) => {
  let s = ''
  if (hasNext) s = '├─'
  if (last) s = '└─'
  const t = Array.from({ length: level })
    .map((sp, i) => {
      if (nexts[i]) return '│ '
      return '  '
    }).join('')
  console.log('%s%s%s@%s (%s)', t, s, name, version, versions.join(', '))
  const parents = findParents(parsed, name, versions)
  parents.forEach(({ name: n, version: v, versions: vs }, i) => {
    const props = {
      hasNext: i < parents.length -1,
      last: i == parents.length - 1,
      nexts: [...nexts, hasNext],
    }
    printLevel(parsed, vs, n, v, level + 1, props)
  })
}

/**
 * @param {Array<Package>} parsed
 */
const findParents = (parsed, name, versions) => {
  // if (versions.length > 1) debugger
  return parsed.filter(({ deps }) => {
    return deps
      .some(({ name: n, version: v }) => n == name && versions.includes(v))
  })
}

// const i = (data) => {
//   return inspect(data, false, Infinity, true)
// }

/**
 * @typedef {Object} Package
 * @prop {Array<string>} versions
 * @prop {string} name
 * @prop {Array<{ name: string, version: string }>} deps
 * @prop {string} version
 */