// 手写promise
const MyPromise = (function () {
    const FULFILLED = 'fulfilled'
    const REJECTED = 'rejected'
    const PENDING = 'pending'
    return class {
        /**
         * 
         * @param {*} executor  任务执行器
         */
        constructor(executor) {
            this._state = PENDING; // promise的状态
            this._value = undefined; // promise的值
            try {
                executor(this._resolved.bind(this), this._rejected.bind(this))
            } catch (error) {
                // 捕获错误进入任务失败处理
                this._rejected(error)
            }
        }

        /**
         * 更改任务的状态和值
         * @param {*} newState  新的状态
         * @param {*} value  新的值
         * @returns 
         */
        _changeState(newState, value) {
            if (this._state !== PENDING) {
                return;
            }
            this._state = newState;
            this._value = value;
        }

        /**
         * 标记当前任务完成
         * @param {*} data  成功的数据
         */
        _resolved(data) {
            this._changeState(FULFILLED, data);
        }

        /**
         * 标记当前任务失败
         * @param {*} reason  失败的原因
         */
        _rejected(reason) {
            this._changeState(REJECTED, reason);
        }
    }
})()

const pro = new MyPromise((resolved, rejected) => {
    throw new Error('哈哈哈')
})
console.log(pro)
