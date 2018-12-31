<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata" class="form">
      <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click.prevent="handleLogin()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formdata)
      // const {
      //   data: {
      //     meta: { msg, status}
      //   }
      // } = res
      const {data: {meta: {msg, status}}} = res

      if (status === 200) {
        //   保存token值
        // localStorage.setItem('token', data.token)

        // 进去home页
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message({
          message: msg,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #314052;
  /* 使用弹性布局上下左右都居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 4px;
}
.btn {
  width: 100%;
}
</style>
