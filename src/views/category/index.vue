<!-- //分类 -->
<script setup>
import {getCategoryAPI} from '@/apis/category'
import {ref, onMounted, watch,} from 'vue'
import {useRoute } from 'vue-router'
// 获取数据
const categoryList = ref([])//定义空数组放数据

const route = useRoute()//获取路由参数,用于路由传参
// 获取数据
const getCategory = async () => {
    // 调用接口获取数据
  const res = await getCategoryAPI(route.params.id)//配置路由路径，需要加route
    categoryList.value = res.result//获取数据
}
onMounted(() => {
  getCategory()//调用函数
})

watch(() => route.params.id, () => {
  getCategory()//路由参数变化时重新获取数据
})
//获取banner数据
import {getBannerAPI} from '@/apis/home'
const bannerList = ref([])
const getBanner = async () => {
  const res = await getBannerAPI(2)
    bannerList.value = res.result
    // console.log(res.result)
}
onMounted(() => {
  getBanner()
})


</script>
<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <!--breadcrumb >分隔符 -->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryList.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
      <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  // position: relative;
  margin: 0 auto;
  left: 0;
  top: 0;
  // z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
  .bread-container {
    padding: 25px 0;
  }
}
</style>