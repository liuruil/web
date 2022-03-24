<template>
  <!-- 左 右 -（上下）布局 -->
  <div id="layout-container">
    <div class="layOut-left">
      <base-menu></base-menu>
    </div>
    <div class="content_right">
      <base-head :existLogo="false"></base-head>
      <div class="routerView">
        <!-- 导航栏 -->
        <base-navigate separator=">"></base-navigate>
        <!-- 主区域 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BaseHead from '@/components/base-head';
import BaseMenu from '@/components/base-menu';
import BaseNavigate from '@/components/base-navigate';
export default {
  name: 'LayoutLtb',
  components: {
    BaseHead,
    BaseMenu,
    BaseNavigate,
  },
};
</script>

<style lang='less' scoped>
@import "../../style/theme";
#layout-container {
  height: 100%;
  display: flex;
  overflow: hidden;
}
.content_right {
  width: 100%;
  display: flex;
  flex-flow: column;
  height: 100%;
}
.routerView {
  background-color: @viewBg;
  overflow: hidden;
  overflow: auto;
  padding: calc(@menuGap + @breadcrumbHeight) @menuGap @menuGap @menuGap;
  box-sizing: border-box;
  min-height: calc(100% - @headerHeight);
}
/* 左侧菜单栏的宽度 */
.layOut-left {
  flex: 0 0 @menuWidth;
  overflow: auto;
}
</style>
