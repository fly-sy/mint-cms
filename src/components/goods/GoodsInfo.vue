<template>
  <div class="goods-info">
    <!-- 小球动画 -->
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <!-- <transition> -->
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- auto="4000"  auto="0" 不轮播 -->
          <swipe :lunbotulist="lunbotu" :auto="0" :isfull="false"></swipe>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量：
            <!-- 
                v-model 传递过去的数据 也可以监听到子组件数据的变化 

                max  设置最大值

                min  设置最小值 

                step 步长   
              -->
            <input-number @getSelectCount="getSelectCount" v-model='value' :max='10' :min='0' :step='1'></input-number>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>

    <!-- <input-number v-model='value' :max='10' :min='0' :step='2'></input-number> -->
  </div>
</template>

<script>
import Swipe from "../../components/subcomponents/Swipe";
import InputNumber from "../../components/subcomponents/InputNumber";
export default {
  data: () => ({
    ballFlag: false,
    id: "",
    lunbotu: [],
    value: 1,
    goodsinfo: {}
  }),
  created() {
    this.id = this.$route.params.id;
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      //因为传递过来的id 是1  为了避免图片一样   随便添加了 100  ，真正开发的时候 id 是处理好的
      var id = 100 + parseInt(this.id);
      this.$http.get("api/getthumimages/" + id).then(result => {
        if (result.body.status === 0) {
          // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为 轮播图 组件中，只认识 item.img， 不认识 item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          // console.log(result.body)
          this.goodsinfo = result.body.message;
        } else {
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToCart() {
      this.ballFlag = !this.ballFlag;
      // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.value,
        price: this.goodsinfo.sell_price,
        selected: true,
        timer: null
      };
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置  left   top    (x,y)
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置 不涉及到数据渲染的时候 可以使用少量的 js 原生
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      // 移动的位置 = 目标位置  -  起点位置
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all .5s ease";
      done();
    },
    afterEnter(el) {
      setTimeout(() => {
        this.ballFlag = !this.ballFlag;
      }, 450);
    },
    getSelectCount(data) {
      console.log("接收到子组件的数据" + data);
      // console.log(this.value)
    }
  },
  components: {
    Swipe,
    InputNumber
  }
};
</script>

<style lang="less" scoped>
.goods-info {
  overflow: hidden;
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: red;
    position: absolute;
    left: 88px;
    top: 414px;
    z-index: 99;
    // transform: translate(0, 0);
    transform: "all .5s cur";
  }
}
</style>