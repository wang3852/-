<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <!-- 提示 -->
    <el-alert title="注意：只能为第三级分类设置参数" type="warning" show-icon :closable="false" center></el-alert>
    <!-- 级联选择器 -->
    <el-form :model="form">
      <el-form-item label="请选择商品分类">
        <el-cascader
          :props="props"
          clearable
           :show-all-levels="false"
          expand-trigger="hover"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange()"
        ></el-cascader>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form:{},
      selectedOptions:[],
      options:[],
      props:{
        label:'cat_name',
        value:'cat_id',
        children:'children'
      }
    }
  },
  created(){
    this.getGoodsCate();
  },
  methods:{
    handleChange(){

    },
    async getGoodsCate() {
      const res = await this.$http.get("categories?type=3");
      // console.log(res);
      this.options = res.data.data;
      console.log(this.options);
      
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
</style>
