// 1、导入http模块
const fs = require('fs');
const http = require('http');

// 2、创建服务器
// 获取服务器实例对象
const server = http.createServer();
server.listen(8080, function () {
  console.log('http://127.0.0.1:8080');
});

// 当服务器接收到请求
server.on('request', function (req, res) {
  // res.setHeader('Content-Type', 'text/html;charset=utf-8'); // 明确相应格式和类型
  // res.write('<h1>hello</h1>');
  // res.end(); // 断开服务

  if (req.url === '/') {
    fs.readFile('./index.html', 'utf-8', function (err, data) {
      res.write(data);
      res.end();
    });
  } else {
    fs.readFile('./cafe.png', function (err, data) {
      res.end(data);
    });
  }
});
