module.exports = async function (req, next) {
  console.log(`${req.method} ${req.url}`)
  await next()
}
