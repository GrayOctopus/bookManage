const moment = require('moment')
const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  rd_card: {
    type: Number,
    unique: true
  },//读者编号
  rd_name: {
    type: String
  },//读者姓名
  rd_sex: {
    type: String
  },//性别
  rd_type: {
    type: String
  },//读者类别
  rd_dep: {
    type: String
  },//单位名称
  rd_phone: {
    type: String
  },//电话号码
  rd_email: {
    type: String
  },//电子邮箱
  rd_borrowqty: {
    type: Number,
    default: 0
  },//已借图书(本)
  rd_datereg: {
    type: String,
    default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  },//办证日期
  rd_status: {
    type: Number,
    default: 0
  },//证件状态0,1,2
  rd_pwd: {
    type: String,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  rd_adminroles: {
    type:Number,
    default: 0
  },//管理角色
})

module.exports =  mongoose.model('Readerinfo',schema)
