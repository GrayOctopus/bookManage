const express = require('express')
const path = require('path')
const app = new express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//使用json中间件
app.use(express.json())
//解决跨域问题
app.use(require("cors")())
//静态使用资源
app.set('/admin', express.static(path.join(__dirname + '/admin')))

// 使用数据库
require('./plugins/mongodb')(app)
// 路由接口
require('./routes/admin/index')(app)
require('./routes/admin/borrow')(app)
require('./routes/admin/research')(app)



app.listen(3000,() => {
  console.log('http://localhost:3000/api/');
})
