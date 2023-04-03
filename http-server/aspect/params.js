const url = require('url')
const querystring = require('querystring')

async function params(ctx, next) {
  const { req } = ctx
  const { query } = url.parse(`http://${req.headers.host}${req.url}`)
  console.log('query', query)
  ctx.params = querystring.parse(query)
  await next()
}

module.exports = params;
