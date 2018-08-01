<template>
  <div class="goods-info">
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
      <div class="mui-card-header">title</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥1680</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥1200</span>
          </p>
          <p>购买数量：
            <!-- <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox> -->

            <input-number v-model='value' :max='10' :min='0' :step='2'></input-number>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面zhong 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
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
    id: "",
    lunbotu: [],
    value: 5
  }),
  created() {
    this.id = this.$route.params.id;
    this.getLunbotu();
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
    }
  },
  components: {
    Swipe,
    InputNumber
  }
};
</script>

<style lang="less" scoped>
</style>