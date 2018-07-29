<template>
  <div class="photolist">
    <!-- mui-fullscreen 全屏 我们不需要 -->
    <!-- <div id="slider" class="mui-slider ">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a class="mui-control-item mui-active" href="#item1mobile" data-wid="tab-top-subpage-1.html">
            推荐
          </a>
          <a class="mui-control-item" href="#item2mobile" data-wid="tab-top-subpage-2.html">
            热点
          </a>
          <a class="mui-control-item" href="#item3mobile" data-wid="tab-top-subpage-3.html">
            北京
          </a>
          <a class="mui-control-item" href="#item4mobile" data-wid="tab-top-subpage-4.html">
            社会
          </a>
          <a class="mui-control-item" href="#item5mobile" data-wid="tab-top-subpage-5.html">
            娱乐
          </a>
        </div>
      </div>

    </div> -->

    <mui-tab-top-webview></mui-tab-top-webview>
  </div>
</template>

<script>
import MuiTabTopWebview from '../../muicomponents/MuiTabTopWebview'
export default {
  data: () => ({}),
  components: {
    'mui-tab-top-webview': MuiTabTopWebview
  }
};
</script>

<style lang="" scoped>
</style>