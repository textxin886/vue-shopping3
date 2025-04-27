import {getCategoryAPI} from '@/apis/category'
import {ref, onMounted, watch,} from 'vue'
import {onBeforeRouteUpdate, useRoute } from 'vue-router'
//封装分类数据
// 获取数据
export const useCategory = () => {
const categoryList = ref([])//定义空数组放数据

const route = useRoute()//获取路由参数,用于路由传参
// 获取数据
const getCategory = async (id=route.params.id) => {
    // 调用接口获取数据
  const res = await getCategoryAPI(id)//配置路由路径，需要加route
    categoryList.value = res.result//获取数据
}
onMounted(() => {
  getCategory()//调用函数
})

/* //方法一 watch监听路由参数变化
watch(() => route.params.id, () => {
  getCategory()//路由参数变化时重新获取数据
})
 */

//方法二 onBeforeRouteUpdate监听路由参数变化
onBeforeRouteUpdate((to) => {
  //to是新的路由对象
  getCategory(to.params.id)//路由参数变化时重新获取数据
})
//获取banner数据
return {
    categoryList
    //还需要用到categoryList所以要return返回出去
}
}