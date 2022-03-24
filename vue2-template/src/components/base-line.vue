<template>
  <!-- 基础折线图组件 -->
  <div ref="lineRef" style="width: 100%; height: 300px"></div>
</template>
<script>
export default {
  name: 'LineCharts',
  props: {
    // 展示的数据
    chartData: {
      type: Array,
      default: () => [],
      required: true,
    },
    // 标题
    title: {
      type: String,
      required: true,
    },
    // 是否正在加载中
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      instance: null,
    };
  },
  async mounted() {
    await this.$nextTick();
    this.instance = this.$$_echarts.init(this.$refs.lineRef);
  },
  methods: {
    // 渲染列表
    echartsInit(instance, xAxis, resultY, yAxis) {
      //1.配置数据
      let option = {
        title: {
          text: this.title,
          textStyle: {
            fontSize: 14,
            color: '#1F2738',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          formatter(params) {
            return (
              '时间：' +
              xAxis[params[0].dataIndex] +
              '<br/>' +
              '金额：' +
              yAxis[params[0].dataIndex]
            );
          },
        },
        grid: {
          top: '15%',
          left: '5%',
          right: '5%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxis,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '',
            type: 'line',
            stack: 'Total',
            areaStyle: {
              color: '#E8F3FF',
            },
            itemStyle: {
              color: '#1F84FF',
            },
            smooth: true,
            emphasis: {
              focus: 'series',
            },
            data: resultY,
            showSymbol: false,
          },
        ],
      };
      if (!xAxis.length) {
        return instance.showLoading({
          text: this.title + '暂无数据',
          showSpinner: false,
          maskColor: 'transparent',
        });
      }
      instance.setOption(option);
    },
    // 获得所有需要的值
    getAllValue(origin) {
      const yAxis = origin.map((item) => item.amount);
      const resultY = [];
      for (let i = 0; i < yAxis.length; i++) {
        if (yAxis[i].split('-')[1]) {
          if (yAxis[i].split('-')[1] === '∞') {
            resultY[i] = parseInt(yAxis[i].split('-')[0]);
          } else {
            resultY[i] =
              (parseInt(yAxis[i].split('-')[0]) +
                parseInt(yAxis[i].split('-')[1])) /
              2;
          }
        } else {
          resultY[i] = parseInt(yAxis[i]);
        }
      }
      const xAxis = origin.map((item) => item.date);
      return {
        xAxis,
        yAxis,
        resultY,
      };
    },
  },
  watch: {
    isLoading(value) {
      if (value) {
        return this.instance.showLoading({
          text: '数据加载中',
          showSpinner: true,
          maskColor: 'transparent',
        });
      }
      this.instance.hideLoading(); //隐藏加载效果
      const { xAxis, resultY, yAxis } = this.getAllValue(this.chartData);
      this.echartsInit(this.instance, xAxis, resultY, yAxis);
    },
  },
};
</script>