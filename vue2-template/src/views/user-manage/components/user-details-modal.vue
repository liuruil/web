<template>
  <el-dialog
    title="用户创建成功"
    :visible.sync="centerDialogVisible"
    width="30%"
    class="show-container"
    :show-close="false"
  >
    <el-descriptions title="" direction="horizontal" :column="1">
      <el-descriptions-item label="账号">{{ account }}</el-descriptions-item>
      <el-descriptions-item label="密码">{{ pwd }}</el-descriptions-item>
    </el-descriptions>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">关闭</el-button>
      <el-button
        v-clipboard:copy="pwd"
        v-clipboard:success="onCopy"
        type="primary"
        >复制</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'UserDetailsModal',
  data() {
    return {
      centerDialogVisible: false,
      account: '',
      pwd: '',
    };
  },
  methods: {
    // 关闭弹框
    closeDialog() {
      this.centerDialogVisible = false;
      this.$router.replace({
        name: 'user-manage',
      });
    },
    // 复制密码
    onCopy: function () {
      this.$$_notify('复制成功');
    },
  },
};
</script>

<style lang="less" scoped>
.show-container /deep/ .el-descriptions-item__container {
  align-items: center;
  justify-content: center;
}

/deep/ .el-descriptions-item__content {
  width: 60%;
}
</style>