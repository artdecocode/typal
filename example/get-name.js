import { getNameWithDefault } from '../src'

console.log(getNameWithDefault('arg', 'test', 'string'))
console.log(getNameWithDefault('arg', 10, 'number', 'hello'))
console.log(getNameWithDefault('arg', false, 'boolean', 'world'))