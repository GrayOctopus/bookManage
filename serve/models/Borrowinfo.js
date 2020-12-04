const mongoose = require('mongoose')
const moment = require('moment')
const schema = new mongoose.Schema({
  rd_id: {
    type: Number
  },//读者学号
  bk_id: {
    type: String
  },//图书编号
  ldContinueTimes: {
    type: Number,
    default: 0
  },//续借次数
  ldDateOut: {
    type: String,
    default: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  },//借书日期
  ldDateRetPlan: {
    type: String
  },//应还日期
  ldDateRetAct: {
    type:Date
  },//实际还书日期
  ldOverDay: {
    type: Number
  },//超期天数
  ldOverMoney: {
    type: Number
  },//超期金额
  ldPunishMoney: {
    type: Number
  },//罚款金额
  lsHasReturn: {
    type: Number,
    default: 0
  },//是否已还书
  OperatorLend: {
    type: String
  },//借书操作员
  OperatorRet: {
    type: String
  },//还书操作员
})
module.exports =  mongoose.model('Borrowinfo',schema)