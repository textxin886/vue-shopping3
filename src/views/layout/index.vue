<template>
   
    
    
<!-- 其他的路由组件 -->
    <LayoutNav />
    <LayoutFixed />
    <LayoutHeader />
    
     <!-- 一级路由出口组件vue自带,里面是内容区域 -->
    <router-view />
    <LayoutFooter />
    
</template>

<script setup lang="ts">
import LayoutNav from './components/LayoutNav.vue' //状态栏
import LayoutHeader from './components/LayoutHeader.vue' //头部
import LayoutFooter from './components/LayoutFooter.vue' //尾部
import LayoutFixed from './components/LayoutFixed.vue' //吸顶
// 输出pinia的action函数
import {onMounted} from 'vue'
import { usecategoryStore } from '@/stores/category'
const categoryStore = usecategoryStore() //获取状态管理的实例对象

        onMounted(() => {
    categoryStore.getCategory() //调用action函数
    })
</script>