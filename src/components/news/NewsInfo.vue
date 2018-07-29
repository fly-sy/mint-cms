<template>
  <div class="newsinfo">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>

    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content">
    </div>

    <!-- 通过v-bind 把id传给子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import Comment from "../../components/subcomponents/Comment";
export default {
  // es5 + es6
  data: () => ({
    id: "",
    newsinfo: {}
  }),
  created() {
    // 把获取的路由参数赋值给 id
    this.id = this.$route.params.id;
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      // 获取新闻详情
      this.$http.get("api/getnew/" + this.id + "").then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message;
        } else {
          Toast("获取新闻失败！");
        }
      });
    }
  },
  components: {
    "comment-box": Comment
  }
};
</script>

<style lang="less" scoped>
.newsinfo {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>