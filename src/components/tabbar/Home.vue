<template>
  <div class="home">
    <!-- <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotulist" :key="item.img">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe> -->
    <swipe :lunbotulist="lunbotulist" :auto="3000"></swipe>
    <!-- 九宫格 到 6宫格 的改造工程 -->
    <!-- <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../assets/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul> -->
    <mui-gird></mui-gird>
  </div>
</template>

<script>
// 1. 根据api文档使用vue-resource 发送ajax
// 2. 获取到数据之后给data里面的lunbotulist 重新赋值

// 使用Toast 做信息提示

// 3. 通过v-for 渲染数据

import { Toast } from "mint-ui";
import MuiGird from "../../muicomponents/MuiGird";
import Swipe from "../../components/subcomponents/Swipe";
export default {
  data: () => ({
    lunbotulist: []
  }),
  created() {
    this.getlunbotu();
  },
  methods: {
    getlunbotu() {
      this.$http.get("api/getlunbo").then(result => {
        // console.log(result)
        // 判断数据获取是否成功
        if (result.body.status === 0) {
          // 如果数据成功把 data 里面的 数据对接起来
          this.lunbotulist = result.body.message;
        } else {
          Toast("获取轮播数据失败");
        }
      });
    }
  },
  components: {
    MuiGird,
    Swipe
  }
};
</script>


<style lang="less" scoped>
// less 需要装 less less-loader 包
// yarn add less less-loader -D

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    width: 60px;
    height: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>