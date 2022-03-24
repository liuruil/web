<template>
  <div class="view-container">
    <div class="center-containers">
      <div class="avatar">
        <i class="el-icon-user-solid"></i>
      </div>
      <div class="list">
        <el-descriptions
          class="center-content"
          title=""
          direction="horizontal"
          :column="1"
          size="medium"
          name="1"
        >
          <el-descriptions-item label="账户">{{
            $user.userInfo[ACCOUNT_PARAMS.ACCOUNT]
          }}</el-descriptions-item>
          <el-descriptions-item label="法官名称">{{
            $user.userInfo[ACCOUNT_PARAMS.JUDGE_NAME]
          }}</el-descriptions-item>
          <el-descriptions-item label="密码"
            >******<el-button @click="updatePwd" type="text" size="normal"
              >修改密码</el-button
            >
          </el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            $user.userInfo[ACCOUNT_PARAMS.MOBILE]
          }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{
            $user.userInfo[ACCOUNT_PARAMS.EMAIL]
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <base-update-password ref="updatePassword"></base-update-password>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BaseUpdatePassword from '@/components/base-update-password';
import { ACCOUNT_PARAMS } from '@/views/user-manage/params';
export default {
  name: 'SelfCenter',
  components: {
    BaseUpdatePassword,
  },
  data() {
    return { ACCOUNT_PARAMS };
  },
  computed: {
    ...mapGetters(['$user']),
  },
  methods: {
    updatePwd() {
      this.$refs.updatePassword.dialogVisible = true;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/theme.less";
.view-container {
  position: relative;
  background-color: #fff;
  .center-containers {
    width: 470px;
    height: 441px;
    border-radius: 68px;
    border: 1px solid @theme;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    .avatar {
      width: 86px;
      height: 86px;
      background-color: @theme;
      border-radius: 50%;
      position: absolute;
      left: calc(50% - 43px);
      top: -43px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 35px;
    }
    .list {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .center-content {
      width: 45%;
      /deep/ .el-descriptions-item__label {
        color: #3c4353;
        font-weight: 700;
      }

      /deep/ .el-descriptions-item__content {
        color: #3c4353;
        font-weight: 500;
      }

      /deep/
        .el-descriptions__body
        .el-descriptions__table
        .el-descriptions-item__cell {
        line-height: 2.5;
      }
      /deep/ .el-button {
        padding: 0 10px;
      }
    }
  }
}
</style>