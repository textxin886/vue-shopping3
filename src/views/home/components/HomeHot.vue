<script setup>
import { onMounted,ref } from 'vue';
import HomePanel from './HomePanel.vue'; //插槽
import {popularityAPI} from '@/apis/home';//获取新品推荐数据

const newList = ref([]); //定义一个响应式数据newList
const getNewList = async () => {
  const res = await popularityAPI(); //调用获取新品推荐数据的接口
  newList.value = res.result; //将获取到的数据赋值给newList
};
onMounted(() => {
  getNewList(); //组件挂载完成后调用获取新品推荐数据的函数
});
</script>

<template>
    <!-- 传给子  title="人气推荐" subTitle="人气爆款 不容错过"-->
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
        <ul class="goods-list">
          <li v-for="item in newList" :key="item.id">
            <RouterLink to="/">
              <img v-img-lazy="item.picture" alt="">
              <!-- 图片懒加载- -->
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <!-- 父组件会把它的 <ul class="goods-list">...</ul> 这段内容塞到HomePanel中含有<slot/>中去 -->
    </HomePanel>
  </template>
  
  <style scoped lang='scss'>
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;
  
    li {
      width: 306px;
      height: 406px;
      transition: all .5s;
  
      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }
  
      img {
        width: 306px;
        height: 306px;
      }
  
      p {
        font-size: 22px;
        padding-top: 12px;
        text-align: center;
      }
  
      .desc {
        color: #999;
        font-size: 18px;
      }
    }
  }
  </style>
  