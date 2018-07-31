<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">{{pageindex > max? "没有更多数据":"加载更多"}}</mt-button>

  </div>
</template>

<script>
export default {
  data: () => ({
    goodslist: [],
    pageindex: 1,
    count: 3,
    max: 3
  }),
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      if (this.pageindex > this.max) {
        return;
      }
      // 获取商品列表
      this.$http
        .get(
          "api/getgoods?pageindex=" + this.pageindex + "&count=" + this.count
        )
        .then(result => {
          if (result.body.status === 0) {
            // this.goodslist = result.body.message;
            // 字符串拼接 直接用 加等号把字符串拼接
            // 数组拼接  concat
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      console.log(id);
      //  $route  参数列表获取   $route.params.id   $route.query.id
      //  $router 导航列表获取   $router.push  做导航的跳转

      // console.log(id);
      // 1. 最简单的
      // this.$router.push("/home/goodsinfo/" + id);

      // 2. 传递对象
      // this.$router.push({ path: "/home/goodsinfo/" + id });

      // 3. 传递命名的路由  name + params  (推荐使用)
      this.$router.push({ name: "goodsinfo", params: { id } });

      // 4. path + query
      // this.$router.push({ path: "/home/goodsinfo", query: { id } });

      // ps: name 不能和query 一起使用
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  // 两边对齐中间留空格
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    // 默认x 轴
    // 设置为column 改为 y轴
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>