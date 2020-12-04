<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>读者管理</el-breadcrumb-item>
      <el-breadcrumb-item>读者类型</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图-->
    <el-card class="box-card">
      <!--      添加读者类型按钮-->
      <el-button type="primary" @click="showAddReaderTypeDialog">添加类型</el-button>
      <!--      表格-->
      <el-table
          border
          :data="readerTypeList"
          stripe
          style="width: 100%">
        <el-table-column type="index" label="#" ></el-table-column>
        <el-table-column prop="rd_type" label="读者类别" :show-overflow-tooltip="true" width="100px"></el-table-column>
        <el-table-column prop="rd_typename" label="读者类别名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="canLendQty" label="可借书数量" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="canLendDay" label="可借书天数" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="CanContinueTimes" label="可续借次数"></el-table-column>
        <el-table-column prop="PunishRate" label="罚款率"></el-table-column>
        <el-table-column prop="DateValid" label="证书有效期(年)"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="showEidtDialog(scope.row._id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeReaderTypeById(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--  添加读者类型的对话框-->
    <el-dialog
        @close="closeAddDialog"
        title="图书入库"
        :visible.sync="AddReaderTypeDialogVisible"
        width="50%">
      <!--      验证表单-->
      <el-form :model="addReaderTypeForm"
               label-position="left"
               :rules="addReaderTypeRules"
               ref="addReaderTypeRef"
               label-width="100px" status-icon>
        <el-form-item label="类别" prop="rd_type">
          <el-input v-model="addReaderTypeForm.rd_type"></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="rd_typename">
          <el-input v-model="addReaderTypeForm.rd_typename"></el-input>
        </el-form-item>
        <el-form-item label="可借书数量" prop="canLendQty">
          <el-input v-model="addReaderTypeForm.canLendQty"></el-input>
        </el-form-item>
        <el-form-item label="可借天数"  prop="canLendDay">
            <el-input v-model="addReaderTypeForm.canLendDay"></el-input>
        </el-form-item>
        <el-form-item label="可续借次数" prop="CanContinueTimes">
          <el-input v-model="addReaderTypeForm.CanContinueTimes"></el-input>
        </el-form-item>
        <el-form-item label="罚款率" prop="PunishRate">
          <el-input v-model="addReaderTypeForm.PunishRate"></el-input>
        </el-form-item>
        <el-form-item label="证书有效期" prop="DateValid" >
          <el-input v-model="addReaderTypeForm.DateValid" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="AddReaderTypeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addReaderType()">确 定</el-button>
  </span>
    </el-dialog>

    <!--    编辑读者类型的对话框-->
    <el-dialog
        @close="closeEidtDialog"
        title="图书入库"
        :visible.sync="editReaderTypeDialogVisible"
        width="50%">
      <!--      验证表单-->
      <el-form :model="editReaderTypeForm"
               :rules="editReaderTypeRules"
               ref="editReaderTypeRef"
               label-width="100px" status-icon>
        <el-form-item label="类别" prop="rd_type">
          <el-input v-model="editReaderTypeForm.rd_type"></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="rd_typename">
          <el-input v-model="editReaderTypeForm.rd_typename"></el-input>
        </el-form-item>
        <el-form-item label="可借书数量" prop="canLendQty">
          <el-input v-model="editReaderTypeForm.canLendQty"></el-input>
        </el-form-item>
        <el-form-item label="可借天数"  prop="canLendDay">
            <el-input v-model="editReaderTypeForm.canLendDay"></el-input>
        </el-form-item>
        <el-form-item label="可续借次数" prop="CanContinueTimes">
          <el-input v-model="editReaderTypeForm.CanContinueTimes"></el-input>
        </el-form-item>
        <el-form-item label="罚款率" prop="PunishRate">
          <el-input v-model="editReaderTypeForm.PunishRate"></el-input>
        </el-form-item>
        <el-form-item label="证书有效期" prop="DateValid" >
          <el-input v-model="editReaderTypeForm.DateValid" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editReaderTypeDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editReaderType()">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "ReaderType",
  created() {
    this.getReaderTypeList()
  },
  data() {
    return {
      AddReaderTypeDialogVisible: false,
      //双向绑定的表单
      addReaderTypeForm: {
        rd_type: '',
        rd_typename: '',
        canLendQty: '',
        canLendDay: '',
        CanContinueTimes: '',
        PunishRate: '',
        DateValid: ''
      },
      // 表单的验证规则
      addReaderTypeRules: {
        rd_type: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
        ],
        rd_typename: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
        ],
        canLendQty: [
          { required: true, message: '请输入书本出版社', trigger: 'blur' },
        ],
        canLendDay: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
        CanContinueTimes: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
        PunishRate: [
          { required: true, message: '请输入语言', trigger: 'blur' },
        ],
        DateValid: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
      },
      readerTypeList: [],
      editReaderTypeDialogVisible: false,
      //编辑图书的表单
      editReaderTypeForm: {},
      //编辑图书的验证规则
      editReaderTypeRules:{
        rd_type: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
        ],
        rd_typename: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
        ],
        canLendQty: [
          { required: true, message: '请输入书本出版社', trigger: 'blur' },
        ],
        canLendDay: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
        CanContinueTimes: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
        PunishRate: [
          { required: true, message: '请输入语言', trigger: 'blur' },
        ],
        DateValid: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    showAddReaderTypeDialog() {
      this.AddReaderTypeDialogVisible = true
    },
    //点击确定按钮添加读者类型
    addReaderType() {
      this.$refs.addReaderTypeRef.validate( async valid => {
        if (!valid) return this.$message.error('请输入相关信息!')
        const {data: res} = await this.$http.post('/rest/readertype',this.addReaderTypeForm)
        if (res.meta.status !== 200) {
          return this.$message.error('添加读者类型失败!')
        }
        this.$message.success('添加成功!')
        this.getReaderTypeList()
        this.AddReaderTypeDialogVisible = false
      })
    },
    //获取读者类型
    async getReaderTypeList() {
      await this.$http.get('/rest/readertype').then( res => {
        this.readerTypeList = res.data
      })
    },
     // 删除读者类型
    async removeReaderTypeById(id) {
      console.log(id);
      const confirmRs = await this.$confirm('是否删除该读者类型？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch( err => err)

      if (confirmRs !== 'confirm') {
        return this.$message.info('宁已取消!')
      }


      const {data: res } = await this.$http.delete(`book/${id}`)
      if (res.status !== 200) {
        return this.$message.error('删除读者类型失败!')
      }
      this.$message.success('删除读者类型成功!')
      this.getReaderTypeList()
    },
    // //  关闭添加对话框重新刷新表单
    closeAddDialog() {
      this.$refs.addReaderTypeRef.resetFields()
    },
    //  点击编辑读者类型出现对话框
    async showEidtDialog(id) {
      this.editReaderTypeDialogVisible = true
      const {data: res} = await this.$http.get(`/rest/readertype/${id}`)
      this.editReaderTypeForm = res

    },
    //  关闭编辑对话框重新刷新表单
    closeEidtDialog() {
      this.$refs.editReaderTypeRef.resetFields()
    },
    //  点击提交修改读者类型
    editReaderType() {
      this.$refs.editReaderTypeRef.validate( async valid => {
        if (!valid)
          return this.$message.error('请输入相关信息!')
        const {data: res } = await this.$http.put(`rest/readertype/${this.editReaderTypeForm._id}`,this.editReaderTypeForm)
        if (res.meta.status !== 200) {
          return this.$message.error('修改读者类型失败!')
        }
        this.getReaderTypeList()
        this.editReaderTypeDialogVisible = false
        this.$message.success('修改读者类型成功!')
      })
    }
  }
}
</script>

<style scoped>

</style>