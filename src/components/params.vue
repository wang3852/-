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
        <el-button type="primary" :disabled="selectedOptions.length===0">设置动态参数</el-button>
        <el-table height="300px" :data="attDy" style="width: 100%">
          <el-table-column label="#" type="expand" width="180">
            <template slot-scope="scope">
              <!-- 动态 el-tag -->
              <el-tag
                :key="item.attr_id"
                v-for="(item,i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,item)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
          <el-table-column prop label="操作" width="300">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" plain size="mini" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <el-button type="primary" :disabled="selectedOptions.length===0">设置静态参数</el-button>
         <el-table height="300px" :data="attrStatic" style="width: 100%">
           <el-table-column type="index" label="#" width="120"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
          <el-table-column prop="attr_id" label="属性值" width="180"></el-table-column>
          <el-table-column prop label="操作" width="200">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" plain size="mini" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" plain size="mini" icon="el-icon-delete" circle></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
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
      attDy: [],
      attrStatic:[],
      // 动态tag
     
      inputVisible: false,
      inputValue: "",

    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 动态tag
    async handleClose(attr,item) {
     attr.attr_vals.splice( attr.attr_vals.indexOf(item), 1);
    //  发请求
    // 分类id
    // 参数id
   const putData={
     attr_name:attr.attr_name,
     attr_sel:attr.attr_sel,
     attr_vals:attr.attr_vals.join(',')
   }
    const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr.attr_id}`,putData);
    // console.log(res);
  
    
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

   async handleInputConfirm(attr) {
      let inputValue = this.inputValue;
      if (inputValue) {
          attr.attr_vals.push(inputValue);
          // 添加参数
          const putData={
          attr_name:attr.attr_name,
          attr_sel:attr.attr_sel,
          attr_vals:attr.attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr.attr_id}`,putData);
        // console.log(res);
        }
      
      this.inputVisible = false;
      this.inputValue = "";
    },
    changetas() {
      // 改变tabs获取动态参数
      if (this.selectedOptions.length === 3 && this.active === "1") {
        this.getattDy();
      }
      // 改变tabs， 获取静态参数
       if (this.selectedOptions.length === 3 && this.active === "2") {
        this.getattrStatic();
      }
    },
    handleChange() {
      // 级联改变，获取动态参数
      if (this.selectedOptions.length === 3 && this.active === "1") {
        this.getattDy();
      }
      // 级联改变，获取静态参数
       if (this.selectedOptions.length === 3 && this.active === "2") {
        this.getattrStatic();
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
          // console.log(item.attr_vals);
          item.attr_vals = item.attr_vals.trim().split(",");
          // console.log(item.attr_vals);
        });
        // console.log(this.attDy);
      } else {
        this.$message.warning("请先选择三级分类");
      }
    },
     async getattrStatic() {
      // 获取动态参数
      const res = await this.$http.get(
        `categories/${this.selectedOptions[2]}/attributes?sel=only`
      );
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.attrStatic = res.data.data;
        // console.log(this.attDy);
        // 将分类vals值字符串转数组
        // console.log(res.data[0].attr_vals);

        // this.attDy.forEach(item => {
        //   // 当前是字符串，不满足接口格式
        //   // console.log(item.attr_vals);
        //   item.attr_vals = item.attr_vals.trim().split(",");
        //   // console.log(item.attr_vals);
        // });
        console.log(this.attrStatic);
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
