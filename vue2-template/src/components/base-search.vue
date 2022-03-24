<template>
  <div class="view-search">
    <div class="single-item" v-for="item in searchArray" :key="item.label">
      <span class="item-label">{{ item.label }}:</span>
      <el-input
        v-if="item.type !== 'select'"
        clearable
        :placeholder="'请输入' + item.label"
        v-model="item.value"
      ></el-input>
      <el-select
        clearable
        v-else-if="item.type === 'select'"
        v-model="item.value"
        :placeholder="'请选择' + item.label"
      >
        <el-option
          v-for="item in item.options"
          :key="item.value"
          :label="item.desc"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-button
      :loading="loading"
      type="primary"
      class="btn-search"
      @click="onSubmit"
      >搜索</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'ele-search',
  props: {
    searchForm: {
      required: true,
      type: Array,
    },
    loading: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      searchArray: [],
      allParams: {},
    };
  },
  mounted() {
    this.getSearchForm(this.searchForm);
  },
  methods: {
    // 整理搜索条件
    getSearchForm(propsArray) {
      const searchArray = [];
      for (let i = 0; i < propsArray.length; i++) {
        const { label, prop, type, options } = propsArray[i];
        const item = {};
        item.label = label;
        item.prop = prop;
        item.value = '';
        //是选择框的情况下
        if (type === 'select') {
          item.type = type;
          item.options = options;
        }
        searchArray[i] = item;
      }
      this.searchArray = [...searchArray];
    },
    // 整理参数
    getParams() {
      const propsArray = this.searchArray;
      const obj = {};
      for (let i = 0; i < propsArray.length; i++) {
        obj[propsArray[i].prop] = propsArray[i].value;
      }
      this.allParams = obj;
      return obj;
    },
    onSubmit() {
      const params = this.getParams();
      this.$emit('search', params);
    },
  },
  watch: {
    searchForm() {
      this.getSearchForm(this.searchForm);
    },
  },
};
</script>

<style lang='less' scoped>
@import url("../style/theme.less");
.view-search {
  background-color: #fff;
  display: flex;
  align-items: center;
  box-shadow: 3px 2px 11px 2px #e3e6f2;
  padding: 0 0;
  padding-right: 40px;
  height: @searchHeight;
  .single-item {
    font-size: 14px;
    display: flex;
    align-items: center;

    /deep/ .el-input__inner {
      font-size: 14px;
    }

    .item-label {
      width: 100px;
      text-align: right;
      color: #666666;
      margin-right: 10px;
    }
  }
  .btn-search {
    margin-left: 50px;
  }
}
</style>