<template>
  <!-- 页面基础头部组件 -->
  <header class="eleHead">
    <div class="eleHead shadow">
      <div class="left">
        <!-- logo图标 -->
        <div v-if="existLogo" class="logo">
          <img class="logo-img" :src="imgsrc" alt="" />
        </div>
        <h2>{{ $user.plateDic.platformName || "大数据履行能力监测系统" }}</h2>
      </div>
      <div class="right">
        <div class="user">
          <i class="el-icon-user" />
          {{ $user.userInfo.userName }}
          <div class="tabList">
            <span class="pointer" @click="toSelfCenter">个人中心</span>
          </div>
        </div>
        <div class="back" @click="logOut">
          <i class="el-icon-switch-button" />
          <span class="layout-button">退出</span>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';

import { userLogout } from '@/api/modules/login';
import { loginRouterName, logo } from '@/config';

export default {
  name: 'ele-head',
  props: {
    // 是否显示logo
    existLogo: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  data() {
    return {
      cloneSearchParams: {},
    };
  },
  computed: {
    ...mapGetters(['$user']),
    imgsrc: function () {
      let src = '';
      if (this.$user.plateDic && this.$user.plateDic.platformLogo) {
        src = `data:image/png;base64,${this.$user.plateDic.platformLogo}`;
      } else {
        src = logo;
      }
      return src;
    },
  },
  methods: {
    async logOut() {
      try {
        await this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        await this.logoutReq();
      } catch (error) {
        console.log(error);
      }
    },
    // 退出请求
    async logoutReq() {
      try {
        let res = await userLogout();
        if (res[this.$$_errCode] === this.$$_successCode) {
          sessionStorage.clear();
          this.$store.commit('SET_USER_INFO_CLEAR');
          this.$$_notify('退出成功,请重新登录');
          this.$router.replace({ name: loginRouterName });
        }
      } catch (err) {
        console.log(err);
      }
    },
    toSelfCenter() {
      this.$router.push({ name: 'self-center' });
    },
  },
};
</script>
<style scoped lang="less">
@import "../style/theme";
.eleHead {
  box-sizing: border-box;
  width: 100%;
  height: @headerHeight;
  padding-right: 15px;
  background: @headerBg;
  display: flex;
  justify-content: space-between;
  color: #fff;
  h2 {
    float: left;
    height: 100%;
    padding-left: 33px;
    font-size: 20px;
    line-height: @headerHeight;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    width: @menuWidth;
    height: 100%;
    background-size: cover;
    text-align: center;
    .logo-img {
      width: 100%;
      height: 100%;
    }
    i {
      line-height: @headerHeight;
      text-align: center;
    }
  }
  .right {
    display: flex;
    .back {
      height: 45px;
      line-height: @headerHeight;
      cursor: pointer;
      transition: all 0.3s;
      .layout-button {
        padding-left: 5px;
      }
    }

    .user {
      position: relative;
      padding-right: 30px;
      line-height: @headerHeight;
      .tabList {
        transition: all 0.3s;
        padding: 10px;
        font-size: 14px;
        height: 0;
        opacity: 0;
        position: absolute;
        left: -18px;
        bottom: -22px;
        color: @theme;
        z-index: 10000;
        width: 100%;
        line-height: 15px;
        background-color: #fff;
        text-align: center;
        border-radius: 6px;
        box-shadow: 3px 2px 11px 2px #e3e6f2;
        &::after {
          content: "";
          width: 0;
          height: 0;
          position: absolute;
          left: 50%;
          top: -6px;
          transform: translateX(10px);
          border-width: 0 6px 6px;
          border-style: solid;
          border-color: transparent transparent #fff;
        }
        .pointer {
          cursor: pointer;
        }
      }
      &:hover {
        .tabList {
          height: 15px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
