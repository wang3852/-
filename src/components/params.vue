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
    <!-- tabs标签 -->
    <el-tabs type="border-card" v-model="active" @tab-click="changetas()">
      <el-tab-pane label="动态参数" name="1">
        <el-table height="300px" :data="attDy" style="width: 100%">
          <el-table-column label="#" type="expand" width="180">
              <template slot-scope="scope">
                'add'
              </template>
          </el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
          <el-table-column prop label="操作" width="300">
            <template slot-scope="scope">
              <el-row>
                <el-button
                  type="primary"
                  plain
                  size="mini"
                  icon="el-icon-edit"
                
                  circle
                ></el-button>
                <el-button
                  type="danger"
                  plain
                  size="mini"
                  icon="el-icon-delete"
             
                  circle
                ></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      selectedOptions: [],
      options: [],
      props: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      active: "1",
      attDy: []
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    changetas() {
      // 改变tabs获取动态参数
      if (this.selectedOptions.length === 3 && this.active === "1") {
        this.getattDy();
      }
    },
    handleChange() {
      // 级联改变，获取动态参数
      if (this.selectedOptions.length === 3 && this.active === "1") {
        this.getattDy();
      }
    },
    async getattDy() {
      // 获取动态参数
      const res = await this.$http.get(
        `categories/${this.selectedOptions[2]}/attributes?sel=many`
      );
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.attDy = res.data.data;
        // console.log(this.attDy);
        // 将分类vals值字符串转数组
        // console.log(res.data[0].attr_vals);

        this.attDy.forEach(item => {
          // 当前是字符串，不满足接口格式
          console.log(item.attr_vals);
          item.attr_vals = item.attr_vals.trim().split(",");
          console.log(item.attr_vals);
        });
        // console.log(this.attDy);
      } else {
        this.$message.warning("请先选择三级分类");
      }
    },
    async getGoodsCate() {
      const res = await this.$http.get("categories?type=3");
      // console.log(res);
      this.options = res.data.data;
      // console.log(this.options);
    }
  }
};
</script>

<style>
.card {
  height: 100%;
}
</style>
