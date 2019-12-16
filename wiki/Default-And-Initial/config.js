/**
 * @param {Config} conf
 */
export function example(conf) {
  const { abc = 'hello' } = conf
  console.log(abc)
}