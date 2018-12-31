
<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
.container {
    height: 100%;
}
.header {
    background-color: yellow;
}
.aside{
    background-color: pink;
}
.main {
    background-color: lightseagreen;
}
</style>
