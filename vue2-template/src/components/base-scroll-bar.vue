<template>
  <div
    ref="scrollWrapperRef"
    class="scroll-wrapper"
    @wheel="addListenerScrollWrapperWheel"
    @dragstart.prevent=""
    :style="{
      height,
      paddingRight: showScrollBar ? scrollBarWidth + 'px' : '0',
    }"
  >
    <div ref="scrollContentRef" class="scroll-content">
      <slot></slot>
    </div>
    <div
      @click="scrollBarContentClick"
      ref="scrollBarContentRef"
      v-show="showScrollBar"
      class="scroll-bar-content"
      :style="{
        backgroundColor: scrollBarContentColor,
        width: showScrollBar ? scrollBarWidth + 'px' : '0',
      }"
    >
      <div
        @mousedown="scrollBarMouseDown"
        ref="scrollBarRef"
        class="scroll-bar"
        :style="{
          backgroundColor: scrollBarColor,
          height: scrollBarHeight,
        }"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 容器的高度
    height: {
      type: String,
      required: true,
    },
    // 是否有动画
    isAnimate: {
      type: Boolean,
      default: true,
    },
    // 动画速率
    speed: {
      type: String,
      default: 'normal',
    },
    // 滚动条的宽度
    scrollBarWidth: {
      type: Number,
      default: 10,
    },
    // 滚动条的颜色
    scrollBarColor: {
      type: String,
      default: '#A5ABFF',
    },
    // 滚动条容器的颜色
    scrollBarContentColor: {
      type: String,
      default: '#6C73FF',
    },
  },
  data() {
    return {
      showScrollBar: true, // 是否显示滚动条
      scrollBarHeight: '0',
      SPEED_LIST: {
        slow: 1,
        normal: 2,
        fast: 3,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    /**
     * 初始化函数
     */
    init() {
      const scrollContent = this.$refs.scrollContentRef;
      const scrollHeight = scrollContent.scrollHeight;
      const clientHeight = scrollContent.clientHeight;
      if (scrollHeight <= clientHeight) {
        // 不需要滚动条
        this.showScrollBar = false;
        return;
      }
      this.scrollBarHeight =
        (clientHeight * clientHeight) / scrollHeight + 'px'; // 计算滚动条的高度
      this.addListenerDocumentMouseUp();
      this.addEventListenerScrollHeight();
    },
    // 重新计算滚动条的高度
    refreshCalcHeight() {
      const scrollContent = this.$refs.scrollContentRef;
      const scrollHeight = scrollContent.scrollHeight;
      const clientHeight = scrollContent.clientHeight;
      if (scrollHeight <= clientHeight) {
        // 不需要滚动条
        this.showScrollBar = false;
        return;
      }
      this.scrollBarHeight =
        (clientHeight * clientHeight) / scrollHeight + 'px'; // 计算滚动条的高度
    },
    /**
     * 内容元素变化和视口变化重新计算滚动条
     */
    addEventListenerScrollHeight() {
      const that = this;
      const callback = function () {
        this.refreshCalcHeight();
      };
      const observer = new MutationObserver(callback.bind(this));
      observer.observe(this.$refs.scrollContentRef, {
        attributes: true,
        childList: true,
        subtree: true,
      });
      // 视口变化重新计算高度
      window.onresize = function () {
        that.refreshCalcHeight();
      };
    },
    /**
     * 判断是否是IE浏览器
     */
    isIE() {
      return window.navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    },
    /**
     * 点击滚动条容器的事件
     */
    scrollBarContentClick(e) {
      if (e.target === this.$refs.scrollBarContentRef) {
        const barHeight = this.$refs.scrollBarRef.clientHeight;
        let top = e.offsetY;
        if (e.offsetY >= barHeight) {
          // 点击进度条容器下方
          top = e.offsetY - barHeight;
        }
        if (!this.isAnimate) {
          return this.setPosition(top);
        }
        this.setAnimatePosition(top);
      }
    },
    /**
     * 滚动条的滑动事件
     */
    scrollBarMouseDown(point) {
      const that = this;
      const originTop = this.$refs.scrollBarRef.offsetTop;
      this.$refs.scrollWrapperRef.onmousemove = function (e) {
        const top = e.pageY - point.pageY + originTop;
        const result = that.rollingBoundaryJudgment(top);
        that.setPosition(result);
      };
    },
    /**
     * 监听容器中鼠标事件
     */
    addListenerDocumentMouseUp() {
      var that = this;
      document.addEventListener('mouseup', function () {
        that.$refs.scrollWrapperRef &&
          (that.$refs.scrollWrapperRef.onmousemove = null);
      });
    },
    /**
     * 监听容器鼠标滑动事件
     */
    addListenerScrollWrapperWheel(e) {
      let originTop = this.$refs.scrollBarRef.offsetTop;
      if (e.deltaY > 0) {
        originTop += 10;
      } else {
        originTop -= 10;
      }
      const result = this.rollingBoundaryJudgment(originTop);
      this.setPosition(result);
    },
    /**
     * 改变位置动画加
     * @param {*} top 滚动条移动的最终top值
     */
    setAnimatePosition(top) {
      let timer = null;
      let originTop = this.$refs.scrollBarRef.offsetTop;
      const direction = originTop > top ? 'up' : 'down';
      timer = setInterval(() => {
        if (direction === 'up') {
          if (originTop <= top) {
            this.setPosition(top);
            return clearInterval(timer);
          }
          originTop -= this.SPEED_LIST[this.speed];
        } else {
          if (originTop >= top) {
            this.setPosition(top);
            return clearInterval(timer);
          }
          originTop += this.SPEED_LIST[this.speed];
        }
        this.setPosition(originTop);
      }, 1);
    },
    /**
     * 滚动边界判定
     * @param {Number} top 获取到滚动条移动的top值
     * @return {Number} result 最终移动距离
     */
    rollingBoundaryJudgment(top) {
      const scrollBarHeight = this.$refs.scrollBarRef.clientHeight;
      const clientHeight = this.$refs.scrollContentRef.clientHeight;
      const maxTop = clientHeight - scrollBarHeight;
      if (top >= maxTop) {
        // 比最大移动距离大
        top = maxTop;
      }
      if (top <= 0) {
        // 移动负值
        top = 0;
      }
      return top;
    },
    /**
     * 改变位置
     * @param {*} top 滚动条移动的最终top值
     */
    setPosition(top) {
      const scrollBarHeight = this.$refs.scrollBarRef.clientHeight;
      const wrapperHeight = this.$refs.scrollContentRef.scrollHeight;
      const clientHeight = this.$refs.scrollContentRef.clientHeight;
      this.$refs.scrollBarRef.style.top = top + 'px';
      const resultTop =
        (wrapperHeight * (top + scrollBarHeight)) / clientHeight - clientHeight;
      if (this.isIE()) {
        // 兼容IE
        return (this.$refs.scrollContentRef.scrollTop = resultTop);
      }
      // scroll 此方法在IE上不支持
      this.$refs.scrollContentRef.scroll({
        top: resultTop,
      });
    },
  },
};
</script>

<style scoped>
.scroll-wrapper {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.scroll-content {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-bar-content {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
}

.scroll-bar {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
}
</style>
