<template>
  <div id="app">
    <router-link to="/">主页</router-link>
    <router-link to="/about">关于</router-link>
    <div class="btn" @click="handleClick">{{ msg }}</div>
    <input type="text" v-model="msg">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "哈哈哈",
    };
  },
  methods: {
    handleClick() {
      alert("哈哈哈哈哈");
    },
  },
};
</script>

<style scoped>
.btn {
  background-color: red;
  color: #fff;
}
</style>>