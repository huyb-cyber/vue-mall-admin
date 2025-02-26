// 将四个模块请求的接口函数统一暴露
import * as tradeMark from '@/api/product/tradeMark'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'
import * as attr from '@/api/product/attr'
import * as user from '@/api/acl/user'
import role from '@/api/acl/role'
import permission from '@/api/acl/permission'


export default {

    tradeMark,
    sku,
    spu,
    attr,
    user,
    role,
    permission
}