// banner
// 地址用到黑马商城的接口https://www.apifox.cn/apidoc/shared/c05cb8d7-e591-4d9c-aff8-11065a0ec1de/api-67132163
import httpInstance from '@/utils/http';
// banner//封装--设置传输的值
export function getBannerAPI(distributionSite=1) {
    return httpInstance(
        {
            url:'/home/banner',
            //接收参数
            params:{
              distributionSite
            }
        }
    )
}
// 新鲜好物封装
export const findNewAPI = () => {
    return httpInstance({
      url:'/home/new'
    })
  }
// 人气推荐封装
export const popularityAPI = () => {
    return httpInstance({
      url:'/home/hot'
    })
  }
  // 获取商品模块
  export const getGoodsAPI = () => {
    return httpInstance({
      url: "/home/goods",
    });
  };
