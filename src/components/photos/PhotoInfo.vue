<template>
  <div class="photoinfo">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->
    <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src"> -->

    <div class="thumbs">
      <!-- 定义的slides 传递过去的属性不能乱改 必须是这个slides -->
      <vue-preview :slides="list"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <comment :id="id"></comment>
  </div>
</template>

<script>
import Comment from '../subcomponents/Comment'
export default {
  data: () => ({
    id: "",
    photoinfo: {},
    list: []
  }),
  created() {
    this.id = this.$route.params.id;
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          // 这里获取数据直接使用 result.body.message 而不是 result.body.message[0]
          this.photoinfo = result.body.message;
        }
      });
    },

    getThumbs() {
      // 获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        // console.log(result.body)
        if (result.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.body.message.forEach((item, index) => {
            (item.alt = "item" + index),
              (item.w = 400),
              (item.h = 500),
              (item.msrc = item.src);
          });
          // 把完整的数据保存到 list 中
          this.list = result.body.message;

          console.log(this.list);
        }
      });
    },
    handleClose(){
      console.log('close callback')
    }
  },
  components: {
    'comment': Comment
  }
};
</script>

<style lang="less">
.photoinfo {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    overflow: hidden;
    figure {
      margin: 0;
      padding: 0;
      width: 100px;
      height: 100px;
      float: left;
      margin-left: 10px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100px;
        display: block;
      }
    }
  }
}
</style>