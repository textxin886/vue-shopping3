<template>
    <RouterLink to="/" class="goods-item">
              <img v-img-lazy="good.picture" alt="" />
              <p class="name ellipsis">{{ good.name }}</p>
              <p class="desc ellipsis">{{ good.desc }}</p>
              <p class="price">&yen;{{ good.price }}</p>
            </RouterLink>
</template>

<script setup lang="ts">
//defineProps是Vue3中用于定义组件props的一个函数，它可以让我们在setup函数中更方便地使用props。
// props是插槽，他可以传递数据给子组件，子组件可以通过props来接收父组件传递的数据。
defineProps({
  good: {
    type: Object,
    default: () => ({}),
  }
})
</script>

<style scoped lang="scss">
   .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

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
</style>
