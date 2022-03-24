<template>
  <div class="view-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="账号" :prop="ACCOUNT_PARAMS.ACCOUNT">
        <el-input
          :maxlength="20"
          :disabled="isEdit"
          placeholder="请输入账号"
          v-model="ruleForm[ACCOUNT_PARAMS.ACCOUNT]"
        ></el-input>
      </el-form-item>
      <el-form-item label="法官姓名" :prop="ACCOUNT_PARAMS.JUDGE_NAME">
        <el-input
          :maxlength="20"
          placeholder="请输入法官姓名"
          v-model="ruleForm[ACCOUNT_PARAMS.JUDGE_NAME]"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" :prop="ACCOUNT_PARAMS.MOBILE">
        <el-input
          :maxlength="11"
          placeholder="请输入手机号"
          v-model="ruleForm[ACCOUNT_PARAMS.MOBILE]"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :prop="ACCOUNT_PARAMS.EMAIL">
        <el-input
          placeholder="请输入邮箱"
          :maxlength="20"
          v-model="ruleForm[ACCOUNT_PARAMS.EMAIL]"
        ></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <show-detail-dialog ref="showDetailRef" v-if="!isEdit"></show-detail-dialog>
  </div>
</template>

<script>
import { addUser, updateUser } from '@/api/modules/user-manage';
import { compareObjIsEqual } from '@/util';
import { checkEmail, checkPhoneNum, validateEnglish } from '@/util/validate';

import ShowDetailDialog from './components/user-details-modal.vue';
import { ACCOUNT_PARAMS } from './params';
export default {
  name: 'UserAdd',
  components: { ShowDetailDialog },
  data() {
    return {
      ACCOUNT_PARAMS,
      loading: false,
      isEdit: false,
      ruleForm: {
        [ACCOUNT_PARAMS.ACCOUNT]: '',
        [ACCOUNT_PARAMS.JUDGE_NAME]: '',
        [ACCOUNT_PARAMS.MOBILE]: '',
        [ACCOUNT_PARAMS.EMAIL]: '',
        [ACCOUNT_PARAMS.ID]: null,
      },
      rules: {
        [ACCOUNT_PARAMS.JUDGE_NAME]: [
          { required: true, message: '请输入法官姓名', trigger: 'blur' },
        ],
        [ACCOUNT_PARAMS.ACCOUNT]: [
          {
            required: true,
            validator: validateEnglish('账号'),
            trigger: 'blur',
          },
        ],
        [ACCOUNT_PARAMS.MOBILE]: [
          { required: true, validator: checkPhoneNum(), trigger: 'blur' },
        ],
        [ACCOUNT_PARAMS.EMAIL]: [
          { required: true, validator: checkEmail(), trigger: 'blur' },
        ],
      },
      originData: {},
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.isEdit = true;
    }
  },
  methods: {
    // 确认按钮点击事件
    async submitForm(formName) {
      try {
        await this.$refs[formName].validate();
        if (this.isEdit) {
          if (compareObjIsEqual(this.originData, this.ruleForm)) {
            return this.$$_notify('未做任何修改,操作失败', 'W');
          }
          this.editUser();
        } else {
          this.createUser();
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    // 获取参数
    getParams(flag) {
      const params = {
        [ACCOUNT_PARAMS.ACCOUNT]: this.ruleForm[ACCOUNT_PARAMS.ACCOUNT],
        [ACCOUNT_PARAMS.JUDGE_NAME]: this.ruleForm[ACCOUNT_PARAMS.JUDGE_NAME],
        [ACCOUNT_PARAMS.MOBILE]: this.ruleForm[ACCOUNT_PARAMS.MOBILE],
        [ACCOUNT_PARAMS.EMAIL]: this.ruleForm[ACCOUNT_PARAMS.EMAIL],
        [ACCOUNT_PARAMS.ID]: this.ruleForm[ACCOUNT_PARAMS.ID],
      };
      if (!flag) {
        delete params[ACCOUNT_PARAMS.ID];
      }
      return params;
    },
    // 创建用户
    async createUser() {
      try {
        this.loading = true;
        const res = await addUser(this.getParams(this.isEdit));
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('操作成功');
          this.$refs.showDetailRef.centerDialogVisible = true;
          this.$refs.showDetailRef.account = res.data[ACCOUNT_PARAMS.ACCOUNT];
          this.$refs.showDetailRef.pwd = res.data[ACCOUNT_PARAMS.PWD];
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 编辑用户
    async editUser() {
      try {
        this.loading = true;
        const res = await updateUser(this.getParams(this.isEdit));
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('操作成功');
          this.$router.replace({
            name: 'user-manage',
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 重置表单
    resetForm() {
      if (this.isEdit) {
        this.ruleForm = {
          ...this.ruleForm,
          [ACCOUNT_PARAMS.JUDGE_NAME]: '',
          [ACCOUNT_PARAMS.MOBILE]: '',
          [ACCOUNT_PARAMS.EMAIL]: '',
        };
      } else {
        this.$refs.ruleForm.resetFields();
      }
    },
  },
  watch: {
    isEdit(value) {
      if (value) {
        this.ruleForm = {
          [ACCOUNT_PARAMS.ACCOUNT]: this.$route.query[ACCOUNT_PARAMS.ACCOUNT],
          [ACCOUNT_PARAMS.JUDGE_NAME]:
            this.$route.query[[ACCOUNT_PARAMS.JUDGE_NAME]],
          [ACCOUNT_PARAMS.MOBILE]: this.$route.query[[ACCOUNT_PARAMS.MOBILE]],
          [ACCOUNT_PARAMS.EMAIL]: this.$route.query[[ACCOUNT_PARAMS.EMAIL]],
          [ACCOUNT_PARAMS.ID]: this.$route.query[[ACCOUNT_PARAMS.ID]],
        };
        this.originData = { ...this.ruleForm };
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/theme";
.view-container {
  background-color: #fff;
  box-sizing: border-box;
  .ruleForm {
    width: 400px;
    padding: 20px 0 0 20px;
  }
}
</style>