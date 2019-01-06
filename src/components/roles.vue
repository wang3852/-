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
      <!-- 展开行 -->
      <el-table-column el-table-column type="expand" width="80">
        <template slot-scope="scope">
          <!-- 处理有权限 -->
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                class="level1"
                @close="deleRights(scope.row,item1)"
                closable
                type="success"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    class="level2"
                    @close="deleRights(scope.row,item2)"
                    closable
                    type="info"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    class="level3"
                    @close="deleRights(scope.row,item3)"
                    closable
                    v-for="(item3,i) in item2.children"
                    :key="i"
                  >{{item3.authName}}</el-tag>
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
            <el-button type="primary" plain size="mini" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
            <el-button
              type="success"
              @click="showDiaRight(scope.row)"
              plain
              size="mini"
              icon="el-icon-check"
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配权限的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisibleRight" width="30%">
      <span>分配权限</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </span>

      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: [],
      treeData: [],
      dialogVisibleRight: false,
      expandedArr: [],
      checkedArr: [],
      defaultProps: {
        label: "authName",
        children: "children"
      },
      currRoleId: "",
      currRigId: ""
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
    // 角色授权
    async setRights() {
      // 发请求
      // 角色id  roleId
      // 权限id  rids
      // 获取数据
      // 全选
      const arr1 = this.$refs.tree.getCheckedKeys();
      //  console.log(arr1);
      // 半选
      const arr2 = this.$refs.tree.getHalfCheckedKeys();
      // console.log(arr2);
      const arr = [...arr1, ...arr2];
      this.currRigId = arr.join(",");

      const res = await this.$http.post(`roles/${this.currRoleId}/rights`, {
        rids: this.currRigId
      });
      console.log(res);
      this.dialogVisibleRight = false;
      //  刷新列表
      this.getRoles();
    },
    // 展示分配权限对话框
    async showDiaRight(rights) {
      this.currRoleId = rights.id;
      // console.log(rights);
      // 循环遍历数组，找到第三层权限的id(因为选中最里面的，外面的也会自动跟着选中)
      const tempArr = [];
      rights.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            tempArr.push(item3.id);
          });
        });
      });
      // console.log(tempArr);
      this.checkedArr = tempArr;

      // 获取权限树
      const res = await this.$http.get("rights/tree");
      // console.log(res);
      this.treeData = res.data.data;
      // console.log(this.treeData);
      this.dialogVisibleRight = true;
    },
    // 取消权限
    async deleRights(role, right) {
      // console.log(role);
      // console.log(right);
      // 发请求
      // 角色id
      // 权限id
      // const token = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = token;

      const res = await this.$http.delete(
        `roles/${role.id}/rights/${right.id}`
      );

      // 当前角色刷新
      role.children = res.data.data;
      // console.log(res);

      // 全部刷新
      // this.getRoles();
    },
    // 获取角色列表数据
    async getRoles() {
      //  请求头
      const res = await this.$http.get("roles");
      // console.log(res);
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
.level1,
.level2,
.level3 {
  margin-top: 10px;
}
.level3 {
  margin-left: 5px;
}
</style>
