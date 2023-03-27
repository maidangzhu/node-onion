class Interceptor {
  constructor() {
    this.aspects = [] // 用于存储拦截切面
  }

  use(/* async */ functor) { // 注册拦截切面
    this.aspects.push(functor)
    return this
  }

  async run(context) { // 执行注册的拦截切面
    const aspects = this.aspects

    // compose函数
    // 将注册的拦截切面包装成一个洋葱模型
    const proc = aspects.reduceRight(function (a, b) { // eslint-disable-line
      return async () => {
        await b(context, a)
      }
    }, () => Promise.resolve())

    try {
      await proc() //从外到里执行这个洋葱模型
    } catch (ex) {
      console.error(ex.message)
    }

    return context
  }
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const inter = new Interceptor()

const task = function (id) {
  return async (ctx, next) => {
    try {
      console.log(`task ${id} begin`)
      ctx.count++
      await wait(1000)
      console.log(`count: ${ctx.count}`)
      await next()
      console.log(`task ${id} end`)
    } catch (ex) {
      throw new Error(ex)
    }
  }
}

// 将多个任务以拦截切面的方式注册到拦截器中
inter.use(task(0))
inter.use(task(1))
inter.use(task(2))
inter.use(task(3))
inter.use(task(4))

// 从外到里依次执行拦截切面
inter.run({ count: 0 })

module.exports = Interceptor
