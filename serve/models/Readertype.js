const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  rd_type: {
    type: String,
    unique:true
  },//类别
  rd_typename: {
    type: String,
    require
  },//类别名称
  canLendQty: {
    type: Number,
    require
  },//可借数量
  canLendDay: {
    type: Number,
    require
  },//可借天数
  CanContinueTimes: {
    type: Number,
    require
  },//可续借次数
  PunishRate: {
    type: Number,
    require
  },//罚款率
  DateValid: {
    type: Number,
    require
  },//证书有效期
})
module.exports =  mongoose.model('Readertype',schema)