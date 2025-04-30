<script setup>
// 24小时热榜
//封装接口
import {getchHotGoodsAPI} from '@/apis/detail'
import {ref, onMounted, computed} from 'vue'
import {useRoute} from 'vue-router' //引入路由传入参数
//设计props参数，适配不同的title参数
const props=defineProps({//父传子
  hotType: {
    type: Number,
  }
})
// console.log(hotType)

//适配title参数 1-24小时
// 2-周日榜单
const type= {
    1:'24小时热榜',
    2:'周热榜单'
}
 const title =computed(() => {
    return type[props.hotType]
})

//把接口数据接过来
const hotlist = ref([])
const route = useRoute() //获取路由对象
const getHotList = async () => {
  const res = await getchHotGoodsAPI(
    {
        id: route.params.id, // 商品id
        type: props.hotType, // 商品类型
    }
  )
//   console.log(route.params.id)
hotlist.value = res.result
}
onMounted(() => {
  getHotList()
})


</script>
<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotlist" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>
<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;
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
}
</style>