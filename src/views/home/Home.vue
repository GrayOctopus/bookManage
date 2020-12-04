<template>
<!--  布局容器-->
  <el-container class="home_container">
<!--    头部区域-->
    <el-header>
      <span>图书管理系统</span>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">
        <el-menu
            router
            unique-opened
            :default-active="this.activePath"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409EFF">
<!--          一级菜单-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>读者管理</span>
            </template>
<!--            二级菜单-->
            <el-menu-item index="/readertype" @click="savePath('/readertype')">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-menu"></i>
                <!--              文本-->
                <span>读者类型</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/readerinfo" @click="savePath('/readerinfo')">
              <template slot="title">
                <!--              图标-->
                <i class="el-icon-menu"></i>
                <!--              文本-->
                <span>读者信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/book" @click="savePath('/book')">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>图书管理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/borrow" @click="savePath('/borrow')">
            <template slot="title">
              <i class="el-icon-shopping-cart-full"></i>
              <span>借阅图书</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/report" @click="savePath('/report')">
            <template slot="title">
              <i class="el-icon-data-line"></i>
              <span>数据报表</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
<!--      主体-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  data() {
    return {
      activePath: ''
    }
  },
  methods: {
    savePath(activepath) {
      window.sessionStorage.setItem('activePath',activepath)
      this.activePath = activepath
    },
    logOut() {
        window.sessionStorage.clear('token')
        this.$message.success('退出成功!')
        this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  font-size: 18px;
  font-weight: bold;
  justify-content: center;
}
.el-header > span {
  flex: 1;
}
.el-submenu > i {
  margin-right: 5px;
}

.el-aside {
  background-color: #545c64;
}

.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}

.el-button {
  height: 50px;
  margin-top: 5px;
  margin-left: auto;
}

</style>