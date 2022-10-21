<!-- 它只能是同步的，无法用于异步代码模式 -->

```js
function foo() {
  setTimeout(function () {
    baz.bar();
  }, 100);
}
try {
  foo();
  // 后面从 `baz.bar()` 抛出全局错误
} catch (err) {
  // 永远不会到达这里
}
```
