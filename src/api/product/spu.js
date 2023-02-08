import request from '@/utils/request'

// 获取spu页面的列表数据 /admin/product/{page}/{limit} get page limit category3Id
export const reqGetSpuAttr = (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

// 获取SPU信息 /admin/product/getSpuById/{spuId} get
export const reqGetSpu = (spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

// 获取品牌相关的数据 /admin/product/baseTrademark/getTrademarkList get
export const reqGetTradeMarkList = ()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

// 获取平台中全部的销售属性 /admin/product/baseSaleAttrList 'get'
export const reqGetSaleAttr = ()=>request({url:'/admin/product/baseSaleAttrList',methos:'get'})

// 获取SPU图片 /admin/product/spuImageList/{spuId} 'get'
export const reqSpuImgList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 保存spu信息 /admin/product/saveSpuInfo post
// 修改spu信息 /admin/product/updateSpuInfo post
export const reqAddorUpdateSpu = (spuInfo)=>{
    // 携带的参数有id 修改spu
    if(spuInfo.id){
        return request({url:`/admin/product/updateSpuInfo`,method:'post',data:spuInfo})
    }else{
        // 携带的参数没有id 新增spu
        return request({url:`/admin/product/saveSpuInfo`,method:'post',data:spuInfo})
    }
}

// 删除SPu /admin/product/deleteSpu/{spuId} delete
export const reqDeleteSpu = (spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})