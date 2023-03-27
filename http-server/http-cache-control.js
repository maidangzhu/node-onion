const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file:///${req.url}`)))
  console.log(filePath)

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'max-age=86400' // 缓存一天
        // 'Cache-Control': 'no-cache'
      })
      const fileStream = fs.createReadStream(filePath)
      fileStream.pipe(res)
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>Not asdf Found</h1>')
  }
})

server.listen(8080, function () {
  console.log('http://127.0.0.1:8080')
})
