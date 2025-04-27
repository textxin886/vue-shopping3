//封装banner轮播图
import { ref, onMounted } from 'vue'
import {getBannerAPI} from '@/apis/home'
export function useBanner() {
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI(2)
    bannerList.value = res.result
    // console.log(res.result)
}
onMounted(() => {
  getBanner()
})

return {
    bannerList
    //将轮播图数据导出
}


}
