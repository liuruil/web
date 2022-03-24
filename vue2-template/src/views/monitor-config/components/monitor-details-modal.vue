<template>
  <el-dialog
    class="form-container"
    title="规则详情"
    top="4vh"
    :visible.sync="dialogVisible"
    width="32%"
  >
    <el-form ref="form" :model="form" label-width="85px">
      <el-form-item label="规则名称：">
        {{ form[MONITOR_PARAMS.NAME] }}
      </el-form-item>
      <el-form-item label="监测频率：" class="monitor-count">
        {{ listenFrequency }}
      </el-form-item>
      <el-form-item label="监测时长："
        >{{ form[MONITOR_PARAMS.DURATION] | getListenTime }}
      </el-form-item>
      <el-form-item label="监测内容：">
        <div class="monitor-content">
          <template v-for="item in form[MONITOR_PARAMS.CONTENT]">
            <div class="single-content" :key="item.label" v-if="item.checked">
              {{ item.label }}
              <div class="detail-content">
                <div class="detail-content-item">
                  <span class="left-detail">较上次增加</span>
                  {{ item.topValue }}
                  <span class="left-detail">%及以上触发关注提醒</span>
                </div>
                <div class="detail-content-item">
                  <span class="left-detail">较上次增加</span>
                  {{ item.bottomValue }}
                  <span class="left-detail">%及以上触发行动提醒</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </el-form-item>
      <el-form-item label="提醒方式：">
        <div
          class="focus"
          :key="item.title"
          v-for="item in form[MONITOR_PARAMS.MANNER]"
        >
          <span class="title">{{ item.title }}:</span>
          {{ item.list | filterChildren }}
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { clone } from '@/util';

import { MONITOR_PARAMS, monitorConfig } from '../params';
export default {
  name: 'MonitorDetailsModal',
  data() {
    return {
      originData: {},
      monitorConfig,
      MONITOR_PARAMS,
      dialogVisible: false,
      form: {
        [MONITOR_PARAMS.FREQUENCY_NUM]: 1,
        [MONITOR_PARAMS.FREQUENCY_TYPE]: 0,
        [MONITOR_PARAMS.ID]: null,
        [MONITOR_PARAMS.NAME]: '',
        [MONITOR_PARAMS.DURATION]: 1,
        [MONITOR_PARAMS.FREQUENCY]: '',
        [MONITOR_PARAMS.CONTENT]: clone(monitorConfig.content, true),
        [MONITOR_PARAMS.MANNER]: clone(monitorConfig.warnType, true),
      },
    };
  },
  computed: {
    listenFrequency() {
      const type = monitorConfig.left.find(
        (item) => item.value === this.form[MONITOR_PARAMS.FREQUENCY_TYPE]
      ).label;
      let num = !this.form[MONITOR_PARAMS.FREQUENCY_TYPE]
        ? 'rightWeek'
        : 'rightMonth';
      num = monitorConfig[num].find(
        (item) => item.value === this.form[MONITOR_PARAMS.FREQUENCY_NUM]
      ).label;
      return type + num;
    },
  },
  watch: {
    dialogVisible(value) {
      if (value) {
        this.interfaceDataConversion(this.originData);
      }
    },
  },
  filters: {
    filterChildren(list) {
      console.log(list);
      return list
        .filter((item) => item.value && item.label !== '站内信')
        .map((item) => item.label)
        .join('、');
    },
    getListenTime(value) {
      return monitorConfig.monitorTime.find((item) => item.value === value)
        .label;
    },
  },
  methods: {
    interfaceDataConversion(data) {
      // 组装展示的监控内容
      const origin = clone(monitorConfig.content, true);
      const manner = clone(monitorConfig.warnType, true);
      data[MONITOR_PARAMS.CONTENT].split(',').forEach((item) => {
        const id = item.split('-')[0];
        const topValue = item.split('-')[1];
        const bottomValue = item.split('-')[2];
        const index = origin.findIndex((i) => i.id === id);
        origin[index] = {
          ...origin[index],
          topValue,
          bottomValue,
          checked: true,
        };
      });
      manner.forEach((item) => {
        const getValue = data[item[MONITOR_PARAMS.ID]];
        item.list.forEach((i, ind) => {
          i.value = getValue[ind] === '0' ? false : true;
        });
      });
      this.form = {
        ...this.form,
        [MONITOR_PARAMS.MANNER]: manner,
        [MONITOR_PARAMS.CONTENT]: origin,
        [MONITOR_PARAMS.ID]: data[MONITOR_PARAMS.ID],
        [MONITOR_PARAMS.NAME]: data[MONITOR_PARAMS.NAME],
        [MONITOR_PARAMS.DURATION]: data[MONITOR_PARAMS.DURATION],
        [MONITOR_PARAMS.FREQUENCY_NUM]: data[MONITOR_PARAMS.FREQUENCY_NUM],
        [MONITOR_PARAMS.FREQUENCY_TYPE]: data[MONITOR_PARAMS.FREQUENCY_TYPE],
      };
    },
  },
};
</script>

<style lang="less" scoped>
.form-container {
  /deep/ .el-dialog__header {
    border-bottom: 1px solid #eeeeee;
  }
  /deep/ .el-form-item {
    margin-bottom: 0;
  }
  /deep/ .el-form-item__content {
    color: #1f2738;
    font-weight: 600;
  }
  /deep/ .el-dialog__body {
    padding-top: 10px;
  }
  /deep/ .el-form-item__label {
    padding: 0px;
    color: #666666;
  }

  /deep/ .el-select {
    width: 100%;
  }
  .monitor-count {
    /deep/ .el-select {
      width: 48%;
      &.monitor-right {
        margin-left: 4%;
      }
    }

    /deep/ .el-checkbox__label {
      padding-left: 6px;
    }
  }
  .focus {
    .title {
      width: 35px;
      display: inline-block;
      color: #666666;
      font-weight: normal;
      font-size: 14px;
      height: 100%;
      margin-right: 5px;
    }
    &:last-of-type {
      line-height: initial;
    }
  }
  .monitor-content {
    /deep/ .el-input-number__decrease,
    /deep/ .el-input-number__increase {
      display: none;
    }
    /deep/ .el-input-number {
      width: 54px;
    }
    /deep/ .el-input {
      font-size: 13px;
    }
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    box-sizing: border-box;
    .single-content {
      line-height: 30px;
      &:last-of-type {
        border-bottom: 0 solid #e1e1e1;
      }
      display: flex;
      align-items: center;
      /deep/ .el-checkbox__label {
        color: #1f2738 !important;
      }
      .detail-content {
        display: flex;
        font-weight: normal;
        flex-direction: column;
        margin-left: 10px;
        flex: 1;
        font-size: 14px;
        color: #1f2738 !important;
        display: flex;
      }
      border-bottom: 1px solid #e1e1e1;
      padding-left: 20px;
      /deep/ .el-input__inner {
        padding: 0 6px;
        height: 30px;
      }
      /deep/ .el-input {
        margin: 0px 10px;
        margin-right: 5px;
        width: 40px !important;
      }
    }
  }
}
</style>