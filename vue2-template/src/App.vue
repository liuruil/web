<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { loginRouterName } from './config';
export default {
  name: 'app',
  mounted() {
    this.initStoreData();
  },
  methods: {
    // 初始化页面store数据
    initStoreData() {
      // 作用：防止页面刷新丢失store数据
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem('store'))
          )
        );
      }
      // 在页面刷新时将store里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        if (this.$route.name !== loginRouterName) {
          sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        }
      });
    },
  },
};
</script>

<style>
#app {
  font-family: PingFangSC-Regular, PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
