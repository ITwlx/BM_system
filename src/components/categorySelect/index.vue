<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          value=""
          placeholder="请选择"
          v-model="categoryId.c1Id"
          @change="show2Id"
          :disabled="show"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          value=""
          placeholder="请选择"
          @change="show3Id"
          v-model="categoryId.c2Id"
          :disabled="show"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list2"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select value="" placeholder="请选择" v-model="categoryId.c3Id" @change="showC3Id" :disabled="show">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in list3"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      categoryId: {
        c1Id: "",
        c2Id: "",
        c3Id: "",
      },
    };
  },
  props:['show'],
  methods: {
    //获取页面的一级ID
    async getCategory1List() {
      let result = await this.$API.attr.reqGetCategory1id();
      if (result.code == 200) {
        this.list1 = result.data;
      } else {
        this.$message({
          type: "warning",
          message: "一级ID发生ERROR",
        });
      }
    },
    // 获取页面2级ID
    async show2Id() {
      this.list2 = [];
      this.list3 = [];
      this.categoryId.c2Id = ''
      this.categoryId.c3Id = ''
      this.$emit('categoryId',{level:1,categoryId:this.categoryId.c1Id})
      let result = await this.$API.attr.reqGetCategory2id(this.categoryId.c1Id);
      if (result.code == 200) {
        this.list2 = result.data;
      } else {
        this.$message({
          type: "warning",
          message: "二级ID发生ERROR",
        });
      }
    },
    // 获取页面3级ID
    async show3Id() {
      this.list3 = [];
      this.categoryId.c3Id = ''
      this.$emit('categoryId',{level:2,categoryId:this.categoryId.c2Id})
      let result = await this.$API.attr.reqGetCategory3id(this.categoryId.c2Id);
      
      if (result.code == 200) {
        this.list3 = result.data;
      } else {
        this.$message({
          type: "warning",
          message: "三级ID发生ERROR",
        });
      }
    },
    // 发送第三级Id到父组件
    showC3Id(){
      this.$emit('categoryId',{level:3,categoryId:this.categoryId.c3Id})
    }
  },
  mounted() {
    this.getCategory1List();
  },
};
</script>

<style>
</style>