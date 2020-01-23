import '../types/externs'
import { Type, Property, Method, getNameWithDefault, parseFile, getLinks } from './'

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

module.exports = {
  '_Type': Type,
  '_Property': Property,
  '_Method': Method,
  '_parseFile': parseFile,
  '_getLinks': getLinks,
}