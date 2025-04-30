//获取商品详情接口
import request from '@/utils/http'

export const getDetail = (id) => { // 导出 getDetail 函数，接收一个 id 参数
    return request({
        url: `/goods`,
        params: {
            id
        },
    })
    }
    

export const getchHotGoodsAPI = ({ id, type, limit = 3 }) => {
    return request({
      url:'/goods/hot',
      params:{
        id, 
        type, 
        limit
      }
    })
  }
