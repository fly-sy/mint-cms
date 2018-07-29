<template>
  <div class="media">
    <!-- <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media">
        <a href="javascript:;">
          <img class="mui-media-object mui-pull-left" src="../assets/menu1.png">
          <div class="mui-media-body">
            <h1>幸福</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：2018-12-18 12:12:12</span>
              <span>点击：1次</span>
            </p>
          </div>
        </a>
      </li>
    </ul> -->

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
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: ["newslist"]
};
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