# Promise 详解

## promise 出现的原因

- 提供了异步操作的规范
- 解决了回调地狱

```javascript

  两种阶段   (未决)                                 (已决)
          unsettled                              settled

  三种状态    挂起                          完成                 失败
          (pending)                    (resolve)            (reject)


        异步执行的全过程              拿到结果，无论结果如何     其他的外界因素
```

## promise 基本用法

> 成功时调用.then 失败时调用.catch 不管失败或者成功最后都调用.finally

```javascript
var p1 = new Promise((resolve, reject) => {
  var flag = true;
  if (flag) {
    resolve("成功了");
  } else {
    reject("失败了");
  }
});
p1.then((val) => {
  console.log(val);
})
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    //没有数据
    console.log("完成了"); //无论结果如何都会执行
  });
```

## promise 的注意点

- promise 对象本身是立即执行的(同步代码)
- promise.then() 和 promise.catch() 一定是异步函数,放在微队列中执行
- Promise 没有消除回调，只是让回调变得可控
- 状态和阶段变化是不可逆的 一旦从未决推向已决 无法重新改变状态
  - 所有企图改变状态的代码都将失效
- 以下代码会让任务进入 **rejected(失败)** 状态
  - 调用 reject
  - 代码执行报错
  - 抛出错误

## promise 的串联(链式调用)

- 当后续的 Promise 需要用到之前的 Promise 的处理结果需要用到串联
- 后续的 Promise 一定会等到前面的 Promise 有了后续处理结果后，才会变成已决状态
- Promise 对象中无论 then 方法还是 catch 方法，它们都具有返回值
  - 返回的是一个全新的 Promise 对象 **返回值**就是这个新的 Promise.then 的参数值
- 如果当前的 Promise 是未决的，得到的新的 Promise 是挂起状态
- 如果当前的 Promise 是已决的，会影响后续处理函数，并且将后续处理结果(返回值)作为 resolved 状态数据，应用到新的 Promise 中
- 如果后续处理函数发生错误，则把错误信息作为 rejected 状态数据 应用到新的 Promise 中
- 如果 then 的参数不是一个函数，则这个 promise 的状态和之前保持一致

> 注意事项
>
> 1. then 方法必定会返回一个新的 Promise
>    - 可理解为后续处理也是一个任务
> 2. 新任务的状态取决于后续处理
>    - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据
>    - 若有后续的处理，但还未执行，新任务挂起
>      - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
>      - 后续处理执行有错，新任务的状态为失败，数据为异常对象
>      - 后续处理返回一个新的任务对象，新任务的状态和数据与该任务对象一致

## 野生 promise

> 什么是野生的 Promise
>
> Promise 领域，一个重要的细节是如何确定某个值是不是真正的 Promise。既然 Promise 是通过 new Promise(..) 语法创建的，那你可能就认为可以通过 p instanceof Promise 来检查这并不足以作为检查方法，
>
> 原因如下
>
> 其中最主要的是，Promise 值可能是从其他浏览器窗口（iframe 等）接收到的。这个浏览器窗口自己的 Promise 可能和当前窗口 /frame 的不同，因此这样的检查无法识别 Promise 实例。
>
> 还有，库或框架可能会选择实现自己的 Promise，而不是使用原生 ES6 Promise 实现。实际上，很有可能你是在早期根本没有 Promise 实现的浏览器中使用由库提供的 Promise。
> 因此，识别 Promise（或者行为类似于 Promise 的东西）就是定义某种称为 thenable 的东西，将其定义为任何具有 then(..) 方法的对象和函数。我们认为，任何这样的值就是 Promise 一致的 thenable。
>
> 根据一个值的形态（具有哪些属性）对这个值的类型做出一些假定。这种类型检查（type check）一般用术语鸭子类型（duck typing）来表示——“如果它看起来像只鸭子，叫起来像只鸭子，那它一定就是只鸭子”。于是，对 thenable 值的鸭子类型检测就大致类似于：只要实现了 thenable 接口

