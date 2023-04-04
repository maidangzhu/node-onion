const url = require('url')
const querystring = require('querystring')

module.exports = async function (ctx, next) {
  const { req } = ctx
  const { query } = url.parse(`http://${req.headers.host}${req.url}`)
  console.log('query', query)
  ctx.params = querystring?.parse(query) ?? {}
  console.log('params', ctx.params)

  if (req.method === 'POST') {
    const headers = req.headers

    const body = await new Promise((resolve) => {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk.toString() // convert Buffer to string
      })
      req.on('end', () => {
        console.log('data', data)
        resolve(data)
      })
    })

    if (headers['content-type'] === 'application/x-www-form-urlencoded') {
      Object.assign(ctx.params, querystring.parse(body))
    } else if (headers['content-type'] === 'application/json') {
      Object.assign(ctx.params, JSON.parse(body))
    }
  }

  await next()
}
