import request from '@/utils/request'

// 获取一级分类的接口: /admin/product/getCategory1
export const reqCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' });

// 获取二级分类的接口: /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get'});

// 获取三级分类的接口: /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get'});

// 获取商品的基础属性：/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get'});

// 保存商品属性：/admin/product/saveAttrInfo
export const reqSaveAttrInfo = (baseAttrInfo) => request({ url: `/admin/product/saveAttrInfo`, method: 'post', data: baseAttrInfo});

// 删除商品属性：/admin/product/deleteAttr/{attrId}
export const reqDeleteAttr = (attrId) => request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete'});

