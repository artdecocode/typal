import { getNameWithDefault } from '../src'

console.log(getNameWithDefault('arg', 'test', 'string'))
console.log(getNameWithDefault('hello', true, 'boolean', 'arg'))
console.log(getNameWithDefault('world', 27, 'number', 'arg'))