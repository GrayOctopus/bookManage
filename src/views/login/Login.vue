<template>
  <div class="login_container">
    <div class="login_box">
        <!--头像区域-->
      <div class="avatar_box">
        <img src="~assets/logo.jpg" alt="">
      </div>
        <!--登录表单区域-->
      <el-form :rules="loginFormRules"  :model="loginForm" label-width="0px" class="login_form" ref="loginFormRef">
<!--        //用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user-filling" ></el-input>
        </el-form-item>
<!--          密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-password" type="password" show-password ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resertLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resertLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
        this.$refs.loginFormRef.validate(async valid => {
        if(!valid)
        {
          return
        }
          console.log(this.loginForm);
          const {data:res}  = await this.$http.post(`login`, this.loginForm)
          console.log(res);
          if (res.meta.status == 421) {
            return this.$message.error('用户不存在!')
          }
          if (res.meta.status == 422) {
            return this.$message.error('密码错误!')
          }
          if (res.meta.status == 200) {
            this.$message.success('登陆成功!')
            //登录成功携带token实现跳转
            // console.log(res.data.token);
            window.sessionStorage.setItem('token',res.token)
          }
          this.$router.push('/home')

          //   console.log(res);
          // getLogin(this.loginForm.username,this.loginForm.password).then(res => {
        //  if (res.meta.status !== 200)
        //    return this.$message.error('登录失败!')

        // })
        })
      // this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.login_container {
  background-color: #5aa1f6;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.avatar_box {
  height: 130px;
  width: 130px;
  boder: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

}
</style>