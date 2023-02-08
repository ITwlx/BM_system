import request from '@/utils/request'

// 获取tradeMark页面数据 /admin/product/baseTrademark/{page}/{limit}
export const reqTrademarkInfo = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:'get'})

// 上传trademark /admin/product/baseTrademark/save post {logoUrl,tmName}
// 修改trademark内容 /admin/product/baseTrademark/update 
// {"id": 0,"logoUrl": "string", "tmName": "string} put 
export const reqAddorUpdateMark = (tmdata)=>{
    if(!tmdata.id){
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tmdata})
    }else{
        return request({url:'/admin/product/baseTrademark/update',method:'put',data:tmdata})
    }
}

// 删除品牌 /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteTrademark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})