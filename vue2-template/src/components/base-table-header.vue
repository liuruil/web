<template>
  <div class="container-table-header">
    <div class="left">{{ title }}</div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-header',
  props: {
    title: {
      required: true,
      default: '',
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.container-table-header {
  background-color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
  .left{
    font-weight: 700;
  }
}
</style>