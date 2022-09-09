## Reflect 反射

> Reflectd 对象有很多静态方法 为了减少魔法 (函数式编程的影响)

```js
ReflectAPI的介绍
1:Reflect.set(target,propertyKey,value) 给对象的属性赋值
设置对象target的属性propertyKey的值为value
var obj = {
  a : 5
}
Reflect.set(obj,'a',10) //改变 obj.a = 10

2:Reflect.get(target,propertyKey) 读取对象的属性
var obj = {
  a : 5
}
console.log(Reflect.get(obj,'a'))  //结果为5

3:Reflect.apply(target,thisArgument,argumentList) 函数调用
第一个参数表示函数名称 第二个参数绑定this指向 第三个参数表示参数列表
function func(a,b){
  console.log(a,b)
}
Reflect.apply(func,null,[3,5]) // 输出结果 3,5

4:Reflect.deleteProprty(target,propotyKey) 删除对象的属性
var obj = {
   a :5
}
Reflect.deleteProprty(obj,'a')
console.log(obj) // {}

5:Reflect.construct(target,argumentList) 用构造函数创建一个对象
fungtion Person(name , age){
  this.name = name ,
  this.age =  age
}
const liurui = Reflect.construct(Person,['刘睿','18'])
console.log(liurui)// 结果 {name:'刘睿’,age:'18}

5:Reflect.has(target,propotyKey) //判断对象是否含有一个属性
var obj = {
   a:5
}
console.log(Reflect.has(obj,'a')) //结果  true
```
