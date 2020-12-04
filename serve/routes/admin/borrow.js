module.exports = app => {
  const moment = require('moment')
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })
  const readerInfo = require('../../models/Readerinfo')
  const book = require('../../models/Book')
  const borrowInfo = require('../../models/Borrowinfo')
  const readerType = require('../../models/Readertype')

  //借书
  router.post('/borrowbook', async (req, res) => {
    console.log(req.body)

    // const SESSION = await borrowInfo.startSession();
    // await SESSION.startTransaction();
    await readerInfo.findOneAndUpdate({rd_card: req.body.rd_id}, {$inc: {rd_borrowqty: +1}})
    await book.findOneAndUpdate({bk_code: req.body.bk_id}, {$set :{status: 0}})
    //获取改读者
    // const getReader = readerInfo.findOne({rd_card: req.body.rd_id})
    // //根据读者类别获得最低还的时间
    // const day = readerType.findOne({ rd_type: getReader.rd_type})
    // //创建借书数据
    await borrowInfo.create(req.body)
    // //数据
    // await borrowInfo.findOneAndUpdate({_id: req._id} ,{$set : {ldDateRetPlan :() => moment(new Date()+ day*24*60*60000).format('YYYY-MM-DD HH:mm:ss')}})
    // await SESSION.commitTransaction();

    res.send({
      meta: {
        status: 200,
      },
      message: '借书成功'
    })
  })

  //还书
  router.post('/returnbook', async (req, res) => {
    // console.log(req.body)
    await readerInfo.findOneAndUpdate({rd_card: req.body.rd_id}, {$inc: {rd_borrowqty: -1}})
    await readerInfo.findOne({rd_card: req.body.rd_id})
    await book.findOneAndUpdate({bk_code: req.body.bk_id}, {$set :{status: 1}})
    await borrowInfo.findOneAndUpdate({_id:req.body._id}, {$set :{lsHasReturn: 1}})
      res.send({
        meta: {
          status: 200,
        },
        message: '还书成功'
      })
  })

  //续借
  router.post('/relendbook', async (req, res) => {
    // console.log(req.body);
    const continueBorrowInfo = await borrowInfo.findOne({_id: req.body._id})
    const continueBorrowReaderInfo = await readerInfo.findOne({rd_card: req.body.rd_id})
    // console.log(continueBorrowReaderInfo);
    const continueBorrowReaderType = await readerType.findOne({rd_type:continueBorrowReaderInfo.rd_type })
    console.log(continueBorrowReaderType.CanContinueTimes);
    console.log(continueBorrowInfo.ldContinueTimes)
    if (continueBorrowReaderType.CanContinueTimes <= (continueBorrowInfo.ldContinueTimes)) {
      res.send( {
        meta: {
          status: 201
        }
      })
    }
    else {
      await borrowInfo.findOneAndUpdate({_id: req.body._id}, {$inc :{ldContinueTimes: 1}})
      res.send({
        meta: {
          status: 200,
        },
        message: '续借成功'
      })
    }
  })



  app.use("/admin/api", router)
}