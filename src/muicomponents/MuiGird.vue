<template>
  <div class="gird">
    <!-- 九宫格 到 6宫格 的改造工程 -->
    <!-- <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlist">
          <img src="../assets/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../assets/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul> -->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="gird in girdlist" :key="gird.url">
        <router-link :to="gird.to">
          <img :src="gird.url" alt="">
          <div class="mui-media-body">{{gird.title}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    girdlist: [
      {
        url: "../../static/gird/menu1.png",
        title: "新闻资讯",
        to: "/home/newslist"
      },
      {
        url: "../../static/gird/menu2.png",
        title: "图片分享",
        to: "/home/photolist"
      },
      {
        url: "../../static/gird/menu3.png",
        title: "商品购买",
        to: "/home/goodslist"
      },
      {
        url: "../../static/gird/menu4.png",
        title: "留言反馈",
        to: "/home/newlist"
      },
      {
        url: "../../static/gird/menu5.png",
        title: "视频专区",
        to: "/home/newlist"
      },
      {
        url: "../../static/gird/menu6.png",
        title: "联系我们",
        to: "/home/newlist"
      }
    ]
  })
};
</script>

<style lang="less" scoped>
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