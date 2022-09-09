## Proxy 代理

代理: 提供了修改底层实现的方式 通过 Reflect

```js
//代理一个目标对象
//target:目标对象
//handler 是一个普通对象 其中可以重写底层实现
// 返回一个代理对象
new Proxy(target, handler);
举例;
obj = {
  a: 1,
  b: 2,
};
var proxy = new Proxy(obj, {
  set(target, propotyKey, value) {
    Reflect.set(target, propotyKey, value);
  },
  get(target, propotyKey) {
    if (Reflect.has(target, propotyKey)) {
      return Reflect.get(target, propotyKey);
    } else {
      return -1;
    }
  },
});
console.log(proxy.d); //结果 -1
```

## 代理的应用

- 观察者模式

```js
function observer(target) {
  //vue3源码实现响应式的伪代码
  const div = document.getElementById("container");
  const proxy = new Proxy(target, {
    set(target, propotyKey, value) {
      Reflect.set(target, propotyKey, value);
      render();
    },
    get(target, propotyKey) {
      Reflect.get(target, propotyKey);
    },
  });
  render();
  function render() {
    for (const prop of Object.keys(target)) {
      let html = "";
      html += `
            <p><span>${prop}：</span><span>${target[prop]}</span></p>
            `;
      div.innerHTML = html;
    }
  }
  return proxy;
}
var target = {};
var obj = observer(target);
```
