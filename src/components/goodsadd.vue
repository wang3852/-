<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 消息提示 -->
    <el-row class="alert">
      <el-col>
        <el-alert type="info" title="添加商品信息" show-icon center :closable="false"></el-alert>
      </el-col>
    </el-row>

    <!-- 步骤条 -->
    <el-steps :active="Number(active)" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs标签 -->
    <el-form :model="form" label-width="80px" label-position="top" class="form">
      <el-tabs v-model="active" tab-position="left" class="tabs">
        <el-tab-pane name="1" label="基本信息"></el-tab-pane>
        <el-form-item label="商品名称">
          <el-input v-mode="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-mode="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-mode="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-mode="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-input v-mode="form.goods_cat"></el-input>
        </el-form-item>

        <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// goods_name	    商品名称	不能为空
// goods_cat	    以为','分割的分类列表	不能为空
// goods_price	  价格	不能为空
// goods_number	  数量	不能为空
// goods_weight	    重量	不能为空
// goods_introduce	介绍	可以为空
// pics	             上传的图片临时路径（对象）	可以为空
// attrs	          商品的参数（数组）	可以为空
export default {
  data() {
    return {
      active: "1",
      form: {
        goods_name:'',	    
        goods_price:'',	  
        goods_weight:'',	  
        goods_number:'',  
        goods_cat:'',	    
        goods_introduce:'',
        pics:'',	          
        attrs:''      
      }
    };
  }
};
</script>

<style>
.card {
  height: 100%;
}
.alert {
  margin: 10px 0;
}
.tabs {
  margin-top: 20px;
}
.form {
  height: 400px;
  overflow: auto;
}
</style>
