<template>
  <div>
    <el-card>
      <categorySelect @categoryId="categoryId" :show="scene != 0" />
    </el-card>

    <el-card style="margin-top: 20px">
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" @click="addSPU"
          >添加SPU</el-button
        >
        <el-table style="width: 100%" border :data="records">
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          ></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                title="修改spu"
                @click="uppdateSPU(row)"
              ></hint-button>
              <hint-button
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看spu的实例"
                @click="showSkuInfo(row)"
              ></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteMsg(row)"
              >
                <hint-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="getSpuAttr"
        >
        </el-pagination>
      </div>
      <spuForm ref="spuForm" v-show="scene == 1" @showScene="showScene" />
      <skuForm v-show="scene == 2" ref="sku" @showScenes="showScenes" />
    </el-card>

    <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogVisible" width="30%" :before-close="closeDialog"  >
      <el-table :data="skuList" style="width: 100%"  v-loading="loading">
        <el-table-column prop="skuName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="price" label="价格" width="width">
        </el-table-column>
        <el-table-column prop="weight" label="重量" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="默认图片" width="width">
          <template slot-scope="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import spuForm from "./spuForm";
import skuForm from "./skuForm";
export default {
  name: "Spu",
  data() {
    return {
      //子组件传递过来的数据
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 控制下拉框的disabled
      show: true,
      // 当前第几页
      page: 1,
      // 一页几条数据
      limit: 3,
      records: [], // spu列表的数据
      total: 0, //总共多少数据
      scene: 0, // 展示哪一个子组件 0 展示spu列表 1展示添加或修改spu 2展示添加sku
      dialogVisible: false, //控制SKUList对话框的显示与隐藏
      skuList: [], //获取的sku的列表
      spu:{},//获取的spu
      loading: true,//加载过度动画
    };
  },
  components: { spuForm, skuForm },
  methods: {
    // 自定义事件，获取子组件传递过来的参数
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
        this.getSpuAttr();
      }
    },
    // 获取spu页面的数据
    async getSpuAttr(pager = 1) {
      this.page = pager;
      let { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqGetSpuAttr(page, limit, category3Id);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 改变每页展示多少数据
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuAttr();
    },
    // 添加SPU
    uppdateSPU(row) {
      this.scene = 1;
      this.$refs.spuForm.initSpu(row);
    },
    // 添加或者修改SPU
    addSPU() {
      this.scene = 1;
      this.$refs.spuForm.addSpu(this.category3Id);
    },
    // 修改显示场景1
    showScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "修改") {
        this.getSpuAttr(this.page);
      } else {
        this.getSpuAttr();
      }
    },
    // 删除spu
    async deleteMsg(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      console.log(result);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
      }
      this.getSpuAttr(this.records.length > 1 ? this.page : this.page - 1);
    },
    // 添加sku的页面
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 修改展示场景二
    showScenes(index) {
      console.log("1");
      console.log(index);
      this.scene = index;
    },
    // 展示SkuList列表
    async showSkuInfo(row) {

      this.spu = row
      this.dialogVisible = true;
      let result = await this.$API.sku.reqSkuList(row.id);
      this.loading = false
      if (result.code == 200) {
        this.skuList = result.data;
      }
    },
    // 关闭对话框
    closeDialog(done){
      this.loading = true
      this.skuList = []
      done()
    }
  },
};
</script>

<style>
</style>