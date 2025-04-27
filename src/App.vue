<template>
  <div>
<!-- 一级路由出口组件 -->
<router-view/>
<!-- 显示出路由的组件，vue自带 -->
  </div>
  <div class="test">
  <!-- test -->
 </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.test {
  color: $warnColor;
}
</style>