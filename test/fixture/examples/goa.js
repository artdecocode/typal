import Goa from '../../../src'

const goa = new Goa()
goa.use((ctx) => {
  /* start example */
  /// - Accept: text/*
  ctx.request.accepts('html') // => "html"
  /* end example */
})
