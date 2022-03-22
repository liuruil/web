/**
 * 自定义ScrollBar
 */
class ScrollBar {

    constructor(options) {
        // 获取容器元素
        this.scrollWrapper = options.scrollWrapper;
        // 容器元素的内部包裹元素
        this.scrollContent = options.scrollContent;
        // 滚动条的宽度
        this.scrollWidth = options.scrollWidth || 10
        // 滚动条容器的颜色
        this.scrollBarContentColor = options.scrollBarContentColor
        // 滚动条的颜色
        this.scrollBarColor = options.scrollBarColor
        // 容器的高度
        this.height = options.height

        this.scrollWrapper.style.height = this.height + 'px'
        // 滚动条的容器
        this.scrollBarContent;
        // 滚动条
        this.scrollBar;

        // 设置容器的样式
        this.setScrollWrapperStyle()

        this.addScrollBarContent()

        // 监听滚动条的事件
        this.addListenerScrollBar()

        // 监听页面的滚动事件
        this.addListenerScrollWrapper()
    }

    // 设置容器的样式
    setScrollWrapperStyle() {
        this.scrollWrapper.style.position = 'relative'
        this.scrollWrapper.style.overflow = 'hidden'
        this.scrollWrapper.style.paddingRight = this.scrollWidth + 'px';
        this.scrollWrapper.style.boxSizing = 'border-box';
        this.scrollContent.style.boxSizing = 'border-box';
        this.scrollContent.style.width = '100%';
        this.scrollContent.style.height = '100%';
        this.scrollContent.style.overflow = 'hidden';
    }

    // 给滚动条添加滚动的容器
    addScrollBarContent() {
        const div = document.createElement('div');
        div.className = 'scroll-bar-content';
        this.scrollBarContent = div
        this.setScrollBarContentStyle()
        this.scrollWrapper.appendChild(this.scrollBarContent);
        this.addScrollBar()
    }

    // 设置滚动条容器的样式
    setScrollBarContentStyle() {
        this.scrollBarContent.style.position = 'absolute';
        this.scrollBarContent.style.top = '0';
        this.scrollBarContent.style.right = '0';
        this.scrollBarContent.style.height = '100%';
        this.scrollBarContent.style.width = this.scrollWidth + 'px';
        this.scrollBarContent.style.backgroundColor = this.scrollBarContentColor
    }

    // 添加滚动条元素以及设置高度
    addScrollBar() {
        // 容器的内部包裹元素视口高度
        const scrollHeight = this.scrollContent.scrollHeight
        // 容器的内部包裹元素的滚动高度
        const clientHeight = this.scrollContent.clientHeight
        // 设置滚动条的样式
        this.scrollBar = document.createElement('div');
        this.setScrollBarStyle()
        // 计算出来滚动条该有的高度
        this.scrollBar.style.height = clientHeight * clientHeight / scrollHeight + 'px'
        // 插入到滚动条容器中
        this.scrollBarContent.appendChild(this.scrollBar)
    }

    // 设置滚动条的样式
    setScrollBarStyle() {
        this.scrollBar.className = 'scroll-bar'
        this.scrollBar.style.width = '100%'
        this.scrollBar.style.backgroundColor = this.scrollBarColor
        this.scrollBar.style.position = 'absolute'
        this.scrollBar.style.top = '0';
        this.scrollBar.right = '0';
    }

    // 监听滚动条的下拉事件
    addListenerScrollBar() {
        const that = this
        this.scrollWrapper.ondragstart = function () {
            return false
        }
        this.scrollBar.onmousedown = function (point) {
            const originTop = that.scrollBar.offsetTop
            that.scrollWrapper.onmousemove = function (e) {
                let top = e.pageY - point.pageY + originTop
                that.setPosition(top)
            }
        }
        document.onmouseup = function () {
            that.scrollWrapper.onmousemove = null;
        }
    }

    // 监听鼠标滑动事件
    addListenerScrollWrapper() {
        var that = this;
        this.scrollContent.onwheel = function (e) {
            let originTop = that.scrollBar.offsetTop
            if (e.deltaY > 0) {
                originTop += 10
            } else {
                originTop -= 10
            }
            that.setPosition(originTop)
        }
    }

    // 设置最终位置
    setPosition(top) {
        const scrollBarHeight = this.scrollBar.clientHeight;
        const wrapperHeight = this.scrollContent.scrollHeight
        const clientHeight = this.scrollContent.clientHeight
        const maxTop = clientHeight - scrollBarHeight
        if (top >= maxTop) {
            top = maxTop
        }
        if (top <= 0) {
            top = 0
        }
        this.scrollBar.style.top = top + 'px'
        this.scrollContent.scroll({
            top: wrapperHeight * (top + scrollBarHeight) / clientHeight - clientHeight
        })
    }

}

new ScrollBar({
    scrollWrapper: document.getElementsByClassName('scroll-wrapper')[0], //外部容器
    scrollContent: document.getElementsByClassName('scroll-content')[0], //包裹数据的容器
    scrollWidth: 10,//滚动条的宽度
    scrollBarContentColor: '#6C73FF',//滚动条容器的颜色
    scrollBarColor: '#A5ABFF',//滚动条的颜色
    height: 500 //容器的高度
})

/* 
    <div class="scroll-wrapper">
        <div class="scroll-content">
            write....
        </div>
    </div>
*/

