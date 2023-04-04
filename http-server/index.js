const path = require('path')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const { Server, Router } = require('./lib/interceptor') // 这里我们将server 和 router都规划到interceptor包中

const dbFile = path.resolve(__dirname, '../database/todolist.db') // todolist.db是sqlite数据库文件
let db = null

const app = new Server()
const router = new Router()

app.use(async ({ req }, next) => {
  console.log(`${req.method} ${req.url}`) // eslint-disable-line no-console
  await next()
})

app.use(async (ctx, next) => {
  if (!db) { // 如果数据库连接未创建，就创建一个
    db = await open({
      filename: dbFile,
      driver: sqlite3.cached.Database
    })
  }
  ctx.database = db // 将db挂在ctx上下文对象的database属性上

  await next()
})

app.use(router.get('/list', async ({ database, route, res }, next) => {
  res.setHeader('Content-Type', 'application/json')
  const { getList } = require('./model/todolist')
  const result = await getList(database) // 获取任务数据
  res.body = { data: result }
  await next()
}))

app.use(router.all('.*', async ({ params, req, res }, next) => {
  res.setHeader('Content-Type', 'text/html')
  res.body = '<h1>Not Found</h1>'
  res.statusCode = 404
  await next()
}))

app.listen({
  port: 9090,
  host: '0.0.0.0'
})
