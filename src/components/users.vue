<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 + 按钮-->
    <el-row>
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table height="300px" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="120"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>

      <el-table-column label="创建日期">
        <template slot-scope="scope">{{scope.row.create_time | fmtDate}}</template>
      </el-table-column>

      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <!-- 内层组件使用外层组件的值，用slot-scope -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop label="操作" width="300">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" plain size="mini" icon="el-icon-edit" circle></el-button>
            <el-button type="danger"  plain size="mini" icon="el-icon-delete" circle></el-button>
            <el-button type="success" plain size="mini" icon="el-icon-check" circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      tableData: [],
      pagenum: 1,
      pagesize: 2,
      total:1
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 分页
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        // 更改当前条数，重新发请求，渲染表格数据 pagenum=1,pagesize=val
        this.pagesize=val
        this.pagenum=1
        this.getTableData();
      },
      handleCurrentChange(val) {

        // 改变页数，重新发起请求 ,获取当前页数的数据 pagenum=val,pagesize=2
        this.pagenum=val
        this.getTableData();
        console.log(`当前页: ${val}`);
      },

    //   获取表格数据
    async getTableData() {
      // 设置请求体
      const token = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = token;
      const res = await this.$http.get(`users?query=${this.query}&pagenum=
       ${this.pagenum}&pagesize=${this.pagesize}`);
      // console.log(res);
      const {
        data: {
          data: { total, users },
          meta: { msg, status }
        }
      } = res;
      if (status == 200) {
        // 设置分页总条数
        this.total = total;
        console.log(users);
       
        this.tableData = users;
  
        this.$message.success('获取管理员信息成功')
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}

.input-with-select {
  width: 350px;
  margin-top: 20px;
}
</style>
