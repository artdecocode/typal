import { _source, _closure, _externs, _output, _help, _version, _migrate, _types,
  argsConfig, _template, _useNamespace } from './get-args'
import usually from 'usually'
import { reduceUsage } from 'argufy'
import generate from './commands/generate'
import extract from './commands/extract'
import templ from './commands/template'

/**
 * @license
 * Typal: keep types information in XML files to embed as typedefs,
 *        Closure Compiler externs and markdown tables.
 *
 * Copyright (C) 2020  Art Deco
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

if (_help) {
  const usage = reduceUsage(argsConfig)
  console.log(usually({
    usage,
    description: `Embeds and maintains Closure-compatible types JSDoc in
JavaScript source code from an external types.xml file.`,
    line: 'typal source [--closure|externs] [--migrate] [-o output] [-hv]',
    example: 'typal src/index.js -c',
  }))
  process.exit()
} else if (_version) {
  console.log(require('../../package.json').version)
  process.exit()
}

(async () => {
  try {
    if (_migrate) {
      return await extract(_source, {
        output: _output,
      })
    } else if (_template) {
      return await templ(/** @type {!Array<string>} */ (_source), {
        output: _template,
        types: _types,
      })
    }
    return await generate(_source, {
      closure: _closure,
      externs: _externs,
      output: _output,
      types: _types,
      useNamespace: _useNamespace,
    })
  } catch (err) {
    if (process.env['DEBUG']) console.log(err.stack)
    else console.log(err.message)
  }
})()