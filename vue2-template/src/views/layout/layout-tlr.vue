<template>
  <!-- 上 下 - （左右）布局 -->
  <div id="layout-container-tlr">
    <div class="layOut-top">
      <base-head :existLogo="false"></base-head>
    </div>
    <div class="content_bottom">
      <base-menu :existLogo="false" class="content-left"></base-menu>
      <div class="routerView">
        <!-- 导航栏 -->
        <base-navigate separator=">"></base-navigate>
        <!-- 主区域 -->
        <transition mode="out-in" name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHead from '@/components/base-head';
import BaseMenu from '@/components/base-menu';
import BaseNavigate from '@/components/base-navigate';
export default {
  name: 'LayoutTlr',
  components: {
    BaseHead,
    BaseMenu,
    BaseNavigate,
  },
};
</script>

<style lang='less' scoped>
@import "../../style/theme";
#layout-container-tlr {
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .content_bottom {
    width: 100%;
    display: flex;
    height: calc(100% - @headerHeight);
    .content-left {
      width: @menuWidth;
      height: 100%;
    }
  }
  .routerView {
    flex: 1;
    overflow: auto;
    padding: calc(@menuGap + @breadcrumbHeight) @menuGap;
    padding-bottom: @menuGap;
    padding-right: @menuGap;
    box-sizing: border-box;
    height: 100%;
    background-color: @viewBg;
  }
}
</style>
