<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          v-model="skuInfo.price"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="4" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px" ref="form">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in spuInfo"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="80px" ref="form">
          <el-form-item
            :label="sale.saleAttrName"
            v-for="(sale, index) in saleAttrList"
            :key="sale.id"
          >
            <el-select placeholder="请选择" v-model="sale.attrId">
              <el-option
                :label="saleValue.saleAttrValueName"
                :value="`${sale.id}:${saleValue.id}`"
                v-for="(saleValue, index) in sale.spuSaleAttrValueList"
                :key="saleValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" :data="skuImageList" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" label="label" width="80">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="图片"
          >
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 100px" />
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="imgName"
            label="名称"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="small" v-if="!row.isDefault" @click="setNormal(row)">设为默认</el-button>
            <el-button type="success" size="mini" v-else>默认</el-button>
          </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancleSku">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "skuForm",
  data() {
    return {
      skuImageList: [], //返回的图片
      saleAttrList: [], // 返回的销售属性
      spuInfo: [], // 返回的具体数据
      // 收集的sku的数据
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // v-model双向绑定
        skuName: "",
        skuDesc: "",
        weight: 0,
        price: 7,
        // 第三类：需要自己书写代码
        // 默认图片
        skuDefaultImg: "",
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      spu: {},
      // 收集照片
      imgList:[]
    };
  },
  methods: {
    // 获取图片请求
    async getData(category1Id, category2Id, spu) {
      let skuImageList = await this.$API.sku.reqGetImgList(spu.id);
      this.spu = spu;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.tmId = spu.tmId;
      this.skuInfo.spuId = spu.id;
      if (skuImageList.code == 200) {
        let list = skuImageList.data;
        list.forEach(item => {
          item.isDefault=0
        });
        this.skuImageList = list
      }
      // 获取销售属性请求
      let saleAttrResult = await this.$API.sku.reqGetSaleAttr(spu.id);
      if (saleAttrResult.code == 200) {
        this.saleAttrList = saleAttrResult.data;
      }
      // 获取spu具体数据请求
      let spuResult = await this.$API.sku.reqAttrInfo(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (spuResult.code == 200) {
        this.spuInfo = spuResult.data;
      }
    },
    // table表格复选框按钮的事件
    handleSelectionChange(selection){
      // 获取到用户点击了那几个按钮
      this.imgList = selection
    },
    // 设置默认图片 排他操作
    setNormal(row){
      this.skuImageList.forEach(item => {
        item.isDefault = 0
      });
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 取消保存sku信息
    cancleSku(){
      this.$emit('showScenes',0)
      Object.assign(this._data,this.$options.data())
    },
    // 保存sku的信息
    async save(){
      //整理参数
      // 整理平台属性的参数
      const {spuInfo,skuInfo,saleAttrList,imgList} = this
      skuInfo.skuAttrValueList = spuInfo.reduce((prev,item)=>{
        if(item.attrId){
          const [attrId,valueId] = item.attrId.split(':')
          prev.push({attrId,valueId})
        }
        return prev
      },[])
      // 整理销售属性的参数
      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev,item)=>{
        if(item.attrId){
          const [attrId,valueId] = item.attrId.split(':')
          prev.push({attrId,valueId})
        }
        return prev
      },[])
      skuInfo.skuImageList = imgList.map(item=>{
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId: item.id
        }
      })
      let result = await this.$API.sku.reqPostSku(skuInfo)
      if(result.code == 200){
        this.$message({
          type:'success',
          message:'保存成功'
        })
        this.$emit('showScenes',0)
        Object.assign(this._data,this.$options.data())
      }
    }
  },
};
</script>

<style>
</style>