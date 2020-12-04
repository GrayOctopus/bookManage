module.exports = app => {
  const express = require("express")
  const router = express.Router({
    mergeParams: true
  })
  const readerInfo = require('../../models/Readerinfo')
  const readerType = require('../../models/Readertype')
  //根据rd_card查询读者
  router.get('/readerinfo/:id',async (req,res) => {
    const model = await readerInfo.findOne({rd_card: req.params.id})
    res.send(model)
  })

  //根据rd_type查询读者类型
  router.get('/readertype/:id',async (req,res) => {
    const model = await readerType.findOne({rd_type: req.params.id})
    // console.log(model);
    res.send(model)
  })

  app.use('/admin/api',router)
}