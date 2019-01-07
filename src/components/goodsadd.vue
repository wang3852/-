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
      <el-tabs @tab-click="changeTab()" v-model="active" tab-position="left" class="tabs">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            {{selectedOptions}}
            <el-cascader
              :props="props"
              clearable
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange()"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in attDy" :key="item1.attr_id">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border :label="item2" v-for="(item2,i) in item1.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in  attStatic" :key="i">
            <el-input v-model="item1.attr_vals"></el-input>
          </el-form-item>

        </el-tab-pane>
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
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_cat: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      // 级联数据
      selectedOptions: [],
      // 被选中label的value中
      options: [],
      props: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数
      attDy: [],
      // 静态参数
      attStatic:[]
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // tab改变事件
    async changeTab() {
      if (this.active === "2") {
        //  获取商品分类参数列表
        if (this.selectedOptions.length === 3) {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=many`
          );
          // console.log(res);
          this.attDy = res.data.data;
          // console.log(this.attDy);
          // 将分类vals值字符串转数组
          this.attDy.forEach(item => {
           
            item.attr_vals = item.attr_vals.trim().split(",");
            // console.log(item.attr_vals);
          });
        } else {
          this.$message.warning("请先选择三级分类");
        }
      }
      // 商品属性
       if (this.active === "3") {
         if (this.selectedOptions.length === 3) {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          // console.log(res);
          this.attStatic = res.data.data;
          console.log(this.attStatic);
         
        } else {
          this.$message.warning("请先选择三级分类");
        }

       } 
    },
    handleChange() {},
    // 获取商品列表
    async getGoodsCate() {
      const res = await this.$http.get("categories?type=3");
      // console.log(res);
      this.options = res.data.data;
    }
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
