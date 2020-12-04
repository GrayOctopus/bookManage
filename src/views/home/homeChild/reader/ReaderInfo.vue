<template>
  <div>
    <!--   面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
      <el-breadcrumb-item>读者管理</el-breadcrumb-item>
      <el-breadcrumb-item>读者信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!--  卡片视图-->
    <el-card class="box-card">
      <!--      添加读者信息按钮-->
      <el-button type="primary" @click="addReader">添加读者</el-button>
      <!--      表格-->
      <el-table
          border
          :data="readerInfoList"
          stripe
          style="width: 100%">
        <el-table-column type="index" label="#" ></el-table-column>
        <el-table-column prop="rd_card" label="读者学号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_name" label="读者姓名" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_sex" label="性别" :show-overflow-tooltip="true" width="50px">
          <template slot-scope="scope">
            <i class="el-icon-male" v-if="scope.row.rd_sex == 0"></i>
            <i class="el-icon-female" v-else></i>
          </template>
        </el-table-column>
        <el-table-column prop="rd_type" label="读者类别" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_dep" label="单位名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_phone" label="电话号码" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_email" label="电子邮箱" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_borrowqty" label="已借图书数量(本)" :show-overflow-tooltip="true" width="130px"></el-table-column>
        <el-table-column prop="rd_datereg" label="办证日期" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="rd_status" label="证件状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.rd_status === 0" size="mini">有效</el-tag>
            <el-tag type="warning" v-if="scope.row.rd_status === 1" size="mini">挂失</el-tag>
            <el-tag type="danger" v-if="scope.row.rd_status === 2" size="mini">注销</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="rd_adminroles" label="管理角色">
          <template slot-scope="scope">
            <el-tag type="primary" size="mini" v-if="scope.row.rd_adminroles === 0">读者</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="editReader(scope.row._id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeReaderInfoById(scope.row._id)" :disabled="isBorrowBook(scope.row.rd_borrowqty)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
export default {
  name: "ReaderInfo",
  created() {
    this.getReaderInfoList()
  },
  data() {
    return {
      readerInfoList: [],
    }
  },
  methods: {
    //判度读者是否借书
     isBorrowBook (status) {
       if (status > 0) {
         return true
       }
       return false
    },
    //编辑读者
    editReader(id) {
      this.$store.commit('getReaderId',id)
      this.$router.push('/editreader')
    },

    //添加读者
    addReader() {
      this.$router.push('/addreader')
    },
    async getReaderInfoList() {
      await this.$http.get('rest/readerinfo').then( res => {
        this.readerInfoList = res.data
        console.log(this.readerInfoList);
      })
    },
    async removeReaderInfoById(id) {
      const confirmRs = await this.$confirm('是否删除该读者？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch( err => err)

      if (confirmRs !== 'confirm') {
        return this.$message.info('宁已取消!')
      }

      const {data: res } = await this.$http.delete(`rest/readerinfo/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除读者失败!')
      }
      this.$message.success('删除读者成功!')
      this.getReaderInfoList()
    }
  }
}
</script>

<style scoped>

</style>