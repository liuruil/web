<template>
  <el-drawer :visible.sync="drawer" size="35%" :withHeader="false">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="info">{{ bottomTitle }}</div>
      <el-divider></el-divider>
    </div>
    <div class="line-container">
      <line-charts
        ref="lineCom"
        :chartData="item.list"
        v-for="(item, index) in allList"
        :key="index"
        :title="item.title"
        :isLoading="isLoading"
      ></line-charts>
    </div>
  </el-drawer>
</template>

<script>
import { workbenchDetail } from '@/api/modules/workbench';
import LineCharts from '@/components/base-line.vue';

import { WORKBENCH_PARAMS } from '../params';
export default {
  name: 'WorkbenchDetailsModal',
  components: {
    LineCharts,
  },
  data() {
    return {
      drawer: false,
      allList: [
        {
          title: '收入评估',
          list: [],
        },
        {
          title: '消费评估',
          list: [],
        },
        {
          title: '社保评估',
          list: [],
        },
        {
          title: '共债评估',
          list: [],
        },
      ],
      id: null,
      title: '',
      bottomTitle: '',
      isLoading: false,
    };
  },
  watch: {
    drawer(value) {
      if (value) {
        this.getWorkDetail();
      } else {
        //弹框关闭 清除全部的表格数据
        for (let index = 0; index < this.$refs.lineCom.length; index++) {
          const lineCom = this.$refs.lineCom[index];
          lineCom.instance && lineCom.instance.clear();
        }
      }
    },
  },
  methods: {
    // 获取工作台详情
    async getWorkDetail() {
      try {
        this.isLoading = true;
        const res = await workbenchDetail({
          [WORKBENCH_PARAMS.ID]: this.id,
        });
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.isLoading = false;
          this.allList = [
            {
              title: '收入评估',
              list: res.data.incomeList.reverse(),
            },
            {
              title: '消费评估',
              list: res.data.consumptionList.reverse(),
            },
            {
              title: '社保评估',
              list: res.data.socialSecurityList.reverse(),
            },
            {
              title: '共债评估',
              list: res.data.debtList.reverse(),
            },
          ];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-drawer__body {
  box-sizing: border-box;
  padding: 0 0 10px 0;
  min-height: 600px;
  overflow: auto;
  .header {
    width: 100%;
    z-index: 1;
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    padding: 20px 20px;
    .title {
      color: #1f2738;
      margin-bottom: 10px;
    }
    .info {
      color: #666666;
      font-size: 14px;
    }
    .el-divider--horizontal {
      margin-bottom: 0;
      margin-top: 8px;
    }
  }
  .line-container {
    box-sizing: border-box;
    padding: 0 10px;
    margin-top: 100px;
  }
}
/deep/ .el-drawer__close-btn {
  z-index: 9999;
}
</style>
