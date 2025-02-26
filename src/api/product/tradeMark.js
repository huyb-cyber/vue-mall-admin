// 这个模块主要获取的是品牌管理的数据
import request from '@/utils/request'

// 获取品牌列表的接口
// /admin/cms / banner / { page } / { limit }
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/cms/banner/${page}/${limit}`, method: 'get' });

// 处理添加品牌
// 新增品牌：/admin/product / baseTrademark / save post 携带两个参数：品牌名称、品牌logo
// 对于新增的品牌无需向服务器传递id，id由服务器自行生成


// 修改品牌：/admin/product/baseTrademark/update
// 这个需要携带id，还有名称和logo

export const reqAddOrUpdateTradeMark = (tradeMark) => {

    if (!tradeMark.id) {

        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark});
    } else {

        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark });
    }
}

// 删除品牌：/admin/cms/banner/remove/{id}
export const reqDeleteTradeMark = (id) => request({ url: `/admin/cms/banner/remove/${id}`, method: 'delete'});
