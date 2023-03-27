// http-compression.js
const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const zlib = require('zlib')

const server = http.createServer((req, res) => {
  let filePath = path.resolve(__dirname, path.join('www', url.fileURLToPath(`file:///${req.url}`)))

  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
    if (fs.existsSync(filePath)) {
      const { ext } = path.parse(filePath)
      const stats = fs.statSync(filePath)
      const timeStamp = req.headers['if-modified-since']
      let status = 200
      if (timeStamp && Number(timeStamp) === stats.mtimeMs) {
        status = 304
      }
      res.writeHead(status, {
        'Content-Type': mime.getType(ext),
        'Cache-Control': 'max-age=86400', // 缓存一天
        'Last-Modified': stats.mtimeMs,
        'Content-Encoding': 'deflate' // 告诉浏览器该文件是用deflate算法压缩的
      })
      if (status === 200) {
        const fileStream = fs.createReadStream(filePath)
        fileStream.pipe(zlib.createDeflate()).pipe(res)
      } else {
        res.end()
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>Not Found</h1>')
  }
})
