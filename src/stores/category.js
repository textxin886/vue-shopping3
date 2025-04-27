import { ref } from 'vue'
import { defineStore } from 'pinia'
import {getCategoryAPI} from '@/apis/layout'
// category是id不能重复，pinia自动生成
// pinia的优势是可以将数据和方法放在一起，方便管理
export const usecategoryStore = defineStore('category', () => {
//导航列表逻辑
const catgoryList = ref([])

const getCategory = async function () {//封装起来好管理
  const res =await getCategoryAPI()
  catgoryList.value = res.result
  // console.log(res.result);
}
return {
  catgoryList,
  getCategory
}
})