<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="spuData.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spuData.tmId">
          <el-option
            :label="trade.tmName"
            :value="trade.id"
            v-for="(trade, index) in tradeMark"
            :key="trade.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="spu描述"
          v-model="spuData.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="SpuImgList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="successHandlePicture"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unselected.length}项选择`"
          v-model="attrIdAndName"
        >
          <el-option
            :label="unselect.name"
            :value="`${unselect.id}:${unselect.name}`"
            v-for="unselect in unselected"
            :key="unselect.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          :disabled="!attrIdAndName"
          icon="el-icon-plus"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" :data="spuData.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" border>
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="100">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              <!-- @close="handleClose(tag)" -->
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                size="mini"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                size="small"
                @blur="handleInputConfirm(row)"
                :ref="row.id"
              >
              </el-input>
              <!-- @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addTag(row, row.id)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spuData.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "spuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 进行修改和更新的数据  更改和新增的参数不同  对于新增数据需要发送请求 发送数据为改参数
      spuData: {
        // 三级列表的id
        category3Id: 0,
        // 新增数据的描述
        description: "",
        //
        id: 0,
        tmId: 0,
        // 新增图片的数据
        spuImageList: [
          {
            // id: 0,
            // imgName: "",
            // imgUrl: "",
            // spuId: 0,
          },
        ],
        // 名称
        spuName: "",
        // 新增销售属性的数据
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      }, //SPU信息
      tradeMark: [], //品牌相关的数据
      SaleAttr: [], //平台中全部的销售属性
      SpuImgList: [], //SPU图片
      attrIdAndName: "", //收集未选择的销售属性的ID
    };
  },
  computed: {
    // 计算出还没有选择的销售属性

    unselected() {
      // 总共有三个销售属性 颜色 尺寸 版本
      // filter数组过滤 从已有数组中过滤出需要的数据，返回一个新数据
      let arr = this.SaleAttr.filter((item) => {
        return this.spuData.spuSaleAttrList.every((item1) => {
          return item1.saleAttrName != item.name;
        });
      });
      return arr;
    },
  },
  methods: {
    // 点击照片墙的删除照片的回调
    handleRemove(file, fileList) {
      // file删除的数据 fileList剩余的数据
      console.log(file, fileList);
      this.SpuImgList = file;
    },
    // 点击放大照片墙中照片的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片墙新增照片的回调
    successHandlePicture(response, file, fileList) {
      this.SpuImgList = fileList;
    },
    // 从服务器拿到spu页面相关的数据
    async initSpu(spu) {
      //SPU信息
      let spuResult = await this.$API.spu.reqGetSpu(spu.id);
      if (spuResult.code == 200) {
        this.spuData = spuResult.data;
      }
      //品牌相关的数据
      let tradeMarkResult = await this.$API.spu.reqGetTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMark = tradeMarkResult.data;
      }
      //平台中全部的销售属性
      let SaleAttrResult = await this.$API.spu.reqGetSaleAttr();
      if (SaleAttrResult.code == 200) {
        this.SaleAttr = SaleAttrResult.data;
      }
      //SPU图片
      let SpuImgListResult = await this.$API.spu.reqSpuImgList(spu.id);
      if (SpuImgListResult.code == 200) {
        // 照片墙需要name和url字段 返回的数据没有 需要重新给齐赋值
        let ImgList = SpuImgListResult.data;
        ImgList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.SpuImgList = ImgList;
      }
    },
    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":");
      let newArr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };
      this.spuData.spuSaleAttrList.push(newArr);
      this.attrIdAndName = "";
    },
    // 新增销售属性的属性值
    addTag(row, index) {
      // 因为新增不是响应式数据 替换和修改是 所以下列方法不行 需要用到this.$set
      // row.inputVisible = true
      this.$set(row, "inputVisible", true);
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
      this.$set(row, "inputValue", "");
    },
    //失去焦点的事件
    handleInputConfirm(row) {
      //向newspuSaleAttrValue中添加一个元素：包含 baseSaleAttrId saleAttrValueName
      const { baseSaleAttrId, inputValue } = row;
      if (row.inputValue.trim() == "") {
        this.$message("不能输入空串");
        return;
      }
      let result = row.spuSaleAttrValueList.every((item) => {
        return item.saleAttrValueName != inputValue;
      });
      if (!result) {
        this.$message("不能输入相同数据");
        return;
      }
      let newspuSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newspuSaleAttrValue);
      // 变为按钮
      row.inputVisible = false;
    },
    // 保存或者新增spu信息
    async saveOrUpdate() {
      // 将数据保存在spu中的spuImageList中 提交信息
      this.spuData.spuImageList = this.SpuImgList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqAddorUpdateSpu(this.spuData);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: "提交成功",
        });
        // 回到场景0
        this.$emit("showScene", {
          scene: 0,
          flag: this.spuData.id ? "修改" : "新增",
        });
        Object.assign(this._data,this.$options.data())
      }
    },
    // 新增spu的回调
    async addSpu(category) {
      this.spuData.category3Id = category;
      let tradeMarkResult = await this.$API.spu.reqGetTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMark = tradeMarkResult.data;
      }
      //平台中全部的销售属性
      let SaleAttrResult = await this.$API.spu.reqGetSaleAttr();
      if (SaleAttrResult.code == 200) {
        this.SaleAttr = SaleAttrResult.data;
      }
    },
    // 取消按钮
    cancel() {
      this.$emit("showScene", {
        scene: 0,
        flag: this.spuData.id ? "修改" : "",
      });
      // 点击取消清理数据
      // Object.assign es6中新增方法 合并对象
      // 组件实例 this._data，可以操作data中的响应数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data,this.$options.data())
    },
  },
};
</script>

<style>
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
