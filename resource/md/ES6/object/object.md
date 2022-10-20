## 计算属性名

```js
let prop1 = "name";
let prop2 = "age";
const obj = {
  [prop1]: "刘睿",
  [prop2]: "18",
};
console.log(obj[prop1], obj[prop2]); // 刘睿 18
```

## 对象的静态方法 新增的 API

- Object.is()//用于判断两个数据是否严格性等
  -- Object.is(NaN,NaN) //true
  -- Object.is(+0 , -0) //false 因为符号位不同

- Object.assign() //用于混合对象

```js
let obj1 = { a : 1}
let obj2 = {b :2}
const obj = Object.assgin(obj1,obj2)
console.log(obj === obj1) //true
原因:使用 Object.assgin(obj1,obj2) 会改变第一个参数所传递的的对象 意思就是返回值就是一个的参数混合后的结果
使用场景 对象的浅克隆  const obj = Object.assgin({},obj2) //克隆obj2
```

- Object.getOwnPropertyNames
  -- 返回枚举顺序 返回一个数组

```js
const obj = {
    a : 1,
    b : 2,
    c : 3,
    0 : 4,
    2 : 5,
    1 : 6
}
Object.getOwnPrototyNames(obj)  // ['0' , '1' , '2' , 'a' ,'b' , 'c']
通过枚举方式的属性排序
排序方法: 先排数字(升序) 再排其他(书写顺序)
```

- Object.setPrototypeOf() //修改原型
  -- 返回枚举顺序 返回一个数组

```js
const obj = {
  a: 1,
  b: 2,
};
const obj1 = {
  c: 3,
  d: 4,
};
Object.setPrototypeOf(obj, obj1); //  obj.__proto__ = obj2
```

## 面向对象的简介

面向对象是一种编程思想 和具体的语言没有太大的关系

- 面向过程 :思考的切入点是功能的步骤
- 面向对象 :思考的切入点是对象的划分
