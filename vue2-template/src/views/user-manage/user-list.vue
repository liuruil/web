<template>
  <div class="view-container">
    <div class="list-container">
      <table-header title="用户列表">
        <div class="right-container">
          <el-button type="primary" @click="addUser">新建用户</el-button>
        </div>
      </table-header>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
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
          <template slot-scope="scope">
            <el-button type="text" @click="addUser(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              @click="changeUserState(scope.$index, scope.row)"
              >{{
                $enum.getDescByValue(
                  "OPERATE_TEXT",
                  scope.row[ACCOUNT_PARAMS.STATUS]
                )
              }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <base-pagination
        ref="pagination"
        :total="total"
        @paginationChange="paginationChange"
      ></base-pagination>
    </div>
  </div>
</template>

<script>
import { freezeUser, unfreezeUser, userList } from '@/api/modules/user-manage';
import BasePagination from '@/components/base-pagination';
import TableHeader from '@/components/base-table-header';
import CONSTANTS from '@/constants';

import { ACCOUNT_PARAMS } from './params';
export default {
  name: 'UserList',
  components: {
    TableHeader,
    BasePagination,
  },
  data() {
    return {
      ACCOUNT_PARAMS,
      tableData: [],
      tableColumn: [
        {
          label: '账号',
          prop: ACCOUNT_PARAMS.ACCOUNT,
        },
        {
          label: '法官姓名',
          prop: ACCOUNT_PARAMS.JUDGE_NAME,
        },
        {
          label: '手机号',
          prop: ACCOUNT_PARAMS.MOBILE,
        },
        {
          label: '邮箱',
          prop: ACCOUNT_PARAMS.EMAIL,
        },
      ],
      total: 0,
      loading: false,
    };
  },
  mounted() {
    this.getTableData(this.getParams());
  },
  methods: {
    // 新增或编辑操作
    addUser(index, row) {
      this.$router.push({
        path: row ? '/user-edit' : '/user-add',
        query: row ? { ...row } : {},
      });
    },
    // 分页变化的操作
    paginationChange() {
      this.getTableData(this.getParams());
    },
    // 组装参数
    getParams() {
      const { currentPage, pageSize } = this.$refs.pagination;
      return {
        [ACCOUNT_PARAMS.CURRENT_PAGE]: currentPage,
        [ACCOUNT_PARAMS.PAGE_SIZE]: pageSize,
      };
    },
    // 获取列表数据
    async getTableData(params) {
      try {
        this.loading = true;
        const res = await userList(params);
        this.loading = false;
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.tableData = res.data[ACCOUNT_PARAMS.LIST];
          this.total = res.data[ACCOUNT_PARAMS.TOTAL];
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 获取操作和提示语
    getConformTip(row) {
      const operate = this.$enum.getDescByValue(
        'OPERATE_TEXT',
        row[ACCOUNT_PARAMS.STATUS]
      );
      // 获取提示语
      const confirmText =
        '确定' + operate + '账户 ' + row[ACCOUNT_PARAMS.ACCOUNT] + ' 吗?';
      return { operate, confirmText };
    },
    // 获取修改状态的处理函数
    getHandleFunc(row) {
      const func =
        row[ACCOUNT_PARAMS.STATUS] === CONSTANTS.OPERATE_TEXT.FREEZE.value
          ? freezeUser
          : unfreezeUser;
      return func;
    },
    // 修改用户状态
    async changeUserState(index, row) {
      try {
        // 获取操作
        const { operate, confirmText } = this.getConformTip(row);
        await this.$confirm(confirmText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        });
        const res = await this.getHandleFunc(row)({
          [ACCOUNT_PARAMS.ID]: row[ACCOUNT_PARAMS.ID],
        });
        if (res[this.$$_errCode] === this.$$_successCode) {
          this.$$_notify('账户' + operate + '成功');
          this.getTableData(this.getParams());
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