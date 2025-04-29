<!-- 新鲜好物 -->
<script setup>
import { onMounted,ref } from 'vue';
import HomePanel from './HomePanel.vue'; //插槽
import {findNewAPI} from '@/apis/home';//获取新品推荐数据

const newList = ref([]); //定义一个响应式数据newList
const getNewList = async () => {
  const res = await findNewAPI(); //调用获取新品推荐数据的接口
  newList.value = res.result; //将获取到的数据赋值给newList
};
onMounted(() => {
  getNewList(); //组件挂载完成后调用获取新品推荐数据的函数
});
</script>

<template>
    <HomePanel title="新品推荐" subTitle="新鲜出炉 品质管理">
        <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink :to="`/detail/${item.id}`" class="goods-item">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
</HomePanel>

 
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
