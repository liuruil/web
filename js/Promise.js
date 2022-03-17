/**
 * 把一个函数放到微队列中执行
 * @param {Function} callback 
 */
function runMicroTask(callback) {
    //判断代码运行环境
    if (typeof window === 'undefined') { //node环境
        process.nextTick(callback)
    }
    else if (MutationObserver) { //浏览器支持的情况下使用
        const p = document.createElement('p')
        const observer = new MutationObserver(callback)
        observer.observe(p, {
            childList: true //监听子元素的变化
        })
        p.innerHTML = '1'
    } else { //只能使用setTimeout模拟
        setTimeout(callback, 0)
    }
}

/**
 * 判断一个数据是否是promise
 */
function isPromise(obj) {
    return !!(obj && typeof obj === 'object' && typeof obj.then === 'function')
}

// 手写promise
const MyPromise = (function () {
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'
    const PENDING = 'pending'
    return class {
        /**
         * 
         * @param {Function} executor  任务执行器
         */
        constructor(executor) {
            this._state = PENDING; // 状态
            this._value = undefined; // 数据
            this._handle = [] //执行队列

            try {
                executor(this._resolved.bind(this), this._rejected.bind(this))
            } catch (error) {
                console.log(error)
                // 捕获错误进入任务失败处理
                this._rejected(error)
            }
        }

        /**
         * 返回一个成功状态的Promise
         * *特殊情况
         * 1. data是一个ES6的Promise
         * 2. PromiseLike (符合 PromiseA+规范)
         * @param {*} data 
         */
        static resolve(data) {
            // 官方的Promise
            if (data instanceof MyPromise) {
                return data;
            }
            return new MyPromise((resolve, reject) => {
                //符合PromiseA+规范的情况
                if (isPromise(data)) {
                    data.then(resolve, reject)
                } else {
                    resolve(data)
                }
            })
        }

        /**
         * 返回一个失败状态的Promise
         * @param {Any} reason 
         * @returns 
         */
        static reject(reason) {
            return new MyPromise((resolved, rejected) => {
                rejected(reason)
            })
        }

        /**
         * 返回一个新的Promise 全成功按顺序返回成功的数据 ，有一个失败则失败
         * proms正确的传递必须是一个迭代器 可以用 for-of 循环 否则直接reject
         * @param {iterator} proms 
         */
        static all(proms) {
            return new MyPromise((resolve, reject) => {
                try {
                    const result = [];
                    let count = 0;//记录Promise的个数
                    let fulfilledCount = 0; //记录完成Promise的个数
                    for (const p of proms) {
                        let i = count; //为了保证按顺序输出结果
                        count++;
                        MyPromise.resolve(p).then((data) => {
                            fulfilledCount++
                            result[i] = data
                            if (fulfilledCount === count) {
                                resolve(result)
                            }
                        }, err => {
                            reject(err)
                        })
                    }
                    if (count === 0) {
                        resolve(result)
                    }
                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            })
        }

        /**
         * 全部已决 不管失败还是成功 新Promise一定成功
         * 并且永远不会变成拒绝
         * @param {iterator} proms 
         */
        static allSettled(proms) {
            try {
                const ps = [];
                for (const p of proms) {
                    ps.push(
                        MyPromise.resolve(p).then(
                            value => ({
                                status: FULFILLED,
                                value
                            }),
                            reason => ({
                                status: REJECTED,
                                reason
                            })
                        )
                    )
                }
                return MyPromise.all(ps);
            } catch (error) {
                console.log(error)
                MyPromise.reject(error)
            }
        }

        /**
         * Promise的状态和第一个有结果的保持一致
         * @param {iterator} proms 
         */
        static race(proms) {
            return new MyPromise((resolve, reject) => {
                try {
                    for (const p of proms) {
                        MyPromise.resolve(p).then(resolve, reject);
                    }
                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            })
        }

        /**
         * 更改任务的状态和值
         * @param {String} newState  新的状态
         * @param {Any} value  新的值
         * @returns 
         */
        _changeState(newState, value) {
            if (this._state !== PENDING) { //已经是已决状态
                return;
            }
            this._state = newState;
            this._value = value;
            // 有异步时改变状态后执行队列
            this._runHandlers();
        }

        /**
         * 
         * @param {Function} executor executor函数
         * @param {String} state 什么状态下执行
         * @param {Function} resolve 让then返回的promise成功
         * @param {Function} reject 让then返回的promise失败
         */
        _changeHandler(executor, state, resolve, reject) {
            this._handle.push({
                executor,
                state,
                resolve,
                reject
            })
        }

        /**
         * 处理所有队列函数
         */
        _runHandlers() {
            if (this._state === PENDING) {
                return;
            }
            while (this._handle[0]) {
                // 处理队列函数并且删除
                this._runOneHandle(this._handle[0])
                this._handle.shift() //从数组中删除第一个元素 改变原数组
            }
        }

        /**
         * 处理单个队列函数
         * @param {Object} handle 
         */
        _runOneHandle({ executor, state, resolve, reject }) {
            // 放到微队列中执行
            runMicroTask(() => {
                if (this._state !== state) {
                    // 状态不一致，达不到执行条件
                    return;
                }
                // 当没有相关状态对应的处理函数的时候，状态和数据 跟之前的promise保持一致
                if (typeof executor !== 'function') {
                    this._state === FULFILLED ?
                        resolve(this._value) :
                        reject(this._value)
                    return;
                }
                try {
                    const result = executor(this._value)
                    if (isPromise(result)) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    console.log(error)
                    reject(error);
                }
            })
        }
        /**
         * 标记当前任务完成
         * @param {Any} data  成功的数据
         */
        _resolved(data) {
            this._changeState(FULFILLED, data);
        }

        /**
         * 标记当前任务失败
         * @param {Any} reason  失败的原因
         */
        _rejected(reason) {
            this._changeState(REJECTED, reason);
        }

        /**
         * promise A+ 规范的 then
         * @param {Function} onFulfilled 成功的回调函数
         * @param {Function} onRejected 失败的回调函数
         * @returns MyPromise
         */
        then(onFulfilled, onRejected) {
            return new MyPromise((resolve, reject) => {
                this._changeHandler(onFulfilled, FULFILLED, resolve, reject)
                this._changeHandler(onRejected, REJECTED, resolve, reject)
                // 如果没有异步操作 直接执行队列函数
                this._runHandlers();
            })
        }

        /**
         * Promise失败的执行函数
         * @param {Function} onRejected 
         */
        catch(onRejected) {
            this.then(null, onRejected)
        }

        /**
         * 无论Promise状态如何都会执行 状态和之前的Promise保持一致 ，
         * 如果执行报错 _value变为错误的原因
         * @param {Function} onSettled 
         * @returns 
         */
        finally(onSettled) {
            return this.then((data) => {
                onSettled()
                return data;
            }, reason => {
                onSettled()
                throw reason
            })
        }
    }
})()
