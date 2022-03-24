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
      <base-table-header title="案件列表">
        <el-button @click="createMonitor" type="primary">创建监测</el-button>
      </base-table-header>
      <el-table
        ref="tableRef"
        :data="tableData"
        style="width: 100%"
        @select="selectedHandle"
        @select-all="selectedHandle"
        v-loading="searchLoading"
      >
        <el-table-column
          ref="allSelectRef"
          type="selection"
          width="50"
          :selectable="selectable"
          align="center"
        ></el-table-column>
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
                scope.row[CASE_PARAMS.STATUS]
              )
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="判决详情" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="getDetail(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
      <base-pagination
        ref="paginationRef"
        :total="total"
        @paginationChange="paginationChange"
      ></base-pagination>
    </div>
    <create-monitor
      @refresh="refreshData"
      ref="createMonitorRef"
    ></create-monitor>
  </div>
</template>

<script>
import { caseList } from '@/api/modules/case-manage';
import BasePagination from '@/components/base-pagination';
import BaseSearch from '@/components/base-search.vue';
import BaseTableHeader from '@/components/base-table-header';
import ENUM from '@/constants';

import CreateMonitor from './components/case-create-monitor-modal.vue';
import { CASE_PARAMS } from './params';
export default {
  name: 'CaseManageList',
  components: { BaseSearch, BaseTableHeader, BasePagination, CreateMonitor },
  data() {
    return {
      CASE_PARAMS,
      searchForm: [],
      searchLoading: false,
      tableData: [],
      tableColumn: [
        {
          label: '案号',
          prop: CASE_PARAMS.CASE_NAME,
        },
        {
          label: '姓名',
          prop: CASE_PARAMS.NAME,
        },
        {
          label: '身份证号',
          prop: CASE_PARAMS.ID_CARD,
        },
        {
          label: '手机号',
          prop: CASE_PARAMS.MOBILE,
        },
        {
          label: '立案时间',
          prop: CASE_PARAMS.CASE_DATA,
        },
      ],
      total: 0,
      // 缓存选择数据
      selectDataList: {},
    };
  },
  mounted() {
    let sourceTypeList = this.$enum.getValueDescList('CASE_MONITOR_STATUS');
    this.searchForm = [
      {
        label: '姓名',
        prop: CASE_PARAMS.NAME,
      },
      {
        label: '身份证',
        prop: CASE_PARAMS.ID_CARD,
      },
      {
        label: '手机号',
        prop: CASE_PARAMS.MOBILE,
      },
      {
        label: '状态',
        prop: CASE_PARAMS.STATUS,
        type: 'select',
        options: sourceTypeList,
      },
    ];
    this.search();
  },
  methods: {
    // 搜索功能
    async search(params = {}) {
      try {
        await this.$nextTick();
        this.selectDataList = {}; //勾选数据清空
        this.$refs.paginationRef.currentPage = 1; //初始化页数
        this.getTableData(this.getParams(params));
      } catch (error) {
        console.log(error);
      }
    },
    // 勾选框是否可被选择
    selectable(row) {
      return (
        row[CASE_PARAMS.STATUS] !==
        ENUM.CASE_MONITOR_STATUS.UNDER_MONITORING.value
      );
    },
    //创建监测后刷新数据
    refreshData() {
      const searchParams = this.$refs.searchRef.getParams();
      this.search(searchParams);
    },
    /**
     * !获取全部参数
     * @params 搜索框的参数
     */
    getParams(params) {
      const { currentPage, pageSize } = this.$refs.paginationRef;
      return {
        ...params,
        [CASE_PARAMS.CURRENT_PAGE]: currentPage,
        [CASE_PARAMS.PAGE_SIZE]: pageSize,
      };
    },
    // 按钮勾选的处理函数
    /**
     * @selection 勾选的全部数据
     */
    selectedHandle(selection) {
      const selectedData = selection.map((item) => item[CASE_PARAMS.ID]);
      const currentPage = this.$refs.pagination.currentPage;
      this.selectDataList[currentPage] = selectedData;
    },
    // 分页操作
    paginationChange({ sign }) {
      const searchParams = this.$refs.searchRef.getParams();
      if (sign === 'size') {
        //勾选数据清空
        this.selectDataList = {};
      }
      this.getTableData(this.getParams(searchParams));
    },
    // 获取列表数据
    async getTableData(params) {
      try {
        this.searchLoading = true;
        const res = await caseList(params);
        this.searchLoading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.tableData = res.data[CASE_PARAMS.LIST];
          this.total = res.data[CASE_PARAMS.TOTAL];
          await this.$nextTick();
          this.restoreData();
        }
      } catch (error) {
        this.searchLoading = false;
        console.error(error);
      }
    },
    // 还原数据选中状态
    restoreData() {
      const tableRef = this.$refs.tableRef;
      const { currentPage } = this.$refs.paginationRef;
      tableRef.clearSelection(); //先清空选中状态
      if (this.selectDataList[currentPage]) {
        this.selectDataList[currentPage].forEach((item) => {
          const index = this.tableData.findIndex(
            (i) => i[CASE_PARAMS.ID] === item
          );
          const flag = index > -1 ? true : false;
          flag && tableRef.toggleRowSelection(this.tableData[index]);
        });
      }
      this.handleAllSelect();
    },
    // 创建隐藏全选按钮的图层
    creteHideAllSelectDom() {
      const div = document.createElement('div');
      const innerDiv = document.createElement('div');
      innerDiv.className = 'inner-dialog';
      div.appendChild(innerDiv);
      div.className = 'disabled-dialog';
      document
        .getElementsByClassName('has-gutter')[0]
        .getElementsByClassName('cell')[0]
        .appendChild(div);
    },
    // 处理全选按钮是否禁用
    handleAllSelect() {
      // 判断是否有隐藏图层
      const dialogDiv = document.querySelector(
        '.has-gutter .cell .disabled-dialog'
      );
      // 有的话先隐藏
      if (dialogDiv) dialogDiv.style.display = 'none';
      // 是否列表中的勾选框全部禁用
      const isAllSelectDisabled = this.tableData.every(
        (item) =>
          item[CASE_PARAMS.STATUS] ===
          ENUM.CASE_MONITOR_STATUS.UNDER_MONITORING.value
      );
      if (isAllSelectDisabled) {
        // 先判断是否有图层;
        if (dialogDiv) return (dialogDiv.style.display = 'block');
        // 没有的话创建按一个图层
        this.creteHideAllSelectDom();
      }
    },
    // 查看详情
    getDetail() {
      this.$refs.drawerRef.drawer = true;
    },
    // 创建监测
    createMonitor() {
      const caseIds = Object.values(this.selectDataList).flat();
      if (caseIds.length === 0) {
        this.$$_notify('请先选择案件', 'error');
        return;
      }
      this.$refs.createMonitorRef.dialogVisible = true;
      this.$refs.createMonitorRef.caseIds = caseIds;
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