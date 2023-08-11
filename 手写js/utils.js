/**
 * @description: obj2混合obj1
 * @param {*} obj1
 * @param {*} obj2
 * @return {*} 新的对象
 */
function mixinObj(obj1, obj2) {
    // const newObj = {}
    // for (const prop in obj2) {
    //     newObj[prop] = obj2[prop]
    // }
    // for (const prop in obj1) {
    //     if (!(prop in newObj)) {
    //         newObj[prop] = obj1[prop]
    //     }
    // }
    // return newObj
    return Object.assign({}, obj1, obj2)
}

/**
 * @description: 克隆
 * @param {*} obj 克隆的原始对象
 * @param {*Boolean} deep 是否是深度克隆
 * @return {*} 克隆后的对象
 */
function clone(obj, deep) {
    // 先判断是不是数组
    if (Array.isArray(obj)) {
        if (deep) {
            // 如果深度克隆 递归数组
            const newArr = []
            for (let index = 0; index < obj.length; index++) {
                newArr[index] = clone(obj[index], deep)
            }
            return newArr
        }
        return [...obj]
    } else if (typeof obj === 'object') {
        const newObj = {}
        for (const prop in obj) {
            // 如果深度克隆 递归对象
            newObj[prop] = deep ? clone(obj[prop], deep) : obj[prop]
        }
        return newObj
    }
    // 原始类型和函数直接返回
    return obj
}

/**
 * @description: 函数防抖(高阶函数:函数的返回值是函数)
 * @param {*} callback 回调函数
 * @param {*} time 延迟时间
 * @return {*} 函数
 */
function debounce(callback, time) {
    let timer = null
    return function () {
        clearTimeout(timer)
        const _args = arguments
        timer = setTimeout(() => {
            callback.apply(null, _args)
        }, time)
    }
}


/**
 * @description: 函数节流
 * @param {*} callback 回调函数
 * @param {*} time 间隔时间
 * @param {*} immediately 是否立即执行
 * @return {*} 函数
 */
function throttle(callback, time, immediately = true) {
    if (immediately) {
        let timer;
        return function () {
            if (!timer || (Date.now() - timer) >= time) {
                callback.apply(null, arguments)
                timer = Date.now()
            }
        }
    } else {
        let timer;
        return function () {
            if (timer) {
                return;
            }
            const _argus = arguments
            timer = setTimeout(() => {
                callback.apply(null, _argus)
                timer = null
            }, time)
        }
    }
}

/**
 * !根据id找到数组中的value为id的对象
 * @param {Number} id 
 * @param {Array} arr 
 * @param {String} childName 默认值是children
 * @returns null 或者 object
 */
function getItemByArray(id, arr, childName = 'children') {
    if (!arr) return null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return arr[i];
        }
        const result = getItemByArray(id, arr[i][childName])
        if (!result) {
            continue;
        }
        return result;
    }
    return null;
}

/**
 * @description: 刷新页面还原store的数据
 */
function initStoreData() {
    // 在页面加载时读取sessionStorage里的状态信息
    // 作用：防止页面刷新丢失store数据
    if (sessionStorage.getItem('store')) {
        this.$store.replaceState(
            Object.assign(
                {},
                this.$store.state,
                JSON.parse(sessionStorage.getItem('store'))
            )
        );
    }
    // 在页面刷新时将store里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
        if (this.$route.name !== loginRouterName) {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        }
    });
}

/**
 * 函数柯立化
 * 应用场景 ajax发送请求（type url params）
 * @param {*} fn 函数
 * @param {*} length 需要参数的个数
 */
var curry = (function () {
    /**
     * 固定参数才会fn的函数
     * @param {*} fn 应该执行的函数
     */
    function FixedParamsCurry(fn) {
        var _args = Array.prototype.slice.call(arguments, 1)
        return function () {
            var newArgs = _args.concat(Array.prototype.slice.call(arguments))
            return fn.apply(this, newArgs)
        }
    }
    return function (fn, length) {
        var length = length || fn.length
        return function () {
            if (arguments.length < length) {
                var combined = [fn].concat(Array.prototype.slice.call(arguments))
                return curry(FixedParamsCurry.apply(this, combined), length - arguments.length)
            } else {
                return fn.apply(this, arguments)
            }
        }
    }

})()


/**
 * 树形结构排序，根据汉字首字母
 * @param {*} arr 原始数据
 * @returns 
 */
function sortByPinYin(arr) {
    if (!arr) return;
    arr.sort((a, b) => a.label.localeCompare(b.label, 'zh'))
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            arr[i].children = sortByPinYin(arr[i].children)
        }
    }
    return arr
}

/**
 * 创建动画函数
 * @param {Object} options 配置对象
 * @param {Number} options.to 目标值
 * @param {Number} options.from 初始值
 * @param {Number} options.totolMS 运动时间 默认一秒
 * @param {Number} options.duration 每次运动间隔时间 默认15ms
 * @param {Function} options.onmove 每次运动执行的函数[参数是当前值]
 * @param {Function} options.onend 运动结束执行的函数
 */
function createAnimation(options) {
    var from = options.from; // 起始值
    var to = options.to; // 结束值
    var totalMS = options.totalMS || 1000; // 变化总时间
    var duration = options.duration || 15; // 动画间隔时间
    var times = Math.floor(totalMS / duration); // 变化的次数
    var dis = (to - from) / times; // 每一次变化改变的值
    var curTimes = 0; // 当前变化的次数
    var timerId = setInterval(function () {
        from += dis;
        curTimes++; // 当前变化增加一次
        if (curTimes >= times) {
            // 变化的次数达到了
            from = to; // 变化完成了
            clearInterval(timerId); // 不再变化了
            options.onmove && options.onmove(from);
            options.onend && options.onend();
            return;
        }
        // 无数的可能性
        options.onmove && options.onmove(from);
    }, duration);
}

/**
 * requestAnimationFrame 动画
 * @param {Object} options 配置对象
 * @param {Number} options.timing  计算动画进度的函数。获取从 0 到 1 的小数时间，返回动画进度，
 * @param {Number} options.duration 运动总时间
 * @param {Function} options.draw 每次运动执行的函数[参数是当前值]
 */
function animate({
    timing,
    draw,
    duration
}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        // timeFraction 从 0 增加到 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // 计算当前动画状态
        let progress = timing(timeFraction);
        draw(progress); // 绘制
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}
