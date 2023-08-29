module.exports = async function (ctx, next) {
  const { req } = ctx
  console.log(`${req.method} ${req.url}`)
  await next()
}
