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

   /**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */

export const getCategoryFilterAPI = (id) => {
    return requst({
      url: '/category/sub/filter',
      params: {
        id
      }
    })
  }
  
 /**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
    return requst({
      url: '/category/goods/temporary',
      method: 'POST',
      data
    })
  }