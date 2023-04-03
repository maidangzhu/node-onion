const fs = require('fs')
const Server = require('./lib/server.js')
const Router = require('./lib/middleware/router.js')
const handlebars = require('handlebars')

const params = require('./aspect/params.js')

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

// app.use(router.get('/coronavirus/index', async ({ route, res }, next) => {
//   const { getCoronavirusKeyIndex } = require('./lib/module/mock')
//   const index = getCoronavirusKeyIndex()
//   res.setHeader('Content-Type', 'application/json')
//   res.body = { data: index }
//   await next()
// }))

// app.use(router.get('/coronavirus/:date', async ({ route, res }, next) => {
//   const { getCoronavirusByDate } = require('./lib/module/mock')
//   const data = getCoronavirusByDate(route.date)
//   res.setHeader('Content-Type', 'application/json')
//   res.body = { data }
//   await next()
// }))

app.use(router.get('/coronavirus/index', async ({ route, res }, next) => {
  const { getCoronavirusKeyIndex } = require('./lib/module/mock')
  const index = getCoronavirusKeyIndex()

  // 获取模板文件
  const tpl = fs.readFileSync('./view/coronavirus_index.html', { encoding: 'utf-8' })

  // 编译模板
  const template = handlebars.compile(tpl)

  // 将数据和模板结合
  const result = template({ data: index })
  res.setHeader('Content-Type', 'text/html')
  res.body = result
  await next()
}))

app.use(router.get('/coronavirus/:date', async ({ params, route, res }, next) => {
  const { getCoronavirusByDate } = require('./lib/module/mock')
  const data = getCoronavirusByDate(route.date)

  if (params.type === 'json') {
    res.setHeader('Content-Type', 'application/json')
    res.body = { data }
  } else {
    const tpl = fs.readFileSync('./view/coronavirus_date.html', { encoding: 'utf-8' })

    const template = handlebars.compile(tpl)
    const result = template({ data })

    res.setHeader('Content-Type', 'text/html')
    res.body = result
  }

  await next()
}))
