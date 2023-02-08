<template>
  <div>
    <el-table :data="records" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
      ></el-table-column>
      <el-table-column prop="prop" label="默认图片" width="100">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 0"
            @click="goodsSale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-else
            @click="goodsCancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showMsg"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="showSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getData"
    >
    </el-pagination>
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple">名称</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.skuName }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple">描述</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.skuDesc }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple">价格</div></el-col
        >
        <el-col :span="16"
          ><div class="grid-content bg-purple-light">
            {{ skuInfo.price }}
          </div></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5"
          ><div class="grid-content bg-purple">平台属性</div></el-col
        >
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id">
              {{ attr.attrId }}-{{ attr.valueId }}
            </el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"><div class="grid-content bg-purple">商品图片</div></el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <el-carousel trigger="click" height="150px" :autoplay="true">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" style="width:480px;height:150px">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1, //当前页码
      limit: 3, //每页展示几条
      records: [], //每条的数据
      total: 0, //总共多少数据
      skuInfo: {}, //sku详细信息
      drawer: false, //抽屉的显示与隐藏
    };
  },
  methods: {
    //获取数据
    async getData(pager = 1) {
      this.page = pager;
      let { page, limit } = this;
      let result = await this.$API.sku.reqSkupageList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    // 设置每页多少条数据
    handleSizeChange(index) {
      this.limit = index;
      this.getData();
    },
    // 商品上架
    async goodsSale(row) {
      let result = await this.$API.sku.reqSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({
          type: "success",
          message: "上架成功",
        });
        this.getData();
      }
    },
    // 商品下架
    async goodsCancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({
          type: "success",
          message: "下架成功",
        });
      }
    },
    // 展示info信息
    showMsg() {
      this.$message({ type: "info", message: "正在开发中" });
    },
    //展示sku详细信息
    async showSkuInfo(row) {
      let result = await this.$API.sku.reqSkuInfo(row.id);
      if (result.code == 200) {
        this.skuInfo = result.data;
        this.drawer = true;
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>
<style lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
  text-align: right;
  font-size: 20px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  line-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-col-5 {
  margin: 0 10px;
}
</style>