// 导航栏
// 地址用到黑马商城的接口https://www.apifox.cn/apidoc/shared/c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132163
import httpInstance from '@/utils/http';

export function getCategoryAPI() {
    return httpInstance(
        {
            url:'/home/category/head',
        }
    )
}