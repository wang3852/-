<template>
 <el-card class="card">
   <!-- 面包屑 -->
   <my-bread level1="权限管理" level2="角色列表"></my-bread>
   <!-- 按钮 -->
   <el-row class="row">
     <el-col>
       <el-button type='primary' plain="">添加角色</el-button>
     </el-col>
   </el-row>
   <!-- 表格 -->
 </el-card>
</template>

<script>
export default {

}
</script>

<style>
.card {
  height: 100%;
}
.row {
  margin-top: 20px;
}
</style>
