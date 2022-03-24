<template>
  <el-dialog
    top="3vh"
    class="form-container"
    :title="isEdit ? '编辑规则' : '新建规则'"
    :visible.sync="dialogVisible"
    width="38%"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-form-item label="规则名称：" :prop="MONITOR_PARAMS.NAME">
        <el-input
          v-model="form[MONITOR_PARAMS.NAME]"
          placeholder="请输入规则名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="监测内容：" :prop="MONITOR_PARAMS.CONTENT">
        <div class="monitor-content">
          <div
            class="single-content"
            v-for="item in form[MONITOR_PARAMS.CONTENT]"
            :key="item.label"
          >
            <el-checkbox
              :label="item.label"
              v-model="item.checked"
              name="type"
            ></el-checkbox>
            <div class="detail-content" v-show="item.checked">
              <div class="detail-content-item">
                <span class="left-detail">较上次增加</span>
                <el-input-number
                  :min="1"
                  :precision="2"
                  v-model="item.topValue"
                ></el-input-number>
                <span class="left-detail">%及以上触发关注提醒</span>
              </div>
              <div class="detail-content-item">
                <span class="left-detail">较上次增加</span>
                <el-input-number
                  :min="1"
                  :precision="2"
                  v-model="item.bottomValue"
                ></el-input-number>
                <span class="left-detail">%及以上触发行动提醒</span>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="监测频率："
        class="monitor-count"
        :prop="MONITOR_PARAMS.FREQUENCY_TYPE"
      >
        <el-select
          v-model="form[MONITOR_PARAMS.FREQUENCY_TYPE]"
          placeholder="请选择监测频率"
        >
          <el-option
            v-for="item in monitorConfig.left"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-if="form[MONITOR_PARAMS.FREQUENCY_TYPE] === 0"
          v-model="form[MONITOR_PARAMS.FREQUENCY_NUM]"
          placeholder="请选择监测频率"
          class="monitor-right"
        >
          <el-option
            v-for="item in monitorConfig.rightWeek"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-else
          v-model="form[MONITOR_PARAMS.FREQUENCY_NUM]"
          placeholder="请选择监测频率"
          class="monitor-right"
        >
          <el-option
            v-for="item in monitorConfig.rightMonth"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监测时长：" :prop="MONITOR_PARAMS.DURATION">
        <el-select
          v-model="form[MONITOR_PARAMS.DURATION]"
          placeholder="请选择监测时长"
        >
          <el-option
            v-for="item in monitorConfig.monitorTime"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提醒方式：" :prop="MONITOR_PARAMS.MANNER">
        <div
          class="focus"
          :key="item.title"
          v-for="item in form[MONITOR_PARAMS.MANNER]"
        >
          <span class="title">{{ item.title }}</span>
          <el-checkbox
            v-show="itemChild.label !== '站内信'"
            :key="itemChild.label"
            v-for="itemChild in item.list"
            :label="itemChild.label"
            v-model="itemChild.value"
          ></el-checkbox>
        </div>
      </el-form-item>
      <el-form-item class="btn-container">
        <el-button :loading="loading" type="primary" @click="onSubmit"
          >确定</el-button
        >
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  addRule,
  updateRule,
} from '@/api/modules/monitor-config';
import { clone, compareObjIsEqual } from '@/util';

