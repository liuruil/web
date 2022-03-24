<template>
  <div class="fixed-breadMenu">
    <el-breadcrumb :separator="separator">
      <template v-for="item in navigateList">
        <el-breadcrumb-item
          :key="item.label"
          v-if="item.router"
          :to="{ path: item.router }"
          >{{ item.label }}</el-breadcrumb-item
        >
        <el-breadcrumb-item :key="item.label" v-else>{{
          item.label
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'ele-navigate',
  props: {
    separator: {
      type: String,
      default: '/',
    },
  },
  data() {
    return {
      navigateList: [],
    };
  },
  mounted() {
    this.navigateList = this.$route.meta.navigate;
  },
  watch: {
    $route(route) {
      this.navigateList = route.meta.navigate;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/theme.less";
.fixed-breadMenu {
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 999;
  box-sizing: border-box;
  left: @menuWidth;
  top: @headerHeight;
  height: @breadcrumbHeight;
  padding: 13px;
  width: 100%;
  padding-left: @menuGap;
  background-color: #fff;
}
</style>