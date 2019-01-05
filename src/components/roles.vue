<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 按钮 -->
    <el-row class="row">
      <el-col>
        <el-button type="primary" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table height="300px" :data="roles" style="width: 100%">
      <el-table-column type="index" label="#" width="120"></el-table-column>
      <el-table-column prop="roleDesc" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色描述" width="180"></el-table-column>
    
      <el-table-column prop label="操作" width="300">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              plain
              size="mini"
              icon="el-icon-edit"
         
              circle
            ></el-button>
            <el-button
              type="danger"
              plain
              size="mini"
              icon="el-icon-delete"
           
              circle
            ></el-button>
            <el-button
              type="success"
              plain
              size="mini"
              icon="el-icon-check"
         
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: []
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    // 获取角色列表数据
    async getRoles() {
      //  请求头
      const token = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;
      const res = await this.$http.get("roles");
      console.log(res);
      this.roles = res.data.data;
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
.row {
  margin-top: 20px;
}
</style>
