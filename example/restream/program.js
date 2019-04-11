import { Restream } from './compat'

const restream = new Restream({
  regex: /__(.+?)__/,
  replacement(match, s) {
    return `<em>${s}</em>`
  },
})

restream.pipe(process.stdout)
restream.end('__hello world__')
