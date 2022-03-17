## 数组新增的API

### 数组的静态方法
- Array.of()
```js
作用: 根据传入的参数 创建一个新数组 
Array.of(1,2,3,2)  //返回结果 [1,2,3,2]
产生此API的原因:  
new Array() 虽然也可以创建数组 但是传一个参数时代表的是数组的长度 
Array.of()  传一个参数就没有这样的问题
```

- Array.from()
```js
把一个类数组或者可迭代对象 转化为数组
```


### 数组的实例方法

- find(callback)
```js
var arr = [ { id : 1 },{ id : 2 }]
arr.find(item => item.id === 1 ) // 如果有满足条件的项 返回该项 否则返回undefined
```

- findIndex(callback)
```js
var arr = [ { id : 1 },{ id : 2 }]
arr.findIndex( item => item.id === 1 ) // 如果有满足条件的项 返回该项的索引 否则返回 -1

注意点  indexOf   lastIndexOf  不能传递回调函数  
```
- fill()
```js
// 填充数组
var arr = new Array(100)
arr.fill('abc')  //数组的每一项都为 'abc' 
```

- copyWithin(a,b,c)
```js
// 复制原数组 返回原数组
参数意思: a : 表示从哪一位索引开始改变 b:表示从哪一位开始复制 c:表示从哪一位结束复制
var arr = [1,2,3,4,5,6]
arr.copyWithin(2)  //  [1,2,         1,2,3,4]
arr.copyWithin(2,1)  //  [1,2,      2,3,4,5]
arr.copyWithin(2,1,3)  //  [1,2,    2,3,   5,6]
```

- includes()
```js
// 判断数组中是否包含某一项 
var arr = [NaN,1,2,3]
arr.includes(NaN)   // true 
注意点: 内部实现的方式使用 Object.is() 实现
```