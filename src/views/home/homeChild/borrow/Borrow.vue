<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>借阅图书</el-breadcrumb-item>
    </el-breadcrumb>

<!--    卡片视图-->
    <el-card class="box-card">
      <el-button type="primary" @click="borrowBook">借阅读书</el-button>
      <el-table
          border
          :data="borrowInfoList"
          stripe
          style="width: 100%">
        <el-table-column type="index" label="#" ></el-table-column>
        <el-table-column prop="rd_id" label="读者学号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="bk_id" label="图书编号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ldContinueTimes" label="续借次数" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ldDateOut" label="借书日期" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="lsHasReturn" label="是否已还书" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.lsHasReturn === 1">是</el-tag>
            <el-tag type="danger" size="mini" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="OperatorLend" label="借书操作员" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-time" @click="continueBorrow(scope.row)" :disabled="isHasReturn(scope.row.lsHasReturn)">续借</el-button>
            <el-button type="warning" size="mini" icon="el-icon-folder" @click="returnBook(scope.row)" :disabled="isHasReturn(scope.row.lsHasReturn)">还书</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeBorrowInfoById(scope.row._id)" :disabled="!isHasReturn(scope.row.lsHasReturn)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--  借书的对话框-->
    <el-dialog
        @close="closeBorrowDialog"
        title="图书入库"
        :visible.sync="addBorrowInfoDialogVisible"
        width="50%">
      <!--      验证表单-->
      <el-form :model="addBorrowForm"
               :rules="addBorrowRules"
               ref="addBorrowRef"
               label-width="100px" status-icon>
        <el-form-item label="读者学号" prop="rd_id" >
            <el-input v-model="addBorrowForm.rd_id" ref="readerIdRef" @blur="getReader"></el-input>
        </el-form-item>
        <el-form-item label="图书编号" prop="bk_id">
          <el-select v-model="addBorrowForm.bk_id" placeholder="请选择要借阅的图书" style="width: 100%">
            <el-option :label="item.bk_name" :value='item.bk_code' v-for="item in this.bookList"></el-option>
          </el-select>
        </el-form-item>
        <p class="userinfo">读者姓名 <span>{{this.readerInfo.rd_name}}</span></p>
        <p class="userinfo">读者类型 <span>{{this.readerType.rd_typename}}</span></p>
        <p class="userinfo">您已借阅 <span>{{this.readerInfo.rd_borrowqty}}</span></p>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addBorrowInfoDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addBorrow()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Borrow",
  created() {
    this.getBorrowInfoList()
  },
  data() {
    return {
      //能否续借的控制
      isCancontinueBorrow: false,
      //续借的读者信息
      contineBorrowReaderInfo: '',
      //续借的读者类型
      continueBorrowReaderType: '',
      //输入的读者
      readerInfo: '',
      //读者类型
      readerType: '',
      //图书列表
      bookList: [],
      borrowInfoList: [],
      addBorrowInfoDialogVisible: false,
      //双向绑定的表单
      addBorrowForm: {
        rd_id: '',
        bk_id: '',
        OperatorLend: 'admin',//借书操作员
      },
      // 表单的验证规则
      addBorrowRules: {
        rd_id: [
          { required: true, message: '请输入读者学号', trigger: 'blur' },
        ],
        bk_id: [
          { required: true, message: '请输入读书', trigger: 'change' },
        ]
      },
    }
  },
  methods: {
    //根据学号寻找reader名字
    async getReader() {
      // console.log(this.addBorrowForm.rd_id);
      let id = this.addBorrowForm.rd_id
      let {data: res} = await this.$http.get(`readerinfo/${id}`)
      if( !res ) {
        return this.$message.error('您输入的读者不存在!')
      }
      this.readerInfo = res
      this.getReaderType()
    },
    //根据类型寻找类型名
    async getReaderType() {
      const id = this.readerInfo.rd_type
      let  { data: res } = await this.$http.get(`readertype/${id}`)
      console.log(res);
      this.readerType = res
    },
    //判度是否已经还书了
    isHasReturn(status) {
      if (status === 1) {
        return true
      }
      return false
    },
    //获取读书列表
    async getBookList() {
      const {data: res} = await this.$http.get(`rest/book`)
      this.bookList = res
      this.bookList.forEach((item,index) => {
        if (item.status === 0)
          this.bookList.splice(index,1)
      })
      console.log(this.bookList);
    },
    async getBorrowInfoList() {
      const {data:res } = await this.$http.get('rest/borrowinfo')
      this.borrowInfoList = res
    },
  //  关闭借书的对话框
    closeBorrowDialog() {
      this.$refs.addBorrowRef.resetFields()
      this.readerInfo = ''
      this.readerType = ''
    },
  //  点击按钮出现添加按钮对话框
    borrowBook() {
      this.getBookList()
      this.addBorrowInfoDialogVisible = true
    },
  //  确认借书
    addBorrow() {
      this.$refs.addBorrowRef.validate( async valid => {
        if (!valid)
          return this.$message.error('请输入相关信息!')
        if (this.readerInfo.rd_borrowqty >= this.readerType.canLendQty) {
          return this.$message.error('你已经超过了最大借书数目!')
        }
        const {data:res} = await this.$http.post(`borrowbook`,this.addBorrowForm)
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error('借书失败!')
        }
        this.$message.success('借书成功!')
        this.getBorrowInfoList()
        this.addBorrowInfoDialogVisible = false
      })
    },
  //  还书
    async returnBook(message) {
     const confirmRs =  await this.$confirm('是否还书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);

      if (confirmRs !== 'confirm') {
        return this.$message.info('宁已取消!')
      }
      console.log(message);
      const {data: res} = await this.$http.post('returnbook',message)
      if (res.meta.status !== 200) {
        return this.$message.error('还书失败!')
      }
      this.$message.success('还书成功!')
      this.getBorrowInfoList()
      console.log(res);
    },
  //  续借
    async continueBorrow(message) {
      const confirmRs =  await this.$confirm('是否续借？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (confirmRs !== 'confirm') {
        return this.$message.info('宁已取消!')
      }
      const {data:res} = await this.$http.post('relendbook',message)
      console.log(res);
      if (res.meta.status == 201) {
        this.$message.error('你不能再续借了!')
        this.isCancontinueBorrow = true
      }
      else if (res.meta.status !== 200) {
        this.$message.error('续借失败!')
      }
      else {
        this.$message.success('续借成功!')
        this.getBorrowInfoList()
      }
    },
  //  删除借阅信息
    async removeBorrowInfoById(id) {
      const confirmRs =  await this.$confirm('是否还书？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      if (confirmRs !== 'confirm') {
        return this.$message.info('宁已取消!')
      }
      const {data: res} = await this.$http.delete(`rest/borrowinfo/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败!')
      }
      this.$message.success('删除成功!')
      this.getBorrowInfoList()
    }
  }
}
</script>

<style scoped>
.userinfo {
  margin: 30px 0 30px 30px ;
}

.userinfo >span {
  margin-left: 20px;
}
</style>