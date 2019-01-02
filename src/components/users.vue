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
        <el-input
          @clear="getDateAll()"
          clearable
          placeholder="请输入用户名"
          v-model="query"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" plain @click="showDiaAdd()">添加用户</el-button>
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
            <el-button type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
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
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
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
      total: 1,
      form:{
        username:'',
        password:'',
        email:'',
        mobile:''

      },
     dialogFormVisibleAdd:false,
     formLabelWidth:"100px"
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    // 添加用户
   async addUser() {
      // 发请求
      const res = await this.$http.post('users',this.form)
      // console.log(res)
      const {meta:{msg,status}}=res.data;
      if (status ==201) {
        // 关闭对话框
       this.dialogFormVisibleAdd = false
      // 渲染列表
      this.getTableData();
      } else {
        this.$message.warning('该用户名已存在');
      }
      
      
    },
    // 显示对话框
    showDiaAdd() {
      this.form={};
      this.dialogFormVisibleAdd=true;
    },
    // 当点击搜索x时，渲染所有数据
    getDateAll() {
      this.getTableData();
    },
    // 搜索查询
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 更改当前条数，重新发请求，渲染表格数据 pagenum=1,pagesize=val
      this.pagesize = val;
      this.pagenum = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      // 改变页数，重新发起请求 ,获取当前页数的数据 pagenum=val,pagesize=2
      this.pagenum = val;
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

        this.$message.success("获取管理员信息成功");
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
