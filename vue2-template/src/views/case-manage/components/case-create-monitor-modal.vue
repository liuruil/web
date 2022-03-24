<template>
  <el-dialog
    class="form-container"
    title="创建监测"
    top="4vh"
    :visible.sync="dialogVisible"
    width="32%"
  >
    <div class="selected">已选择{{ caseIds.length }}个</div>
    <div class="warn-select">
      选择监测规则
      <span class="warn-content"
        >未找到合适的规则时，可联系管理员按需新增规则</span
      >
    </div>
    <el-select v-model="ruleId" placeholder="请选择">
      <el-option
        v-for="item in allMonitorList"
        :key="item[MONITOR_PARAMS.ID]"
        :label="item[MONITOR_PARAMS.NAME]"
        :value="item[MONITOR_PARAMS.ID]"
      >
      </el-option>
    </el-select>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="规则详情如下："> </el-form-item>
      <el-form-item label="监测频率：" class="monitor-count">
        {{ listenFrequency }}
      </el-form-item>
      <el-form-item label="监测时长：">{{
        form[MONITOR_PARAMS.DURATION] | getListenTime
      }}</el-form-item>
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
    <div class="btn-container">
      <el-button :loading="loading" type="primary" @click="onSubmit"
        >确定</el-button
      >
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createCase } from '@/api/modules/case-manage';
import { ruleAllList } from '@/api/modules/monitor-config';
import { clone } from '@/util';
import { MONITOR_PARAMS, monitorConfig } from '@/views/monitor-config/params';

import { CASE_PARAMS } from '../params';
export default {
  name: 'CaseCreateMonitorModal',
  data() {
    return {
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
      allMonitorList: [],
      caseIds: [],
      ruleId: null, //选中的规则id
      loading: false,
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
        this.getMonitorAllList();
      }
    },
    ruleId(value) {
      // 获取规则详情
      const originData = this.allMonitorList.find(
        (item) => item[MONITOR_PARAMS.ID] === value
      );
      originData && this.interfaceDataConversion(originData);
    },
  },
  filters: {
    filterChildren(list) {
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
    // 创建监测
    async onSubmit() {
      try {
        this.loading = true;
        const res = await createCase({
          [CASE_PARAMS.CASE_IDS]: this.caseIds.join(','),
          [CASE_PARAMS.RULE_ID]: this.ruleId,
        });
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('创建监测成功');
          this.$emit('refresh');
          this.dialogVisible = false;
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    // 组装展示的监控内容
    interfaceDataConversion(data) {
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
    // 获取全部的规则列表
    async getMonitorAllList() {
      try {
        const res = await ruleAllList();
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.allMonitorList = res.data[MONITOR_PARAMS.LIST];
          this.ruleId = this.allMonitorList[0][MONITOR_PARAMS.ID];
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.form-container {
  .btn-container {
    margin-top: 20px;
    text-align: center;
  }
  .warn-select {
    padding: 10px 0;
    font-size: 13px;
    .warn-content {
      color: #f59a23;
      font-size: 12px;
    }
  }
  .selected {
    position: absolute;
    left: 110px;
    top: 24px;
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
    padding: 0;
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
        margin: 0 10px;
        margin-right: 5px;
        width: 40px !important;
      }
    }
  }
}
</style>
