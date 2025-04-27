<script setup>
//定义props插槽，提供父传子的方式给子提供标题和内容
import { defineProps } from 'vue'
// 1.引入vue的defineProps方法
defineProps({
  // 商品标题
  title: {
    type: String,
    default: '主标题未传入',
  },
  // 商品副标题
  subTitle: {
    type: String,
    default: '副标题未传入',
  },
})
</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{title}}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->

       <slot/>
       <!-- 父组件的内容将在这里渲染 -->
       
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
