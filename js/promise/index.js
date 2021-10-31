// 手写promise
const MyPromise = (function () {
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'
    const PENDING = 'pending'
    const promiseValue = Symbol('promiseValue') //promise的值
    const promiseStatus = Symbol('promiseStatus') //promise的状态
    const changeStatus = Symbol('changeState') //改变状态的函数
    const thenables = Symbol('thenables') //thenable队列
    const catchables = Symbol('catchables') //catchable队列
    const settleHandle = Symbol('settleHandle') //后续处理函数
    return class MyPromise {

        /**
         * 
         * @param {*} status 要变成的状态
         * @param {*} value  promise改变的值
         * @param {*} queue  状态对应的队列
         * @returns 
         */
        [changeStatus](status, value, queue) {
            if (this[promiseStatus] !== PENDING) {
                return;
            }
            this[promiseValue] = value
            this[promiseStatus] = status
            //执行队列
            queue.forEach(handel => handel(this[promiseValue]))
        }

        /**
         * @description: 后续处理函数的通用方法
         * @param {*} handle 处理函数
         * @param {*} queue 相应队列
         * @param {*} status 改变的状态
         * @return {*}
         */
        [settleHandle](handle, queue, status) {
            if (this[promiseStatus] === status) {
                setTimeout(() => {
                    handle(this[promiseValue])
                }, 0)
            } else {
                queue.push(handle)
            }
        }


        /**
         * @param {*} executor  promise回调函数
         * @return {*}
         */
        constructor(executor) {
            this[catchables] = [] //初始化catch队列
            this[thenables] = [] //初始化then队列
            this[promiseValue] = undefined
            this[promiseStatus] = PENDING
            const resolved = (data) => {
                this[changeStatus](RESOLVED, data, this[thenables])
            }
            const rejected = (err) => {
                this[changeStatus](REJECTED, err, this[catchables])
            }
            try {
                executor(resolved, rejected)
            } catch (error) {
                rejected(error)
            }
        }

        /**
         * @description: then方法实现
         * @param {*} thenable then的第一个参数
         * @param {*} catchable then的第二个参数
         * @return {*}
         */
        then(thenable, catchable) {
            this[settleHandle](thenable, this[thenables], RESOLVED)
            this.catch(catchable)
        }

        /**
         * @description: catch方法实现
         * @param {*} catchable catch的第一个参数
         * @return {*}
         */
        catch(catchable) {
            if (typeof catchable !== 'function') {
                return;
            }
            this[settleHandle](catchable, this[catchables], REJECTED)
        }
    }
})()

const pro = new MyPromise((resolved, rejected) => {
    setTimeout(() => {
        rejected(1)
    }, 2000)
})
pro.then((data) => {
    console.log(data)
})
pro.catch((data) => {
    console.log('catch', data)
})
console.log(pro)
