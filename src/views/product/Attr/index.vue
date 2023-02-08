<template>
  <div>
    <el-card style="margin: 20px 0"
      ><categorySelect @categoryId="categoryId" :show="!isShowtable" />
    </el-card>
    <el-card>
      <div v-show="isShowtable">
        <el-button
          v-show="category3Id"
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin: 0 20px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column :prop="index" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowtable">
        <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性</el-button
        >
        <el-button @click="isShowtable = true"> 取消</el-button>
        <el-table style="width: 100%" :data="attrInfo.attrValueList">
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入"
                v-if="row.flag"
                size="mini"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toInput(row, $index)"
                style="display: block; width: 100%; height: 23px"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`这个${row.valueName}属性值确定删除吗？`"
                @onConfirm="deleteValue($index)"
              >
                <el-button
                  ref="btn"
                  type="danger"
                  icon="el-icon-edit"
                  size="mini"
                  slot="reference"
                ></el-button
              ></el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveValue" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button type="primary" @click="isShowtable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      index: "",
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 服务器返回的attr组件的数据
      attrList: [],
      // 展示添加属性的表单是否隐藏
      isShowtable: true,
      // 收集的属性值和属性名，用于增加或修改属性
      attrInfo: {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值的数组
        ],
        categoryId: 0, //三级分类的ID
        categoryLevel: 3, // 服务器需要区分是几级Id
      },
    };
  },
  methods: {
    // 获取子组件返回的3个id数据
    categoryId(data) {
      if (data.level == 1) {
        this.category1Id = data.categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (data.level == 2) {
        this.category2Id = data.categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = data.categoryId;
        this.getAttrlist();
      }
    },
    // 获取平台属性的数据
    async getAttrlist() {
      let result = await this.$API.attr.reqGetAttrlist(
        this.category1Id,
        this.category2Id,
        this.category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 为属性添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        // attrId 相应属性值的id 添加属性的操作，目前还没有相应的id 目前带给服务器的是undefined
        // valueName 相应属性值的名称
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 添加属性
    addAttr() {
      // 显示属性值表单
      this.isShowtable = false;
      // 清空表格数据
      this.attrInfo = {
        attrName: "", // 属性名
        attrValueList: [
          // 属性值的数组
        ],
        categoryId: this.category3Id, //三级分类的ID
        categoryLevel: 3, // 服务器需要区分是几级Id
      };
    },
    // 更新数据
    updateAttr(row) {
      this.isShowtable = false;
      // 将选中的数据赋值给attrInfo
      // 由于数据是对象套数组套对象 因此需要用深拷贝解决--点击取消之后数据仍被改变
      this.attrInfo = cloneDeep(row);
      // 在修改属性的同时给数据加上flag这个属性
      this.attrInfo.attrValueList.forEach((item) => {
        // 如果直接item.flag=false 因为不是响应式数据，无法触发点击事件（替换，更改）
        // 使用$set可以设置为响应式数据
        this.$set(item, "flag", false);
      });
    },
    // 判断输入的属性值是否相同
    toLook(row) {
      // 判断是否输入空串
      if (row.valueName.trim() == "") {
        this.$message("不能输入空");
        return;
      }
      // 判断是否属性值相同
      let result = this.attrInfo.attrValueList.some((item) => {
        // 如果数组里面的值和row里面的相同 返回
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (result) {
        this.$message("请不要输入相同的值");
        return;
      }
      row.flag = false;
    },
    // 点击span显示input并且自动聚焦
    toInput(row, index) {
      row.flag = true;
      // 点击span的时候切换为input 对于浏览器而言需要重绘
      // 不能立即点击span获取input
      // $nextTick是当节点渲染完毕了
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存数据发送请求
    async saveValue() {
      // 整理参数 1，valueName为空的不允许提交 2，提交的数据不允许出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          // 过滤为空的
          if (item.valueName !== "") {
            // 删除flag字段
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await this.$API.attr.reqAddOrUpdate(this.attrInfo);
        this.$message({
          type: "success",
          message: "操作成功",
        });
        this.getAttrlist();
        this.isShowtable = true;
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>