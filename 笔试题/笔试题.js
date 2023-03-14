//1.数据找道最大值
const data = [{
    id: 1,
    label: '一级 1',
    children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
            id: 10,
            label: '三级 1-1-2',
            children: [{
                id: 11,
                label: '四级 1-1-2-1'
            }]
        }]
    }]
}, {
    id: 2,
    label: '一级 2',
    children: [{
        id: 5,
        label: '二级 2-1'
    }, {
        id: 6,
        label: '二级 2-2',
        children: [{
            id: 13,
            label: '四级 1-1-2-1',
            children: [{
                id: 14,
                label: '四级 1-1-2-1',
            }]
        }]
    }],

}]

function getMaxItem(arr, max = null) {
    if (!arr) return max;
    if ((max && arr[0].id > max.id) || !max) max = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id > max.id) max = arr[i]
        max = getMaxItem(arr[i].children, max)
    }
    return max
}
console.log(getMaxItem(data))

//2.数据分组
groupBy([{
    age: 16,
    name: 'jack'
}, {
    age: 16,
    name: 'jeny'
}, {
    age: 18,
    name: 'peter'
}], 'age')

function groupBy(arr, name) {
    var result = []
    arr.forEach(item => {
        var index = result.findIndex(i => i.some(j => j[name] === item[name]))
        if (index > -1) {
            result[index].push(item)
        } else {
            result[result.length] = [item]
        }
    })
    return result
}

//3. 消除异步的传染性
function getUserInfo() {
    const user1 = fetch("https://api.uomg.com/api/rand.qinghua");
    const user2 = fetch("https://api.uomg.com/api/rand.qinghua");
    return [user1, user2]
}

function main() {
    const user = getUserInfo()
    console.log(user)
}

function run(func) {
    // 保留原有fetch，发起请求时使用。
    const originalFetch = window.fetch;
    // 缓存结果
    const cache = []
    // 记录fetch调用的顺序，从而缓存多次fetch请求结果。(整条链路上可能有多个fetch调用，需要分别缓存)
    let i = 0
    // 改写fetch，当有异步操作时则中断fn执行，异步有结果时，重新执行fn，并将异步结果返回。
    window.fetch = (...args) => {
        // 命中缓存
        if (cache[i]) {
            const cacheData = cache[i];
            i++;
            if (cacheData.status === 'fulfilled') {
                return cacheData.data
            }
            if (cacheData.status === 'rejected') {
                return cacheData.err
            }
        } else {
            // 未命中缓存
            const result = {
                status: 'pending',
                data: null,
                err: null
            }
            cache[i] = result;
            throw originalFetch(...args).then(res => res.json()).then(res => {
                result.status = 'fulfilled';
                result.data = res
            }).catch(err => {
                result.status = 'rejected';
                result.err = err
            })
        }
    }
    const execute = () => {
        try {
            // i需要重置。因为fn可能是重新执行的，需要准确获取缓存。(改写后的fetch，类似React的hook，用调用顺序记录不同的state)
            i = 0;
            func()
        } catch (err) {
            // 捕获promise
            if (err instanceof Promise) {
                err.then(execute, execute)
            } else {
                // 将普通错误抛出去
                throw err
            }
        }
    }
    execute()
}

run(main)

// 代码的整体思路
// 1. 函数中有异步操作，使用throw中断函数的后续执行
// 2. 异步操作执行完毕后，缓存异步结果(一个异步操作对应一个缓存)
// 3. 重新执行函数，异步操作直接返回缓存内容
// 1. 怎么重新执行函数？(使用try catch ) 捕获错误，就可以在catch重新执行函数
// 2. 什么时机重新执行函数？(当异步有结果后，即Promise改变状态后，即可重新执行)


//4. 并发控制
function timeout(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve()
        }, time);
    })
}

class SuperTask {

    constructor(limit = 2) {
        // 最大并发数
        this.limit = limit
        // 正在进行的任务数量
        this.working = 0
        // 存放任务的数组
        this.tasks = []
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task,
                resolve,
                reject
            })
            this._run()
        })
    }

    _run() {
        while (this.working < this.limit && this.tasks.length) {
            this.working++
            const {
                task,
                resolve,
                reject
            } = this.tasks.shift()
            task().then(resolve, reject).finally(() => {
                this.working--;
                this._run()
            })
        }
    }
}

var superTask = new SuperTask()

function addTask(time, name) {
    superTask
        .add(() => timeout(time))
        .then(() => {
            console.log(`第${name}个任务完成了`)
        })
}
// output 2 3 1 4
// 一开始 1 2 进入队列
// 500ms时候， 2完成，输出 2，任务3进入队列
// 800ms时候， 3完成，输出 3，任务4进入队列
// 1000ms时候，1完成，输出 1
// 最后输出4
addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)

//5. 判断两个对象是否相同
var obj1 = { b: 2, a: 1, c: { a: 1, b: 2, d: { a: 1 } } };
var obj2 = { a: 1, b: 2, c: { b: 2, a: 1, d: { a: 0 } } };
const isObject = (item) =>
  Object.prototype.toString.call(item) === "[object Object]";
function equals(a, b) {
  console.log(a, b);
  if (isObject(a) && isObject(b)) {
    const keys1 = Object.keys(a),
      keys2 = Object.keys(b);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const iterator of keys1) {
      if (!keys2.includes(iterator)) {
        return false;
      }
    }
    for (const iterator of keys1) {
      if (!equals(a[iterator], b[iterator])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}
console.log(equals(obj1, obj2));