```javascript
/**
 * 判断数据是不是Promise
 */
function isThenable() {
  if (
    p !== null &&
    (typeof p === "object" || typeof p === "function") &&
    typeof p.then === "function"
  ) {
    // 假定这是一个thenable!
    return true;
  } else {
    // 不是thenable
    return false;
  }
}
```

> 通常 thenable 的可靠性要低于真正的 Promise。

```javascript
const thenable = {
  then(fulfilled) {
    // 每100ms调用一次fulfilled(..)，直到永远
    setInterval(fulfilled, 100);
  },
};
```

> 如果接收到了这个 thenable，并通过 thenable.then() 把它链接起来,很可能你会吃惊地发现自己的完成处理函数会被重复调用，而正常的 Promise 应该只会决议一次。
>
> 最可能出现的误用 thenable 的情况，是那些使用了 then 方法，但是并没有严格遵循 Promise 风格的异步库——确实有几个这样的“野生”库。
>
> 解决方法: 用 **Promise.resolve(thenable)** 包裹野生 Promise，确保只决议一次

## Promise 的其他 API 静态成员(构造函数成员)

- Promise.all([p1,p2,p3]) 里面的参数是数组 数组中是 promise 对象 执行队列

  - 接受一个或多个值的数组（比如，立即值、Promise、thenable(野生 Promise)）
  - 这个方法返回一个新的 Promise 对象，该 Promise 对象在只有当参数中所有的 Promise 都成功的时候才会触发，
  - 一旦有任何一个失败则触发该 promise 的失败
  - 这个新的 promise 对象在触发成功状态以后，会把一个包含参数中所有 Promise 返回值的数组作为成功回调的返回值，顺序跟参数中的保持一致，
  - 如果失败，会把第一个触发失败的 promise 对象的错误信息作为他的失败信息常用来处理多个 promise 对象的状态集合

- Promise.race([p1,p2])

  - 当参数中任意一个子 promise 失败或者成功后，父 promise 马上也会用此 promise 的成功返回值或失败详情作为参数调用父 promise 绑定相应的句柄，斌返回该 promise 对象

- Promise.resolve(1)

  - 直接返回一个 resolve 状态的 Promise 参数就是数据
  - 如果直接传递参数为一个 Promise 对象 pro1 则 Promise.resolve(pro1) === pro1

- Promise.reject(1)
  - 直接返回一个 reject 状态的 Promise 参数就是数据

## async

- async 目的是简化在函数的返回之中对 promise 的创建

> async 用于修饰函数(无论是函数字面量还是函数表达式)，放置在函数最开始的位置，被修饰的函数一定返回一个 promise 对象

```javascript
async function test() {
  return 1; //该函数的返回值是promise完成后的数据
}
test(); // Promise{ 1 }

async function test2() {
  return Promise.resolve(1); // 若返回的是promise，则test2的返回结果和promise状态保持一致
}
test2(); // Promise{ 1 }

async function test3() {
  throw new Error("出错了"); // 若执行过程报错，则test2的返回结果状态是rejected
}
test3(); // Promise{ <rejected> Error('出错了') }
```

## await

- 等待 Promise 完成
- await 关键字必须出现在 async 函数中
- 如果 await 修饰的不是 Promise 则会使用 Promise.resolve 包装后按规则运行
  - await 关键字期待(但实际上并不要求)一个实现了**thenable**接口的对象，但常规值也可以，
  - 如果是实现 thenable 接口的对象，则这个对象可以由 await 关键字 **解包**
  - 如果不是，这个值就被当作已解决的期约。
- await 捕捉不到错误的情况
  - 如果有错误情况 可以用 try catch 捕捉

```javascript
async function test() {
  const n = await Promise.resolve(1);
  console.log(n);
}

// 上边的函数等效于

function test() {
  return new Promise((resolve, reject) => {
    Promise.resolve(1).then((n) => {
      console.log(n);
      resolve();
    });
  });
}
```

```javascript
async function test1() {
  const result = await "foo";
  console.log(result);
}
test1(); // 打印 foo

const thenable = {
  then(callback) {
    setTimeout(() => {
      callback(123);
    }, 3000);
  },
};

async function test2() {
  const result = await thenable;
  console.log(result);
}
test2(); // 3秒后打印 123
```
