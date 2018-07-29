<template>
  <div class="newslist">
    <!-- 
      <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{item.add_time | dateFormat('YYYY-MM-DD')}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul> -->

    <!-- 渲染自己封装好组件 -->
    <mui-media :newslist="newslist"></mui-media>
  </div>
</template>

<script>
import MuiMedia from '../../muicomponents/MuiMedia'
import { Toast } from "mint-ui";
export default {
  data: () => ({
    newslist: []
  }),
  created() {
    this.getnewslist();
  },
  methods: {
    getnewslist() {
      this.$http.get("api/getnewslist").then(result => {
        // console.log(result)
        if (result.body.status === 0) {
          this.newslist = result.body.message;
        } else {
          Toast("获取newslist数据失败");
        }
      });
    }
  },
  components: {
    'mui-media':  MuiMedia
  }
};

// 1. 使用vue-resource 获取数据
// 2. 把data 里面的 newlist 和获取的数据对接
// 3. 使用v-for渲染页面
</script>

<style lang="less" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>