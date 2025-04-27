<script setup>
import HomeCategory from './components/HomeCategory.vue'//分类推荐
import HomeBanner from './components/HomeBanner.vue'//轮播图
import HomeNew from './components/HomeNew.vue'//新品推荐
import HomeHot from './components/HomeHot.vue'//人气推荐
import HomeProduct from './components/HomeProduct.vue'//商品列表


</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</div>

</template>
