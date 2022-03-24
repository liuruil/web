<template>
  <div v-preloadImg="bgImage" class="loginModule">
    <div class="loginBox">
      <h1 class="title">大数据履行能力监测系统</h1>
      <div class="loginContent">
        <h3 class="name">登录</h3>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="account">
            <el-input
              :maxlength="20"
              v-model="ruleForm.account"
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :maxlength="20"
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="el-icon-lock"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="code" class="code_model">
            <div class="rowShow">
              <el-input
                @keydown.enter.native="submit"
                v-model="ruleForm.code"
                placeholder="输入验证码"
                clearable
                :maxlength="4"
                class="codeInp"
              ></el-input>
              <img
                v-if="codeResource"
                @click="refreshCode"
                :src="hasParamsUrl"
                alt="验证码"
                class="codeImg"
              />
              <base-verification-code
                v-loading="isLoadingCode"
                :identifyCode="identifyCode"
                @click="refreshCode"
                v-else
              ></base-verification-code>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="isLoading"
              type="primary"
              @click="submit"
              class="loginBtn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';

import fetch from '@/api/fetch';
import { userLogin, userVCode } from '@/api/modules/login';
import bgImage from '@/assets/images/login-background.png';
import BaseVerificationCode from '@/components/base-verification-code.vue';
import { codeResource } from '@/config';
import { crypto } from '@/config';
import preloadImg from '@/directives/v-preloadImg';
import { getOnlyData } from '@/util';

import { LOGIN_PARAMS } from './params';
export default {
  name: 'Login',
  components: {
    BaseVerificationCode,
  },
  directives: {
    preloadImg,
  },
  data() {
    // 验证验证码
    const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'));
      } else if (value !== this.identifyCode) {
        callback(new Error('验证码不正确'));
      } else {
        callback();
      }
    };
    return {
      bgImage,
      codeResource, //验证码获取方式
      ruleForm: {
        account: '',
        password: '',
        code: '',
      },
      isLoading: false, //是否正在登录
      machineCode: '', // 获取验证码必须的随机数
      identifyCode: '', //获取的验证码
      isLoadingCode: false, //是否正在加载验证码
      baseCodeUrl: fetch.defaults.baseURL + '/user/v-code', //基础验证码路径
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, validator: validateCode, trigger: 'blur' }],
      },
    };
  },
  computed: {
    // 生成的获取验证码的地址
    hasParamsUrl() {
      const params = qs.stringify(
        {
          [LOGIN_PARAMS.MACHINE_CODE]: this.machineCode,
        },
        { addQueryPrefix: true }
      );
      return this.baseCodeUrl + params;
    },
  },
  mounted() {
    this.refreshCode();
  },
  methods: {
    // 刷新验证码
    async refreshCode() {
      try {
        this.machineCode = getOnlyData();
        if (this.codeResource) return;
        this.isLoadingCode = true;
        const res = await userVCode({
          [LOGIN_PARAMS.MACHINE_CODE]: this.machineCode,
        });
        this.isLoadingCode = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.identifyCode = res.data.toString();
        }
      } catch (error) {
        this.isLoadingCode = false;
        console.log(error);
      }
    },
    // 提交操作
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
        this.getLogin(this.getParams());
      } catch (error) {
        console.log(error);
      }
    },
    // 获取参数
    getParams() {
      const { ACCOUNT, PASSWORD, VSCODE, MACHINE_CODE } = LOGIN_PARAMS;
      return {
        [ACCOUNT]: this.ruleForm.account,
        [PASSWORD]: crypto(this.ruleForm.password),
        [VSCODE]: this.ruleForm.code,
        [MACHINE_CODE]: this.machineCode,
      };
    },
    // 登录操作
    async getLogin(params) {
      try {
        this.isLoading = true;
        const res = await userLogin(params);
        this.isLoading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          return this.handleLogin(res.data);
        }
        this.refreshCode();
      } catch (error) {
        this.refreshCode();
        this.isLoading = false;
        console.log(error);
      }
    },
    // 登录成功处理后续的逻辑
    handleLogin(data) {
      this.$store.commit('SET_TOKEN', data.token);
      this.$store.commit('SET_USER_INFO', data);
      // 添加个人中心菜单，但是不显示在菜单栏上，为了解决权限问题
      const selfCenterMenu = {
        resourceIcon: 'el-icon-user',
        resourceName: '个人中心',
        resourceUri: '/self-center',
        notShow: true, //不显示在菜单栏上
      };
      this.$store.commit('SET_MENU_LIST', [...data.resources, selfCenterMenu]);
      this.$$_notify('登录成功');
      this.$router.push({
        name: 'workbench',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginModule {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-end;
  /deep/ .el-form-item__content {
    line-height: inherit;
  }
  .loginBox {
    position: fixed;
    left: 50%;
    top: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 60px 0;
    transform: translate(45%, -50%);
    width: 32%;
    overflow: hidden;
    height: 100%;
    .el-form-item {
      margin-bottom: 32px;
    }
    .title {
      text-align: center;
      font-size: 40px;
      font-family: Source Han Sans CN;
      font-weight: 800;
      color: #ffffff;
      line-height: 80px;
      margin-bottom: 20px;
      background: linear-gradient(0deg, #cbeaff 0.4150390625%, #ffffff 100%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .loginContent {
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 60%;
      min-height: 500px;
      background: #ffffff;
      padding: 20px 47px;
      box-sizing: border-box;
      .name {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #1f2738;
        text-align: center;
        margin-bottom: 40px;
      }
      .code_model {
        .rowShow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .codeInp {
            width: 70%;
            display: block;
          }
          .codeImg {
            background: rgb(189, 188, 188);
            width: 28%;
          }
        }
      }
      .loginBtn {
        width: 80%;
        margin: 0 auto;
        display: block;
        margin-top: 40px;
      }
    }
  }
}
</style>