import { MONITOR_PARAMS, monitorConfig } from '../params';
export default {
  name: 'MonitorAddModal',
  data() {
    return {
      originData: {},
      monitorConfig,
      MONITOR_PARAMS,
      isEdit: false,
      loading: false,
      dialogVisible: false,
      form: {
        [MONITOR_PARAMS.FREQUENCY_NUM]: 1,
        [MONITOR_PARAMS.FREQUENCY_TYPE]: 0,
        [MONITOR_PARAMS.ID]: null,
        [MONITOR_PARAMS.NAME]: '',
        [MONITOR_PARAMS.DURATION]: 1,
        [MONITOR_PARAMS.CONTENT]: clone(monitorConfig.content, true),
        [MONITOR_PARAMS.MANNER]: clone(monitorConfig.warnType, true),
      },
      rules: {
        [MONITOR_PARAMS.NAME]: [
          { required: true, message: '请输入规则名称', trigger: 'blur' },
        ],
        [MONITOR_PARAMS.MANNER]: [{ required: true }],
        [MONITOR_PARAMS.DURATION]: [{ required: true }],
        [MONITOR_PARAMS.FREQUENCY_TYPE]: [{ required: true }],
        [MONITOR_PARAMS.CONTENT]: [{ required: true }],
      },
    };
  },
  watch: {
    dialogVisible(value) {
      if (!value || !this.isEdit) {
        this.resetForm();
      } else {
        this.interfaceDataConversion(this.originData);
      }
    },
  },
  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate();
        if (this.isEmptyContent()) return;
        if (this.isEdit) {
          if (compareObjIsEqual(this.getParams(), this.originData)) {
            return this.$$_notify('未做任何修改,操作失败', 'W');
          }
          this.updateMonitorRule();
        } else {
          this.createMonitorRule();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 接口数据转化为试图数据
    interfaceDataConversion(data) {
      console.log(data);
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
      this.originData = {
        [MONITOR_PARAMS.ID]: data[MONITOR_PARAMS.ID],
        [MONITOR_PARAMS.NAME]: data[MONITOR_PARAMS.NAME],
        [MONITOR_PARAMS.DURATION]: data[MONITOR_PARAMS.DURATION],
        [MONITOR_PARAMS.FREQUENCY_NUM]: data[MONITOR_PARAMS.FREQUENCY_NUM],
        [MONITOR_PARAMS.FREQUENCY_TYPE]: data[MONITOR_PARAMS.FREQUENCY_TYPE],
        remindAction: data.remindAction,
        remindWatch: data.remindWatch,
        [MONITOR_PARAMS.CONTENT]: data[MONITOR_PARAMS.CONTENT],
      };
    },
    // 组装参数
    getParams() {
      const params = { ...this.form };
      params[MONITOR_PARAMS.CONTENT] = this.form[MONITOR_PARAMS.CONTENT]
        .filter((item) => item.checked)
        .map((item) => {
          return item.id + '-' + item.topValue + '-' + item.bottomValue;
        })
        .join(',');
      params[MONITOR_PARAMS.MANNER].forEach((item) => {
        params[item.id] = item.list.map((i) => (i.value ? '1' : '0')).join('');
      });
      delete params[MONITOR_PARAMS.MANNER];
      if (!this.isEdit) {
        delete params[MONITOR_PARAMS.ID];
      }
      return params;
    },
    // 重置表单
    resetForm() {
      this.form = {
        [MONITOR_PARAMS.FREQUENCY_NUM]: 1,
        [MONITOR_PARAMS.FREQUENCY_TYPE]: 0,
        [MONITOR_PARAMS.NAME]: '',
        [MONITOR_PARAMS.DURATION]: 1,
        [MONITOR_PARAMS.ID]: '',
        [MONITOR_PARAMS.CONTENT]: clone(monitorConfig.content, true),
        [MONITOR_PARAMS.MANNER]: clone(monitorConfig.warnType, true),
      };
      this.$refs.form && this.$refs.form.resetFields();
    },
    // 判断监测内容和提醒方式是否为空
    isEmptyContent() {
      // 判断监测内容是否有值
      const content = this.form[MONITOR_PARAMS.CONTENT].filter(
        (item) => item.checked
      );
      const warnType = this.form[MONITOR_PARAMS.MANNER];
      //  result为没勾选的方式列表的长度
      const result = warnType.filter((item) => {
        return item.list.filter((i) => i.value).length === 1;
      }).length;
      if (!content.length) {
        this.$$_notify('监测内容不能为空', 'error');
        return true;
      }
      if (result) {
        //有没勾选的数值
        this.$$_notify('提醒方式每项必须勾选一项', 'error');
        return true;
      }
    },
    // 创建监测
    async createMonitorRule() {
      try {
        this.loading = true;
        const res = await addRule(this.getParams());
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('操作成功');
          this.dialogVisible = false;
          this.$emit('refreshTable');
        }
      } catch (error) {
        this.dialogVisible = false;
      }
    },
    // 更新监测
    async updateMonitorRule() {
      try {
        this.loading = true;
        const res = await updateRule(this.getParams());
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('操作成功');
          this.dialogVisible = false;
          this.$emit('refreshTable');
        }
      } catch (error) {
        this.dialogVisible = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.form-container {
  /deep/ .el-dialog__body {
    padding-top: 10px;
  }
  /deep/ .el-form-item__label {
    padding: 0;
  }
  .btn-container {
    text-align: right;
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
      font-size: 14px;
      height: 100%;
    }
  }
  .monitor-content {
    /deep/ .el-input-number__decrease,
    /deep/ .el-input-number__increase {
      display: none;
    }
    /deep/ .el-input-number {
      width: 80px;
    }
    /deep/ .el-input {
      font-size: 13px;
    }
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    box-sizing: border-box;
    .single-content {
      &:last-of-type {
        border-bottom: 0px solid #e1e1e1;
      }
      display: flex;
      /deep/ .el-checkbox__label {
        color: #1f2738 !important;
      }
      .detail-content {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        flex: 1;
        font-size: 14px;
        color: #666666 !important;
        display: flex;
      }
      border-bottom: 1px solid #e1e1e1;
      padding-left: 10px;
      /deep/ .el-input__inner {
        padding: 0px 6px;
        height: 30px;
      }
      /deep/ .el-input {
        margin: 0px 10px;
        margin-right: 5px;
        width: 60px !important;
      }
    }
  }
}
</style>