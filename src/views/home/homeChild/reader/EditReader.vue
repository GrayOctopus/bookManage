<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>读者管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑读者</el-breadcrumb-item>
    </el-breadcrumb>

    <!--    卡片视图-->
    <el-card class="box-card">
      <el-form ref="editRef"
               :model="editForm"
               :rules="editRules"
               label-width="80px">
        <el-form-item label="读者学号" prop="rd_card">
          <el-input v-model="editForm.rd_card"></el-input>
        </el-form-item>
        <el-form-item label="读者姓名" prop="rd_name">
          <el-input v-model="editForm.rd_name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="rd_sex">
          <el-input v-model="editForm.rd_sex"></el-input>
        </el-form-item>
        <el-form-item label="读者类别" prop="rd_type">
          <el-input v-model="editForm.rd_type"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="rd_dep">
          <el-input v-model="editForm.rd_dep"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="rd_phone">
          <el-input v-model="editForm.rd_phone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="rd_email">
          <el-input v-model="editForm.rd_email"></el-input>
        </el-form-item>
        <el-form-item label="证件状态" prop="rd_status">
          <el-input v-model="editForm.rd_status"></el-input>
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
        <el-button type="primary" class="addBtn" @click="editReader">修改读者</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddReader",
  created() {
    this.getReaderbyId()
  },
  data() {
    return {
      editForm: {
        rd_card: '',
        rd_name: '',
        rd_sex: '',
        rd_type: '',
        rd_dep: '',
        rd_phone: '',
        rd_email: '',
        rd_status: '',
        rd_photo: []
      },
      //  规则
      editRules: {
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
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        rd_email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
        ],
        rd_status: [
          { required: true, message: '请输入证件状态', trigger: 'blur' },
        ],
      },
      //图片路径
      imageUrl: ''
    }
  },
  methods: {
    async getReaderbyId() {
      const {data: res} = await this.$http.get(`rest/readerinfo/${this.$store.state.ReaderID}`)
      this.editForm = res
    },
    async editReader() {
      const {data: res } = await this.$http.put(`rest/readerinfo/${this.$store.state.ReaderID}`,this.editForm)
      if (res.meta.status !== 200) {
        return this.$message.error('修改读者信息失败!')
      }
      this.$router.push('/readerinfo')
      this.$message.success('修改读者信息成功!')
    }
  }
}
</script>

<style scoped>
.addBtn {
  margin-top: 15px;
}
</style>