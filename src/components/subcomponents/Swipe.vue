<template>
  <div class="swipe-box">
    <mt-swipe :auto="auto">
      <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
        <img :src="item.img" alt="" :class="{full: isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  // 固定死传递过来的属性只能是lunbotulist
  props: ["lunbotulist", "auto", "isfull"]
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    img {
      height: 100%;
    }
    .full {
      width: 100%;
    }
  }
}
</style>