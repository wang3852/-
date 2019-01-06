
<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <img src="../assets/logo.png">
        </el-col>
        <el-col :span="19" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="1">
          <a href="#" class="logout" @click.prevent="handlelogout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu router default-active="2" unique-opened>
            <!-- 1 -->
          <el-submenu :index=" '' + item1.order" v-for="(item1) in menu" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2) in item1.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              {{item2.authName}}
            </el-menu-item>
          </el-submenu>
        
        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menu:[]
    }
  },
// 在渲染组件前，判断token,否，提示登录，有，进入home
// beforeCreate() {
//   if (!localStorage.getItem('token')) {
//     // 登录页
//     this.$router.push({
   
//       path: '/login'
//     })
//     // 提示
//     this.$message.warning('请先登录')
    
//   }
// },
created() {
this.getMenu();
},

  // 退出
  methods:{
    // 菜单导航
   async getMenu() {
      // 发请求
      const res = await this.$http.get(`menus`);
      // console.log(res);
      this.menu = res.data.data;
      console.log(this.menu);
      
      
    },
    handlelogout() {
      // 回到登录页
      this.$router.push({
       name: 'login'
      })
      // 删除token值
      localStorage.clear();
      // 提示
      this.$message.success('退出成功')

    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b1becf;
}


.middle {
  text-align: center;
  color: #fff;
}
.logout {
  line-height: 60px;
  text-decoration: none;
}
</style>
