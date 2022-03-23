// AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，
// 1. 这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。
// 2. 把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。
// 3. 这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，
// 4. 其次是可以很方便地复用日志统计等功能模块。
// 5. 可以动态改变函数的参数

// 利用高阶函数实现AOP

// 1. 利用原型链
Function.prototype.before = function (beforeFn) {
    var _self = this;
    return function () {
        beforeFn.apply(this, arguments); //执行新函数，修正this;
        return _self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterFn) {
    var _self = this;
    return function () {
        var ret = _self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
}

// 上面的AOP实现是在Function.prototype上添加before和after方法，
// 如果不喜欢这种污染原型的方式，那么我们可以做一些变通，
// 把原函数和新函数都作为参数传入before或者after方法：

// 2. 不污染原型链的方法
const before = function (fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments); //执行新函数，修正this;
        return fn.apply(this, arguments);
    }
}

const after = function (fn, afterFn) {
    return async function () {
        var res = await fn.apply(this, arguments);
        afterFn.apply(this, [...arguments, { res }]);
        return ret;
    }
}

