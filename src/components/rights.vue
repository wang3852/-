<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 表格 -->
    <el-table
      :data="rights"
      border
     height="400px">
      <el-table-column type="index"  label="#" width="80"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rights: []
    };
  },

  created() {
    this.getRights();
  },
  methods: {
    // 发请求
    async getRights() {
      // 设置请求体
      const token = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;

      const res = await this.$http.get("rights/list");
      // console.log(res);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status == 200) {
        this.rights = data;
        console.log(this.rights);
      } else {
        this.$message.waring(msg);
      }
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
</style>
