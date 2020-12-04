<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图-->
    <el-card class="box-card">
      <!--      添加图书按钮-->
      <el-button type="primary" @click="showAddbookDialog">添加图书</el-button>
      <!--      表格-->
      <el-table
          border
          :data="bookList"
          stripe
          style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="bk_code" label="图书编号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bk_name" label="书名" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bk_author" label="作者" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bk_press" label="出版社" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="public_date" label="出版日期" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="language" label="语言"></el-table-column>
        <el-table-column prop="page" label="页数"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="status" label="是否在馆" width="90">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.status === 1">在馆</el-tag>
            <el-tag type="danger" size="mini" v-else>不在馆</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="showEidtDialog(scope.row._id)" :disabled="isInBookStore(scope.row.status)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeBookById(scope.row._id)" :disabled="isInBookStore(scope.row.status)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--  图书入库的对话框-->
    <el-dialog
        @close="closeAddDialog"
        title="图书入库"
        :visible.sync="addBookDialogVisible"
        width="50%">
      <!--      验证表单-->
      <el-form :model="addBookForm"
               :rules="addBookRules"
               ref="addBookRef"
               label-width="100px" status-icon>
        <el-form-item label="书本编号" prop="bk_code">
          <el-input v-model="addBookForm.bk_code"></el-input>
        </el-form-item>
        <el-form-item label="书本名称" prop="bk_name">
          <el-input v-model="addBookForm.bk_name"></el-input>
        </el-form-item>
        <el-form-item label="作者名称" prop="bk_author">
          <el-input v-model="addBookForm.bk_author"></el-input>
        </el-form-item>
        <el-form-item label="书本出版社" prop="bk_press">
          <el-input v-model="addBookForm.bk_press"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" required prop="public_date">
          <el-form-item prop="public_date">
            <el-date-picker type="date" placeholder="选择日期" v-model="addBookForm.public_date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="书本页数" prop="page">
          <el-input v-model="addBookForm.page"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-input v-model="addBookForm.language"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" >
          <el-input v-model="addBookForm.price" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addBookDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addBook()">确 定</el-button>
  </span>
    </el-dialog>

    <!--    编辑图书的对话框-->
    <el-dialog
        @close="closeEidtDialog"
        title="图书入库"
        :visible.sync="editBookDialogVisible"
        width="50%">
      <!--      验证表单-->
      <el-form :model="editBookForm"
               :rules="editBookRules"
               ref="editBookRef"
               label-width="100px" status-icon>
        <el-form-item label="书本编号" prop="bk_code">
          <el-input v-model="editBookForm.bk_code"></el-input>
        </el-form-item>
        <el-form-item label="书本名称" prop="bk_name">
          <el-input v-model="editBookForm.bk_name"></el-input>
        </el-form-item>
        <el-form-item label="作者名称" prop="bk_author">
          <el-input v-model="editBookForm.bk_author"></el-input>
        </el-form-item>
        <el-form-item label="书本出版社" prop="bk_press">
          <el-input v-model="editBookForm.bk_press"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" required prop="public_date">
          <el-form-item prop="public_date">
            <el-date-picker type="date" placeholder="选择日期" v-model="editBookForm.public_date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="书本页数" prop="page">
          <el-input v-model="editBookForm.page"></el-input>
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-input v-model="editBookForm.language"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price" >
          <el-input v-model="editBookForm.price" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editBookDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editBook">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Book",
  created() {
    this.getBookList()
  },
  data() {
    const checkPage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('页码不能为空!'));
      }
      setTimeout(() => {
        if (parseFloat(value).toString() === 'NaN') {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 1) {
            callback(new Error('价格不能为0！'));
          } else {
            callback();
          }
        }
      }, 0);
    }
    const checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('价格不能为空!'));
      }
      setTimeout(() => {
        if (parseFloat(value).toString() === 'NaN') {
          callback(new Error('请输入数字值'));
        } else {
          if (value < 1) {
            callback(new Error('价格不能为0！'));
          } else {
            callback();
          }
        }
      }, 0);
    }
    return {
      addBookDialogVisible: false,
      //双向绑定的表单
      addBookForm: {
        bk_code: '',
        bk_name: '',
        bk_author: '',
        bk_press: '',
        public_date: '',
        language: '',
        page: '',
        price: ''
      },
      // 表单的验证规则
      addBookRules: {
        bk_code: [
          { required: true, message: '请输入书本编号', trigger: 'blur' },
        ],
        bk_name: [
          { required: true, message: '请输入书本名称', trigger: 'blur' },
        ],
        bk_author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
        ],
        bk_press: [
          { required: true, message: '请输入书本出版社', trigger: 'blur' },
        ],
        public_date: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
        page: [
          { validator: checkPage, trigger: 'blur' },
        ],
        language: [
          { required: true, message: '请输入语言', trigger: 'blur' },
        ],
        price: [
          { validator: checkPrice, trigger: 'blur' },
        ],
      },
      bookList: [],
      editBookDialogVisible: false,
      //编辑图书的表单
      editBookForm: {},
      //编辑图书的验证规则
      editBookRules:{
        bk_code: [
          { required: true, message: '请输入书本编号', trigger: 'blur' },
        ],
        bk_name: [
          { required: true, message: '请输入书本名称', trigger: 'blur' },
        ],
        bk_author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' },
        ],
        bk_press: [
          { required: true, message: '请输入书本出版社', trigger: 'blur' },
        ],
        public_date: [
          { required: true, message: '请输入书本出版日期', trigger: 'blur' },
        ],
        page: [
          { validator: checkPage, trigger: 'blur' },
        ],
        language: [
          { required: true, message: '请输入语言', trigger: 'blur' },
        ],
        price: [
          { validator: checkPrice, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    //判断是否在馆
    isInBookStore(status) {
      if (status === 0 ) return true
      return false
    },
    showAddbookDialog() {
      this.addBookDialogVisible = true
    },
    //点击确定按钮添加图书
    addBook() {
      this.$refs.addBookRef.validate( async valid => {
        if (!valid) return this.$message.error('请输入相关信息!')
        const {data:res} = await this.$http.post(`rest/book`,this.addBookForm)
        if (res.meta.status !== 200) {
          return this.$message.error('添加图书失败!')
        }
        this.$message.success('添加成功!')
        this.getBookList()
        this.addBookDialogVisible = false
      })
    },
    //获取图书
    async getBookList() {
     const {data: res} = await this.$http.get(`rest/book`)
      this.bookList = res
    },
    //  删除图书
    async removeBookById(id) {
      console.log(id);
      const confirmRs = await this.$confirm('是否删除该图书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch( err => err)

      if (confirmRs !== 'confirm') {
        return this.$message.info('宁已取消!')
      }


      const {data: res } = await this.$http.delete(`rest/book/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除图书失败!')
      }
      this.$message.success('删除图书成功!')
      this.getBookList()
    },
    //  关闭编辑对话框重新刷新表单
    closeAddDialog() {
      this.$refs.addBookRef.resetFields()
    },
    //  点击编辑图书出现对话框
    async showEidtDialog(id) {
      this.editBookDialogVisible = true
      const {data: res} = await this.$http.get(`rest/book/${id}`)
      this.editBookForm = res

    },
    //  关闭编辑对话框重新刷新表单
    closeEidtDialog() {
      this.$refs.editBookRef.resetFields()
    },
    //  点击提交修改图书
    editBook() {
      this.$refs.editBookRef.validate( async valid => {
        if (!valid)
          return this.$message.error('请输入相关信息!')
        const {data: res } = await this.$http.put(`rest/book/${this.editBookForm._id}`,this.editBookForm)
        if (res.meta.status !== 200) {
          return this.$message.error('修改图书信息失败!')
        }
        this.getBookList()
        this.editBookDialogVisible = false
        this.$message.success('修改图书信息成功!')
      })
    }
  },
}
</script>

<style scoped>

</style>