<script setup>
import { getCategoryFilterAPI,getSubCategoryAPI } from '@/apis/category'
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import GoodsItem from '../home/components/GoodsItem.vue'
//获取面包屑导航数据
const route = useRoute()
const categoryData = ref([])
const getcategoryData = async()=>{
  const res= await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(()=>{
  getcategoryData()
})
//获取基础列表数据渲染
const goodsList = ref([])
const reqData=ref({
  categoryData:route.params.id,
  page:1,
  pageSize:20,//条数
  sortField:'publishTime',//排序字段
})

const getGoodsList = async()=>{
 const res=await getSubCategoryAPI(reqData.value)
  

  goodsList.value =  res.result.items
}
onMounted(()=>{
  getGoodsList()
})

//tab切换
const tabChange = () => {
  reqData.value.page = 1
  getGoodsList()
}
//加载更多数据
const disabled = ref(false)
const load = async () => {
  reqData.value.page += 1
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value.push(...goodsList.value,...res.result.items)
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}


</script>
<template>
  <div class="container ">
    <!-- 面包屑 -->
     <!-- //居家可点击 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load">
         <!-- 商品列表-->
       <GoodsItem
        v-for="good in goodsList"
        :good="good"
        :key="good.id
        ">
      
      </GoodsItem>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}
.sub-container {
  padding: 20px 10px;
  background-color: #fff;
  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }
  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;
    img {
      width: 160px;
      height: 160px;
    }
    p {
      padding-top: 10px;
    }
    .name {
      font-size: 16px;
    }
    .desc {
      color: #999;
      height: 29px;
    }
    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>