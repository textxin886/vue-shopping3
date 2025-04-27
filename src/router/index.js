import { createRouter, createWebHistory } from 'vue-router'
//createRouter是Vue Router的一个函数，用于创建路由实例
//createWebHistory是Vue Router的一个函数，用于创建HTML5 History模式的路由实例
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import home from '@/views/home/index.vue'
import category from '@/views/category/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // routes是一个数组，用于定义路由规则
  //path和component对于的位置
  routes: [
    {
      // 一级路由
      path: '/',
      component: layout, //主页
      // 二级路由
      children: [
        {
          path: '/', 
          component: home, //分类组件
  
        },
        {
          path: '/category/:id', 
          //动态路由参数
          //:id是一个动态路由参数，表示分类的ID
          component: category, //分类组件
  
        },
      ]
    },
    {
    path: '/login',//登录路径
    component: login,//登录组件名
    }

   

  ],
})

export default router
