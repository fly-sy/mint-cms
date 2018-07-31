<template>
  <div class="goods-info">
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :lunbotulist="lunbotu" :auto="0"></swipe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from "../../components/subcomponents/Swipe";
export default {
  data: () => ({
    id: "",
    lunbotu: []
  }),
  created() {
    this.id = this.$route.params.id;
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      var id = this.id;
      this.$http.get("api/getthumimages/" + id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    }
  },
  components: {
    Swipe
  }
};
</script>

<style lang="less" scoped>
</style>