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
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in attDy" :key="i">
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
        <el-tab-pane name="4" label="商品图片">
          <el-form-item label="添加图片">
            <el-upload
              class="upload-demo"
              :headers="headers"
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button type="primary" @click="addGoods()">添加商品</el-button>
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
// goods_name	    商品名称	不能为空
// goods_price	  价格	不能为空
// goods_number	  数量	不能为空
// goods_weight	    重量	不能为空
// goods_introduce	介绍	可以为空
// goods_cat	    以为','分割的分类列表	不能为空
// pics	             上传的图片临时路径（对象）	可以为空
// attrs
// require styles

// 引入富文本样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor
  },

  data() {
    return {
      active: "1",
      form: {
        goods_name: "",
        goods_price: "",
        goods_weight: "",
        goods_number: "",
        goods_introduce: "",
        // 商品分类 级联选择器
        goods_cat: "",
        // 商品图片
        pics: [],
        // 商品参数 动态参数和静态参数
        attrs: []
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
      attStatic: [],
      // 请求地址
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 添加商品发请求
    async addGoods() {
      // 处理数据
      this.form.goods_cat = this.selectedOptions.join(",");

      // 处理动态参数
      // console.log(this.attDy);
      const arrnew1 = this.attDy.map(item => {
        return { attr_id: item.attr_id, attr_vals: item.attr_vals };
      });
      // console.log(arrnew1);
      // 处理静态参数
       const arrnew2 = this.attStatic.map(item => {
        return { attr_id: item.attr_id, attr_vals: item.attr_vals };
      });
      // console.log(arrnew2);

      const arr = [...arrnew1,...arrnew2];
      this.form.attrs = arr
      // console.log(this.form.attrs);
      
      const res = await this.$http.post('goods',this.form);
      console.log(res);
      // 创建商品成功后，回到列表页
      this.$router.push({
        name:"goods"
      });

      
    },
    // 文件上传函数
    handleRemove(file, fileList) {
      //  console.log('删除');

      // console.log(file);
      [{ pic: "abd" }, { pic: "adnj" }];
      // 当 x掉图片时，从this.form.pics删除图片
      // 找索引 findIndex(会把满足条件的索引返回)
      const index = this.form.pics.findIndex(item => {
        // 遍历的pic和移除钩子函数中的pic相等，将这个pic的索引返回
        return (item.pic = file.response.data.tmp_path);
      });
      // 从数组中删除
      this.form.pics.splice(index, 1);
      //  console.log('删除',this.form.pics);
    },
    handlePreview(file) {
      // console.log(file);
    },

    handleSuccess(response, file) {
      //  console.log('上传成功');

      // console.log(response);
      // 上传文件的临时路径
      // 处理pics数据
      this.form.pics.push({
        pic: response.data.tmp_path
      });
      // console.log('添加',this.form.pics);

      // response.data.tmp_path
    },

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
          // console.log(this.attStatic);
          
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
.ql-editor {
  min-height: 200px;
}
</style>
