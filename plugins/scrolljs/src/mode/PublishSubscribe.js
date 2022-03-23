// 发布订阅模式
const eventObj = {
    clientList: {},
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn)
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments)
        const fns = this.clientList[key]

        if (!fns || fns.length === 0) {
            return false
        }
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}
/**
 * 给构造函数原型增加发布订阅事件
 * @param {Class} constructor 
 */
export const installEvent = function (object) {
    for (var key in eventObj) {
        object[key] = eventObj[key]
    }
}