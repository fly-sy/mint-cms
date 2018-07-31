<template>
  <div class="swipe-box">
    <mt-swipe :auto="auto">
      <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  // 固定死传递过来的属性只能是lunbotulist
  props: ['lunbotulist','auto']
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background: red;
    }
    &:nth-child(2) {
      background: hotpink;
    }
    &:nth-child(3) {
      background: black;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>