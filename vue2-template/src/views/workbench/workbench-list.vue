<template>
  <div class="view-container">
    <div class="list-container">
      <el-tabs
        class="tab-container"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane v-loading="isLoading" name="0">
          <span slot="label">
            <el-badge
              :class="watchCount ? '' : 'no-badge'"
              :value="watchCount"
              class="item"
              >关注</el-badge
            ></span
          >
          <div
            class="single-card"
            v-for="(item, index) in tableDataFocus"
            :key="item[WORKBENCH_PARAMS.ID]"
          >
            <div class="card-top">
              <div
                class="left"
                :class="item[WORKBENCH_PARAMS.IS_READ] ? '' : 'circle'"
              >
                <span>{{ item[WORKBENCH_PARAMS.CASE_NUM] }}</span>
                <span class="split-line"></span>
                <span>{{ item[WORKBENCH_PARAMS.PERSON_CONTENT] }}</span>
              </div>
              <div class="right">
                <el-button type="text" @click="getDetail(item)"
                  >查看详情</el-button
                >
                <el-button
                  :class="item[WORKBENCH_PARAMS.IS_READ] ? 'grey' : ''"
                  type="text"
                  @click="
                    tagRead(
                      item[WORKBENCH_PARAMS.ID],
                      item[WORKBENCH_PARAMS.IS_READ],
                      index
                    )
                  "
                  >标记已读</el-button
                >
              </div>
            </div>
            <div class="card-bottom">
              <div class="single-report">
                {{ item[WORKBENCH_PARAMS.NOTICE_CONTENT] }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-loading="isLoading" name="1">
          <span slot="label">
            <el-badge
              :class="actionCount ? '' : 'no-badge'"
              :value="actionCount"
              class="item"
              >行动</el-badge
            ></span
          >
          <div
            class="single-card"
            v-for="(item, index) in tableDataActions"
            :key="item[WORKBENCH_PARAMS.ID]"
          >
            <div class="card-top">
              <div
                class="left"
                :class="item[WORKBENCH_PARAMS.IS_READ] ? '' : 'circle'"
              >
                <span>{{ item[WORKBENCH_PARAMS.CASE_NUM] }}</span>
                <span class="split-line"></span>
                <span>{{ item[WORKBENCH_PARAMS.PERSON_CONTENT] }}</span>
              </div>
              <div class="right">
                <el-button type="text" @click="getDetail(item)"
                  >查看详情</el-button
                >
                <el-button
                  :class="item[WORKBENCH_PARAMS.IS_READ] ? 'grey' : ''"
                  type="text"
                  @click="
                    tagRead(
                      item[WORKBENCH_PARAMS.ID],
                      item[WORKBENCH_PARAMS.IS_READ],
                      index
                    )
                  "
                  >标记已读</el-button
                >
              </div>
            </div>
            <div class="card-bottom">
              <div class="single-report">
                {{ item[WORKBENCH_PARAMS.NOTICE_CONTENT] }}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <base-pagination
        ref="pagination"
        :total="total"
        @paginationChange="paginationChange"
      ></base-pagination>
    </div>
    <drawer-dialog ref="drawerRef"></drawer-dialog>
  </div>
</template>

<script>
import { workbenchList, workbenchRead } from '@/api/modules/workbench';
import BasePagination from '@/components/base-pagination';
import { throttle } from '@/util';

import DrawerDialog from './components/workbench-details-modal.vue';
import { WORKBENCH_PARAMS } from './params';
export default {
  name: 'Workbench',
  components: {
    BasePagination,
    DrawerDialog,
  },
  data() {
    return {
      WORKBENCH_PARAMS,
      isLoading: false,
      activeName: '0',
      total: 0,
      watchCount: 0,
      actionCount: 0,
      tableDataFocus: [],
      tableDataActions: [],
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 分页切换
    handleClick() {
      this.getTableData();
    },
    paginationChange({ currentPage, pageSize }) {
      this.getTableData(currentPage, pageSize);
    },
    // 获取列表数据
    async getTableData(currentPage, pageSize) {
      try {
        this.isLoading = true;
        const res = await workbenchList({
          [WORKBENCH_PARAMS.PAGE_SIZE]: pageSize,
          [WORKBENCH_PARAMS.CURRENT_PAGE]: currentPage,
          [WORKBENCH_PARAMS.WORKBENCH_TYPE]: this.activeName,
        });
        this.isLoading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          if (this.activeName === '0') {
            this.tableDataFocus = res.data[WORKBENCH_PARAMS.LIST];
          } else {
            this.tableDataActions = res.data[WORKBENCH_PARAMS.LIST];
          }
          this.watchCount = res.data[WORKBENCH_PARAMS.WATCH_COUNT];
          this.actionCount = res.data[WORKBENCH_PARAMS.ACTION_COUNT];
          this.total = res.data[WORKBENCH_PARAMS.TOTAL];
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    // 查看详情
    getDetail(item) {
      const id = item[WORKBENCH_PARAMS.ID];
      this.$refs.drawerRef.title = item[WORKBENCH_PARAMS.CASE_NUM];
      this.$refs.drawerRef.bottomTitle = item[WORKBENCH_PARAMS.PERSON_CONTENT];
      this.$refs.drawerRef.drawer = true;
      this.$refs.drawerRef.id = id;
    },
    /**
     *@description 标记已读方法(节流)
     * @params id {Number} 工作台id
     * @params isRead {Number} 是否已读
     */
    tagRead: throttle(async function (id, isRead, index) {
      try {
        if (isRead) return;
        const res = await workbenchRead({
          [WORKBENCH_PARAMS.ID]: id,
        });
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('标记已读成功');
          if (this.activeName === '0') {
            this.watchCount && this.watchCount--;
            this.$set(this.tableDataFocus[index], WORKBENCH_PARAMS.IS_READ, 1);
          } else {
            this.actionCount && this.actionCount--;
            this.$set(
              this.tableDataActions[index],
              WORKBENCH_PARAMS.IS_READ,
              1
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000),
  },
};
</script>

<style lang="less" scoped>
@import url("../../style/theme.less");
.list-container {
  box-shadow: 0 0 0 0 transparent;
  background-color: transparent;
  padding: 0;
  .tab-container {
    height: 100%;
    overflow: hidden;
    .no-badge /deep/ .el-badge__content {
      opacity: 0;
    }

    /deep/ div[role="tabpanel"] {
      min-height: 300px;
    }
    /deep/ .el-badge__content {
      line-height: 15px;
    }
    .single-card {
      background-color: #fff;
      box-shadow: 3px 2px 11px 2px #e3e6f2;
      padding: 20px 15px;
      margin-bottom: @menuGap;

      .card-top {
        color: #1f2738;
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;
        margin-bottom: 10px;
        padding-left: 10px;
        font-weight: 600;
        .split-line {
          padding: 0 10px;
        }
        .circle::before {
          position: absolute;
          left: -5px;
          top: calc(50% - 4px);
          content: "";
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d81e06;
        }
      }

      .card-bottom {
        .single-report {
          padding: 5px 15px;
          white-space: pre-line;
          line-height: 34px;
          color: #666;
          font-size: 14px;
        }
      }
    }

    /deep/ .el-tabs__header {
      padding: 5px 30px;
      padding-top: 3px;
      background-color: #fff;
    }

    /deep/ .el-tabs__nav-wrap::after {
      background-color: #fff;
    }

    /deep/ .el-tabs__content {
      height: calc(100% - 40px);
    }

    /deep/ .el-tab-pane {
      height: 100%;
      overflow: auto;
      box-sizing: border-box;
      padding-bottom: 15px;
    }

    /deep/ .el-badge__content.is-fixed {
      top: 9px;
      right: 1px;
    }
  }
}
</style>