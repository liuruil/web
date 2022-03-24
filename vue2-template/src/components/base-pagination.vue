<template>
  <div class="container-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { pageSize,pageSizes } from '@/config';
export default {
  name: 'ele-pagination',
  props: {
    total: {
      required: true,
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      pageSizes,
      pageSize,
      currentPage: 1,
    };
  },
  methods: {
    // 改变当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.$emit('paginationChange', {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        sign: 'page', //判断是改变了页容量(size)还是改变了页数(page)
      });
    },
    // 改变页容量
    handleSizeChange(pageSize) {
      this.currentPage = 1;
      this.pageSize = pageSize;
      this.$emit('paginationChange', {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        sign: 'size',
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/theme";
.container-pagination {
  text-align: right;
  margin-top: 10px;
  padding-right: @menuGap;
  /deep/ .el-pager li.active {
    color: #fff;
    background-color: @theme;
    border-radius: 6px;
  }
}
</style>