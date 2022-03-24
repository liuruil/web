<template>
  <div class="view-container">
    <!-- 搜索框 -->
    <base-search
      ref="searchRef"
      :searchForm="searchForm"
      @search="search"
      :loading="searchLoading"
    ></base-search>
    <div class="list-container">
      <base-table-header title="监测列表"> </base-table-header>
      <el-table v-loading="searchLoading" :data="tableData" style="width: 100%">
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
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{
              $enum.getDescByValue(
                "CASE_MONITOR_STATUS",
                scope.row[MY_MONITOR_PARAMS.STATUS]
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="getDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              type="text"
              @click="changeMyMonitorStatus(scope.$index, scope.row)"
              >{{
                $enum.getDescByValue(
                  "OPERATE_TEXT",
                  scope.row[MY_MONITOR_PARAMS.STATUS]
                )
              }}</el-button
            >
            <el-button
              type="text"
              @click="deleteMyMonitor(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <base-pagination
        ref="paginationRef"
        :total="total"
        @paginationChange="paginationChange"
      ></base-pagination>
    </div>
    <drawer-dialog ref="myMonitorDetailRef"></drawer-dialog>
  </div>
</template>

<script>
import {
  deleteMyMonitor,
  disableMyMonitor,
  enableMyMonitor,
  myMonitorList,
} from '@/api/modules/my-monitor';
import BasePagination from '@/components/base-pagination';
import BaseSearch from '@/components/base-search.vue';
import BaseTableHeader from '@/components/base-table-header';
import CONSTANTS from '@/constants';
import { MONITOR_PARAMS, monitorConfig } from '@/views/monitor-config/params';

import DrawerDialog from './components/my-monitor-details-modal.vue';
import { MY_MONITOR_PARAMS } from './params';
export default {
  name: 'MyMonitorList',
  components: { BaseSearch, BaseTableHeader, BasePagination, DrawerDialog },
  data() {
    return {
      MY_MONITOR_PARAMS,
      searchForm: [
        {
          label: '姓名',
          prop: MY_MONITOR_PARAMS.NAME,
        },
        {
          label: '身份证',
          prop: MY_MONITOR_PARAMS.ID_CARD,
        },
        {
          label: '手机号',
          prop: MY_MONITOR_PARAMS.MOBILE,
        },
      ],
      total: 0,
      searchLoading: false,
      tableData: [],
      tableColumn: [
        {
          label: '案号',
          prop: MY_MONITOR_PARAMS.CASE_NUM,
        },
        {
          label: '姓名',
          prop: MY_MONITOR_PARAMS.NAME,
        },
        {
          label: '身份证号',
          prop: MY_MONITOR_PARAMS.ID_CARD,
        },
        {
          label: '手机号',
          prop: MY_MONITOR_PARAMS.MOBILE,
        },
        {
          label: '监控详情',
          prop: MY_MONITOR_PARAMS.JUDGE_DETAIL,
        },
      ],
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    /**
     * !搜索框的点击事件
     * @params 搜索框的传递参数
     */
    search(params) {
      // 点击搜索后把页面的页数变为首页;
      this.$refs.paginationRef.currentPage = 1;
      this.getTableData(this.getParams(params));
    },
    /**
     * !获取全部的参数
     * @params 搜索框的参数
     */
    getParams(params) {
      const { currentPage, pageSize } = this.$refs.paginationRef;
      return {
        ...params,
        [MY_MONITOR_PARAMS.CURRENT_PAGE]: currentPage,
        [MY_MONITOR_PARAMS.PAGE_SIZE]: pageSize,
      };
    },
    // 分页操作
    paginationChange() {
      const searchParams = this.$refs.searchRef.getParams();
      this.getTableData(this.getParams(searchParams));
    },
    // 获取列表数据
    async getTableData(params) {
      try {
        // 获取数据;
        this.searchLoading = true;
        const res = await myMonitorList(params);
        this.searchLoading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.tableData = res.data[MY_MONITOR_PARAMS.LIST].map((item) => ({
            ...item,
            [MY_MONITOR_PARAMS.JUDGE_DETAIL]: this.listenFrequency(
              item[MONITOR_PARAMS.FREQUENCY_TYPE],
              item[MONITOR_PARAMS.FREQUENCY_NUM]
            ),
          }));
          this.total = res.data[MY_MONITOR_PARAMS.TOTAL];
        }
      } catch (error) {
        this.searchLoading = false;
        console.error(error);
      }
    },
    // 组装监控详情
    listenFrequency(frequencyType, frequencyNum) {
      const type = !frequencyType ? '按周' : '按月';
      let num = !frequencyType ? 'rightWeek' : 'rightMonth';
      num = monitorConfig[num].find(
        (item) => item.value === frequencyNum
      ).label;
      return type + '，' + num;
    },
    // 查看详情
    getDetail(index, row) {
      const drawerRef = this.$refs.myMonitorDetailRef;
      drawerRef.info = { ...row };
      drawerRef.drawer = true;
    },
    // 获取操作和提示语
    getConfirmTip(row) {
      const operate = this.$enum.getDescByValue(
        'OPERATE_TEXT',
        row[MY_MONITOR_PARAMS.STATUS]
      );
      const confirm =
        '确定' +
        operate +
        '对案号 ' +
        row[MY_MONITOR_PARAMS.CASE_NUM] +
        ' 的监控吗?';
      return {
        operate,
        confirm,
      };
    },
    // 获取修改状态方法
    getHandleFunc(row) {
      const func =
        row[MY_MONITOR_PARAMS.STATUS] === CONSTANTS.OPERATE_TEXT.FREEZE.value
          ? disableMyMonitor
          : enableMyMonitor;
      return func;
    },
    // 更改我的监测状态
    async changeMyMonitorStatus(index, row) {
      try {
        const { operate, confirm } = this.getConfirmTip(row);
        await this.$confirm(confirm, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        const res = await this.getHandleFunc(row)({
          [MY_MONITOR_PARAMS.ID]: row[MY_MONITOR_PARAMS.ID],
        });
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify(operate + '成功');
          this.paginationChange();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 删除
    async deleteMyMonitor(index, row) {
      try {
        await this.$confirm(
          '确定删除对案号 ' + row[MY_MONITOR_PARAMS.CASE_NUM] + ' 的监控吗?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        );
        const res = await deleteMyMonitor({
          [MY_MONITOR_PARAMS.ID]: row[MY_MONITOR_PARAMS.ID],
        });
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('删除成功');
          this.paginationChange();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/theme.less");
.list-container {
  margin-top: @menuGap;
  background-color: transparent !important;
  min-height: calc(100% - @menuGap - @searchHeight);
}
</style>