<template>
  <div class="comment">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120"></textarea>

    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div class="cmt-title">
          第{{index + 1}}楼&nbsp;&nbsp;用户：&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>

    </div>

    <mt-button type="danger" size="large" plain @click="more">加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data: () => ({
    pageindex: 1,
    comments: []
  }),
  // 使用props 获取传递过来的id
  props: ["id"],
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // console.log(this.id)
      // 通过id 发送ajax 获取数据
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageindex + "")
        .then(result => {
          // console.log(result)
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // ? 数组是如何拼接
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论信息失败");
          }
        });
    },
    more() {
      this.pageindex++;
      this.getComments();
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>