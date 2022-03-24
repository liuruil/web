<template>
  <!-- 详情的基本信息展示卡片 -->
  <div class="info-top" :class="radius ? 'radius' : ''">
    <div class="info-title" :class="title ? 'border' : ''">
      <span v-if="title">{{ title }}</span>
      <el-button
        v-if="btnValue"
        :loading="isLoading"
        type="primary"
        size="small"
        @click="uploadReport"
        >{{ btnValue }}</el-button
      >
    </div>
    <div class="info-list">
      <div
        class="el-single"
        :style="{ width: parseInt((1 / column) * 100) + '%' }"
        :key="item.key"
        v-for="(item, index) in showInfoData"
      >
        <span class="item_title">{{ item.key }}:</span>
        <el-tooltip
          v-show="item.flag"
          effect="dark"
          :content="item.value"
          placement="top"
        >
          <span class="item-content">{{ item.value }}</span>
        </el-tooltip>
        <span
          v-show="!item.flag"
          :ref="'content' + index"
          class="item-content"
          >{{ item.value }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfoCard',
  props: {
    // 是否有圆角
    radius: {
      required: false,
      default: false,
      type: Boolean,
    },
    // 列数
    column: {
      required: false,
      default: 3,
      type: Number,
    },
    isLoading: {
      // 按钮的加载状态
      type: Boolean,
    },
    btnValue: {
      // 按钮显示的文字
      type: String,
    },
    title: {
      // 卡片的标题
      type: String,
      default: '',
    },
    infoData: {
      // 展示的信息
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      showInfoData: [],
      isHidden: false,
    };
  },
  mounted() {
    this.handleData();
  },
  methods: {
    uploadReport() {
      this.$emit('btnClick');
    },
    async handleData() {
      this.showInfoData = [...this.infoData];
      await this.$nextTick();
      this.showInfoData = this.showInfoData.map((item, index) => {
        let flag = false;
        const dom = this.$refs['content' + index];
        if (dom) {
          flag = dom[0].scrollWidth > dom[0].offsetWidth;
        }
        return {
          ...item,
          flag,
        };
      });
      this.isHidden = true;
    },
  },
  watch: {
    infoData() {
      this.handleData();
    },
  },
};
</script>

<style scoped lang='less'>
.info-top {
  background-color: #fff;
  padding: 15px;
  &.radius {
    border-radius: 8px;
  }

  .info-title {
    align-items: center;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    font-weight: bolder;
    &.border {
      border-bottom: 1px solid #e5e8f0;
    }
  }

  .info-list {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0;
    color: black;
    font-size: 14px;

    .el-single {
      display: inline-flex;
      width: 33%;
      padding: 10px;
      font-size: 14px;
      box-sizing: border-box;
      .item_title {
        margin-right: 10px;
        color: #666666;
      }
      .item-content {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #1f2738;
      }
    }
  }
}
</style>
