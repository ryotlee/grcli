var express = require('express')
var path = require('path')
var proxy = require('http-proxy-middleware');

var app = express()
//
app.use('/', express.static(path.resolve(__dirname, '../dist/')));
// proxy settings
//http://api.douban.com/v2/movie/top250
app.use('/v2', proxy({
  target: 'http://api.douban.com',
  changeOrigin: true,
  pathRewrite: {
    '^/v2': '/v2'
  }
}));
//
var port = 9000
app.listen(port, function() {
  console.log("listening at port: " + port)
  console.log("start with : http://localhost:" + port)
})
