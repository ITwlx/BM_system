import request from '@/utils/request'

// 引入销售属性 /admin/product/spuSaleAttrList/{spuId} 'get'
export const reqGetSaleAttr = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

// 引入获取图片列表的接口 /admin/product/spuImageList/{spuId} 'get'
export const reqGetImgList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取整个商品的信息 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} 'get'
export const reqAttrInfo = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 保存sku的数据  /admin/product/saveSkuInfo post
export const reqPostSku = (info)=>request({url:'/admin/product/saveSkuInfo',method:'post',data:info})

// 获取SKU列表的数据 /admin/product/getSkuById/{skuId} get
export const reqSkuList = (skuId)=>request({url:`/admin/product/findBySpuId/${skuId}`,method:'get'})

// 获取sku页面的列表数据 /admin/product/list/{page}/{limit} get
export const reqSkupageList = (page,limit) =>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

// 商品上架接口 /admin/product/onSale/{skuId} get
export const reqSale = (skuId) => request({url:`/admin/product/onSale/${skuId}`,method:'get'})

// 商品上架接口 /admin/product/cancelSale/{skuId} get
export const reqCancelSale = (skuId) => request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

// 获取sku实例的详情通过Id /admin/product/getSkuById/{skuId} 'get'
export const reqSkuInfo = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})