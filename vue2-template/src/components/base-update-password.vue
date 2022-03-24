<template>
  <el-dialog
    class="container-dialog"
    title="修改密码"
    :visible.sync="dialogVisible"
    width="30%"
  >
    <el-form :model="formData" :rules="rules" ref="formName">
      <el-form-item
        label="原密码"
        class="input-title"
        prop="oldPwd"
        label-width="100px"
      >
        <el-input
          show-password
          :maxlength="20"
          class="searchInput"
          v-model="formData.oldPwd"
          placeholder="请输入原密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        class="input-title"
        prop="newPwd"
        label-width="100px"
      >
        <el-input
          show-password
          :maxlength="20"
          class="searchInput"
          v-model="formData.newPwd"
          placeholder="请输入新密码"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        class="input-title"
        prop="twoPwd"
        label-width="100px"
      >
        <el-input
          show-password
          :maxlength="20"
          class="searchInput"
          v-model="formData.twoPwd"
          placeholder="请确认新密码"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button
        :loading="isLoading"
        @click="submit"
        type="primary"
        class="add-dic"
        >确认</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { userResetPwd } from '@/api/modules/login';
import { loginRouterName } from '@/config';
import { crypto } from '@/config';
import { validatePassword } from '@/util/validate';
import { UPDATE_PARAMS } from '@/views/self-center/params';
export default {
  name: 'update-password',
  data() {
    const validateTwoPwd = (rules, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.formData.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      idStr: '',
      formData: {
        oldPwd: '',
        newPwd: '',
        twoPwd: '',
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPwd: {
          required: true,
          validator: validatePassword,
          trigger: 'blur',
        },
        twoPwd: [
          {
            required: true,
            validator: validateTwoPwd,
            trigger: 'blur',
          },
        ],
      },
      isLoading: false,
    };
  },
  watch: {
    dialogVisible: {
      handler(newV) {
        if (!newV) {
          this.$refs.formName.resetFields();
        }
      },
    },
  },
  methods: {
    submit() {
      this.$refs.formName.validate((valid) => {
        if (valid) {
          this.ModifyPassword();
        }
      });
    },
    async ModifyPassword() {
      try {
        this.isLoading = true;
        const res = await userResetPwd({
          [UPDATE_PARAMS.OLD_PASSWORD]: crypto(this.formData.oldPwd),
          [UPDATE_PARAMS.NEW_PASSWORD]: crypto(this.formData.newPwd.trim()),
        });
        this.isLoading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('修改成功,请重新登录');
          this.$router.replace({ name: loginRouterName });
          this.dialogVisible = false;
        }
      } catch (err) {
        this.isLoading = false;
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container-dialog /deep/ .el-dialog {
  border-radius: 10px;
}
.dialog-footer {
  margin-left: 10px;
}
</style>
