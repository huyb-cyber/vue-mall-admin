import request from '@/utils/request'

// 获取SPU列表数据的接口：/admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } });

// 根据Id获取某个Spu的基本信息：/admin/product/getSpuById/{spuId}
export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' });

// 获取品牌信息列表：/admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' });

// 获取平台中全部的销售属性：/admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' });

// 获取SPU图片：/admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' });

// 将新添加的SPU保存: /admin/product/saveSpuInfo
export const reqAddOrUpdateSpuInfo = (spuInfo) => {

    if (spuInfo.id) {

        return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });
    } else {

        return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
    }
}

// 删除SPU：/admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete'});


// 获取SPU图片列表：/admin/product/spuImageList/{spuId}

// 获取SPU销售属性列表：/admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' });

// 获取商品的基础属性：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' });

// 保存SKU：/admin/product/saveSkuInfo
export const reqSaveSkuInfo = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo});

// /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' });

