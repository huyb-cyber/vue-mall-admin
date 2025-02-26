import request from '@/utils/request'



// /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get'});

// /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get'});

// /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get'});

// /admin/product/getSkuById/{skuId}
export const reqGetSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get'});