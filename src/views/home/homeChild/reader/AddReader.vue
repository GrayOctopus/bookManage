<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>读者管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加读者</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图-->
    <el-card class="box-card">
      <el-form ref="form"
               :model="addForm"
               :rules="addRules"
               label-width="80px">
        <el-form-item label="读者学号" prop="rd_card">
          <el-input v-model="addForm.rd_card"></el-input>
        </el-form-item>
        <el-form-item label="读者姓名" prop="rd_name">
          <el-input v-model="addForm.rd_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="rd_sex">
          <el-radio v-model="addForm.rd_sex" label="0">男</el-radio>
          <el-radio v-model="addForm.rd_sex" label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="读者类别" prop="rd_type">
          <el-select v-model="addForm.rd_type" placeholder="请选择读者类型" style="width: 100%">
            <el-option :label="item.rd_typename" :value='item.rd_type' v-for="item in this.readerType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位名称" prop="rd_dep">
          <el-input v-model="addForm.rd_dep"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="rd_phone">
          <el-input v-model="addForm.rd_phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="rd_email">
          <el-input v-model="addForm.rd_email"></el-input>
        </el-form-item>
        <el-form-item label="读者密码" prop="rd_pwd">
          <el-input v-model="addForm.rd_pwd"></el-input>
        </el-form-item>
<!--        <el-form-item label="读者图片" prop="rd_photo">-->
<!--          <el-upload-->
<!--              v-model="addForm.rd_photo"-->
<!--              class="avatar-uploader"-->
<!--              action="https://jsonplaceholder.typicode.com/posts/"-->
<!--              :show-file-list="false"-->
<!--              :on-success="handleAvatarSuccess"-->
<!--              :before-upload="beforeAvatarUpload">-->
<!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
        <el-button type="primary" class="addBtn" @click="addReader">添加读者</el-button>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddReader",
  created() {
    this.getReaderType()
  },
  data() {
    //验证邮箱规则
    let checkEmail = (rule,value,callback) => {
      const regEmail = /^([a-zA-z0-9_-])+@([a-zA-z0-9_-])+([\.a-zA-z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法邮箱'));
    }
    //验证手机号的规则
    let checkMobile = (rule,value,callback) => {
      const regEmail = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法手机号'));
    }
    return {
      //所有读者类型
      readerType: [],
      addForm: {
        rd_card: '',
        rd_name: '',
        rd_sex: '',
        rd_type: '',
        rd_dep: '',
        rd_phone: '',
        rd_email: '',
        rd_pwd: '',
        rd_photo: []
      },
    //  规则
      addRules: {
        rd_card: [
          { required: true, message: '请输入读者学号', trigger: 'blur' },
        ],
        rd_name: [
          { required: true, message: '请输入读者名称', trigger: 'blur' },
        ],
        rd_sex: [
          { required: true, message: '请输入读者性别', trigger: 'blur' },
        ],
        rd_type: [
          { required: true, message: '请输入读者类型', trigger: 'blur' },
        ],
        rd_dep: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
        ],
        rd_phone: [
          { validator: checkMobile, trigger: 'blur' }
        ],
        rd_email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        rd_pwd: [
          { required: true, message: '请输入读者密码', trigger: 'blur' },
        ],
      },
      //图片路径
      // imageUrl: ''
    }
  },
  methods: {
    //获取所有读者类别
    async getReaderType() {
      const {data: res} = await this.$http.get('/rest/readertype')
      this.readerType = res
    },
    async addReader() {
      const {data: res} = await this.$http.post('rest/readerinfo',this.addForm)
      if (res.meta.status !== 200) {
        return this.$message.error('添加读者信息失败!')
      }
      this.$message.success('添加成功!')
      this.$router.push('/readerinfo')
    }
  }
}
</script>

<style scoped>
.addBtn {
  margin-top: 15px;
}
</style>