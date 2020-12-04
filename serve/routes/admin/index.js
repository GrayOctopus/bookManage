module.exports = app =>{
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const SECRET = 'adsfDFAEdfaadfs'
  const {AdminUser} = require('../../models/AdminUser')
  //登录中间件
  const authMiddleware = async(req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    const { id } = jwt.verify(raw, SECRET)
    req.user = await AdminUser.findById(id)
    next()
  }
  const resourceMiddleware = async (req, res, next) =>  {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }

  const router = express.Router({
    mergeParams:true //合并url参数
  })
  //引入路由
  //增
  router.post('/',async(req,res)=>{
    const model =  await req.Model.create(req.body)
    res.send({
      model,
      meta: {
        status: 200
      }
    })
  })
  //删
  router.delete('/:id',async(req,res)=>{
    await req.Model.findByIdAndDelete(req.params.id,req.body)
    res.send({
      meta: {
        status: 200
      }
    })
  })
  //改
  router.put('/:id',async(req,res)=>{
    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send( {
      model,
      meta: {
        status: 200
      }
    })
  })

  //查
  router.get('/:id',async(req,res)=>{
    const model =  await req.Model.findById(req.params.id)
    res.send(model)
  })

  //所有数据
  router.get('/',async(req,res)=>{
    const model =  await req.Model.find()
    res.send(model)
  })


  app.use('/admin/api/rest/:resource',resourceMiddleware,router)

  //登录
  app.post('/admin/api/login',async (req,res)=>{
    const user = await AdminUser.findOne({
      username: req.body.username
    })

    if (!user) {
      return res.send({
        meta: {
          status: 421
        },
        message: "用户不存在！"
      })
    }
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
    )
    if (!isPasswordValid) {
      return res.send({
        meta: {
          status: 422
        },
        message: "密码错误!"
      })
    }
    // 生成token
    const token = jwt.sign({
      id: String(user._id)
    }, SECRET)
    res.send({
      user,
      token,
      meta: {
        status:200
      }
    })
  })



  //上传图片接口
  const multer = require('multer') //multer实现单图、多图上传
  const upload = multer({dest:__dirname+'/../../uploads'}) //上传到本地文件的路径
  app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
    const file = req.file
    file.url =`http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}


