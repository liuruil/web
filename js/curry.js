// 函数柯里化(Currying)
// 是一种函数转化方法
// 高阶函数(接收函数作为参数的函数)的一种，
// 它将一个接收多参数的函数转化为接收部分参数的函数。
// 柯里化后的函数只传递部分参数来调用，
// 并返回一个新的函数 去处理剩余的参数，是逐步传参的过程。

var curry = function (fn) {
    // 拿到剩余的参数数组
    const argus = [].slice.call(arguments, 1)
    const size = fn.length //得到函数执行需要的参数
    return function () {
        const _argus = [].slice.call(arguments)
        const allArgus = [...argus, ..._argus]
        if (allArgus.length >= size) { //满足条件了
            return fn.apply(null, allArgus)
        } else {
            return curry.apply(null, [fn, ...allArgus])
        }
    }
}

const isType = function (type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}

const isFunction = curry(isType, 'Function')
const isArray = curry(isType, 'Array')
const isString = curry(isType, 'String')
console.log(isFunction(function () { }))
console.log(isArray([]))


function ajax(method, url, data) {

}
const get = curry(ajax, 'get')
const post = curry(ajax, 'post')
get('/', {})































