// 商品分类的接口
import request from '@/utils/request'

// 获取商品分类的1级列表 /admin/product/get/category1/{id} get
export const reqGetCategory1id = () => request({ url: `/admin/product/getCategory1`, method: 'get' })

// 获取商品分类的2级列表 /admin/product/get/category2/{id} get
export const reqGetCategory2id = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

// 获取商品分类的3级列表 /admin/product/get/category3/{id} get
export const reqGetCategory3id = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// 获取attr的数据 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get 
export const reqGetAttrlist = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 收集或者修改属性值 /admin/product/saveAttrInfo post
export const reqAddOrUpdate = (data)=>request({url:'/admin/product/saveAttrInfo',method:'post',data})