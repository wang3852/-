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
    <el-table type="expand" height="400px" :data="roles" style="width: 100%">
      <el-table-column el-table-column type="expand" width="80">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">

            <el-col :span=4>
              <el-tag class="level1" closable type='success'>{{item1.authName}}</el-tag>
               <i class="el-icon-arrow-right"></i>
            </el-col>

            <el-col :span=20>
              <el-row  v-for="(item2,i) in item1.children" :key="i">
                <el-col :span=4>
                  <el-tag class="level2" closable type="info">{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                </el-col>
                 <el-col :span=20>    
                    <el-tag class="level3" closable v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
                 </el-col>
              </el-row>
            </el-col>
          </el-row>
          
          <!-- 没有权限 -->
          <el-row v-if="scope.row.children.length===0">
            <el-col>
              <span>该角色没有任何权限</span>
            </el-col>
          </el-row>

        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色名称" width="240"></el-table-column>
      <el-table-column prop="roleName" label="角色描述" width="240"></el-table-column>

      <el-table-column prop label="操作" width="360">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary"  plain size="mini" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
            <el-button type="success" plain size="mini" icon="el-icon-check" circle></el-button>
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
      // console.log(res);
      this.roles = res.data.data;
      console.log(this.roles);
      
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
.level1,.level2,.level3{
  margin-top:10px;
}
.level3 {
  margin-left: 5px;
}

</style>
