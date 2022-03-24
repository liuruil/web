<template>
  <div class="main">
    <div v-if="existLogo" class="logo">
      <img class="logo-img" :src="imgsrc" alt="" />
    </div>
    <!-- menu -->
    <el-row class="tac">
      <el-col>
        <el-menu
          router
          :default-active="activeUrl"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          text-color="#1F2738"
        >
          <div v-for="(item, idx) in menuList" :key="idx">
            <el-submenu :index="idx + ''" v-if="item.childNodes">
              <template slot="title">
                <i :class="item.resourceIcon"></i>
                <span>{{ item.resourceName }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(m, inx) in item.childNodes"
                  :key="inx"
                  :index="`${m.resourceUri}`"
                  >{{ m.resourceName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item
              :index="`${item.resourceUri}`"
              v-else-if="!item.childNodes && !item.notShow"
            >
              <i :class="item.resourceIcon"></i>
              <span slot="title">{{ item.resourceName }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { logo } from '@/config';
export default {
  name: 'ele-menu',
  props: {
    // 是否显示logo
    existLogo: {
      required: false,
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      menuList: [],
      activeUrl: '',
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
  mounted() {
    this.menuList = this.$user.menuList;
    const activeMenu = this.$route.meta.activeMenu;
    this.activeUrl = activeMenu ? activeMenu : this.$route.path;
  },
  watch: {
    $route() {
      const activeMenu = this.$route.meta.activeMenu;
      this.activeUrl = activeMenu ? activeMenu : this.$route.path;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/theme";
.main {
  width: 100%;
  height: 100vh;
  background: @headerBg;
  overflow: hidden;
  // box-shadow: 3px 2px 11px 2px #e3e6f2;
  .tac {
    height: 100%;
    .el-col {
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    width: @menuWidth;
    height: @headerHeight;
    text-align: center;
    .logo-img {
      width: 100%;
      height: 100%;
    }
  }
  .el-menu-vertical-demo {
    .el-menu-item {
      span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
      }

      &.is-active {
        color: @theme;
      }
    }
    .is-active {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      background: @menuBg;
      display: flex;
      align-items: center;
      padding-right: 0;
      &::after {
        position: absolute;
        right: 0;
        content: "";
        width: 4px;
        height: 100%;
        background: @theme;
      }
    }
  }
}
</style>