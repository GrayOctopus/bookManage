const mongoose = require('mongoose')
const schema = {
  bk_code: {
    type: String,
    unique: true
  },
  bk_name: {
    type: String,
    require
  },//图书名称
  bk_author: {
    type: String,
    require
  },//图书作者
  bk_press: {
    type: String,
    require
  },//图书出版社
  public_date: {
    type: Date,
    require
  },//出版日期
  create_date: {
    type: Date,
    defaults: Date.now(),
    require
  },//创建日期
  language: {
    type: String,
    require
  },//语言
  page: {
    type: Number,
    require
  },//页数
  price: {
    type: Number,
    require
  },//价格
  status: {
    type: Number,
    enum: [0,1],
    require,
    default: 1
  }//状态
}
module.exports =  mongoose.model('Book',schema)