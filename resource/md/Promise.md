# Promise

## await

> await 关键字期待(但实际上并不要求)一个实现了**thenable**接口的对象，
> 但常规值也可以，如果是实现 thenable 接口的对象，则这个对象可以由 await 关键字 **解包**。
> 如果不是，这个值就被当作已解决的期约。

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

## 野生 promise 的处理

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

## Promise 静态方法

- Promise.all([...])

  - 接受一个或多个值的数组（比如，立即值、Promise、thenable(野生 Promise)）

- Promise.resolve() 创建了一个决议到传入值的 promise
- Promise.reject() 创建了一个拒绝到传入值的 promise
