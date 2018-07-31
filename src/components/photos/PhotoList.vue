<template>
  <div class="photolist">
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" ref="wrapper" class="list-wrapper mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',{'mui-active': index === defulat}]" href="#item1mobile" data-wid="tab-top-subpage-1.html" v-for="(item,index) in cates" :key="item.id" @click="show(index)">
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="img-desc">
          <h1 class="desc-title">{{item.title}}</h1>
          <div class="desc-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data: () => ({
    cates: [],
    defulat: 0,
    list: [],
    options: {
      // scrollX 横向滚动
      // scrollY 纵向滚动
      scrollX: true
    }
  }),
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted() {
    setTimeout(() => {
      // console.log(this.$refs.wrapper);
      this.scroll = new BScroll(this.$refs.wrapper, this.options);
    }, 20);
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        // console.log(result);
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根据 分类Id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        console.log(result);
        if (result.body.status === 0) {
          this.list = result.body.message;
        }
      });
    },
    show(index) {
      console.log(index);
      this.defulat = index;
    }
  },
  components: {
    // "mui-tab-top-webview": MuiTabTopWebview
  }
};
</script>

<style lang="less" scoped>
.photolist {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
}
</style>