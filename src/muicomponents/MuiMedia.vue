<template>
  <div class="media">
    <ul class="mui-table-view">
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
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({})
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