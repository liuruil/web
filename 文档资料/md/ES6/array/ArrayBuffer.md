## ArrayBuffer  
作用:创建一个储存一块固定内存大小的数据
```js
  var arr = new ArrayBuffer(字节数)
1: 属性 arr.btyeLenght  //得到字节数
2: 方法 arr.slice()     // 切割此对象形成一个新的 ArrayBuffer

``` 
- 读写ArrayBuffer

1:  dataView
通常在需要混用多种储存格式时使用

2:  类型化数组
实际上 每一个类型化数组都对应一个ArrayBuffer 如果没有手动指定ArrayBuffer
类型化数组创建时 会先建一个ArrayBuffer
```js
var bf = new ArrayBuffer(10) //10个字节的空间
var arr = new Int8Array(bf)  对应一个字节  操作每一位
var arr = new Int16Array(bf)  对应两个字节 操作每一位
可以通过 arr 直接操作 bf 
```
