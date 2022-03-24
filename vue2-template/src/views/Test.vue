<template>
  <div class="wrapper">
    <base-scroll-bar height="60%" ref="scrollRef">
      <div
        @click="handleClick"
        class="item"
        v-for="(item, index) in arr"
        :key="index"
      >
        {{ index + 1 }}
      </div>
    </base-scroll-bar>
  </div>
</template>

<script>
import BaseScrollBar from '../components/base-scroll-bar.vue';
export default {
  components: { BaseScrollBar },
  data() {
    return {
      arr: [1, 1, 2, 2],
    };
  },
  methods: {
    handleClick() {
      this.arr.push(1);
    },
  },
};
</script>

<style scoped>
.item {
  height: 200px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
