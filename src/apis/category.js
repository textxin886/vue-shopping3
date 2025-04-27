// 分类模块
import requst from '@/utils/http'

export function getCategoryAPI(id) {
    return requst({
        url: '/category',
        params: {// params 用于定义查询参数（GET 请求）
            id
        }
        // /如category?id=1
    })
    } 