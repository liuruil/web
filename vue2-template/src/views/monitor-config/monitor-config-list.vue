<template>
  <div class="view-container">
    <div class="list-container">
      <base-table-header title="配置列表">
        <div class="right-container">
          <el-button type="primary" @click="addListen">新建规则</el-button>
        </div>
      </base-table-header>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column width="50" align="center" type="index" label="序号">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          v-for="item in tableColumn"
          :key="item.props"
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope"
            ><el-button
              type="text"
              @click="detailListen(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button type="text" @click="addListen(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              :disabled="scope.row[MONITOR_PARAMS.STATUS] === '使用中'"
              type="text"
              @click="deleteMonitor(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <base-pagination
        ref="pagination"
        :total="total"
        @paginationChange="paginationChange"
      ></base-pagination>
      <add-listen @refreshTable="getTableData" ref="addListenRef"></add-listen>
      <detail-listen ref="detailListenRef"></detail-listen>
    </div>
  </div>
</template>

<script>
import { deleteRule, ruleList } from '@/api/modules/monitor-config';
import BasePagination from '@/components/base-pagination';
import BaseTableHeader from '@/components/base-table-header';

import AddListen from './components/monitor-add-modal.vue';
import DetailListen from './components/monitor-details-modal.vue';
import { MONITOR_PARAMS } from './params';
export default {
  name: 'MonitorConfigList',
  components: {
    BaseTableHeader,
    BasePagination,
    AddListen,
    DetailListen,
  },
  data() {
    return {
      MONITOR_PARAMS,
      tableData: [],
      tableColumn: [
        {
          label: '规则名称',
          prop: MONITOR_PARAMS.NAME,
        },
        {
          label: '使用状态',
          prop: MONITOR_PARAMS.STATUS,
        },
        {
          label: '创建时间',
          prop: MONITOR_PARAMS.CREATE_TIME,
        },
      ],
      total: 0,
      loading: false,
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 新增或编辑操作
    addListen(index, row) {
      const addListenRef = this.$refs.addListenRef;
      addListenRef.isEdit = row ? true : false;
      addListenRef.dialogVisible = true;
      addListenRef.originData = { ...row };
    },
    // 查看详情操作
    detailListen(index, row) {
      this.$refs.detailListenRef.originData = { ...row };
      this.$refs.detailListenRef.dialogVisible = true;
    },
    // 分页组件变化的操作
    paginationChange({ currentPage, pageSize }) {
      this.getTableData(currentPage, pageSize);
    },
    getParams(params = {}) {
      const { pageSize, currentPage } = this.$refs.pagination;
      return {
        ...params,
        [MONITOR_PARAMS.CURRENT_PAGE]: currentPage,
        [MONITOR_PARAMS.PAGE_SIZE]: pageSize,
      };
    },
    // 获取列表数据
    async getTableData() {
      try {
        this.loading = true;
        const res = await ruleList(this.getParams());
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.tableData = res.data[MONITOR_PARAMS.LIST].map((item) => ({
            ...item,
            [MONITOR_PARAMS.STATUS]: this.$enum.getDescByValue(
              'RULE_USE_STATUS',
              item[MONITOR_PARAMS.STATUS]
            ),
          }));
          this.total = res.data[MONITOR_PARAMS.TOTAL];
        }
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
    // 删除监控配置
    async deleteMonitor(index, row) {
      try {
        await this.$confirm(
          '确定删除' + '规则 ' + row[MONITOR_PARAMS.NAME] + ' 吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        );
        const res = await deleteRule({
          [MONITOR_PARAMS.ID]: row[MONITOR_PARAMS.ID],
        });
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('规则删除成功');
          this.getTableData();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.list-container {
  min-height: 100%;
}
</style>