const Server = require('./lib/server.js')
const Router = require('./lib/middleware/router.js')

const params = require("./aspect/params.js");

const app = new Server()
const router = new Router()

app.listen({
  port: 9091,
  host: '0.0.0.0'
})

// app.use(router.all('/test/:course/:lecture', async ({ route, res }, next) => {
//   res.setHeader('Content-Type', 'application/json')
//   res.body = route
//   await next()
// }))

app.use(({ req }, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.use(params)

app.use(router.get('/coronavirus/index', async ({ route, res }, next) => {
  const { getCoronavirusKeyIndex } = require('./lib/module/mock')
  const index = getCoronavirusKeyIndex()
  res.setHeader('Content-Type', 'application/json')
  res.body = { data: index }
  await next()
}))

app.use(router.get('/coronavirus/:date', async ({ route, res }, next) => {
  const { getCoronavirusByDate } = require('./lib/module/mock')
  const data = getCoronavirusByDate(route.date)
  res.setHeader('Content-Type', 'application/json')
  res.body = { data }
  await next()
}))

app.use(router.all('.*', async ({ params, req, res }, next) => {
  res.setHeader('Content-Type', 'text/html')
  res.body = '<h1>Not Found</h1>'
  res.statusCode = 404
  await next()
}))
