# Promise  

## promise出现的原因:
- 提供了异步操作的规范 
- 解决了回调地狱
```js
        两种阶段    三种状态
     (未决)                                (已决)
   unsettled                              settled

     挂起                         完成                失败 
  (pending)                    (resolve)            (reject)  


异步执行的全过程          拿到结果，无论结果如何     其他的外界因素
```

## promise基本用法
> 成功是调用.then  失败时调用.catch  不管失败或者成功最后都调用.finally
```js
var p1 =  new Promise((resolve,reject) =>{
    var flag = true
    if(flag){
        resolve('成功了')
    }else{
        reject('失败了')
    }
})
p1.then(val =>{
    console.log(val)
}).catch(err =>{
    console.log(err)
}).finally(()=>{ //没有数据
    console.log('完成了') //无论结果如何都会执行
})
```

## promise的注意点

1. 状态和阶段变化是不可逆的  一旦从未决推向已决  无法重新改变状态（所有企图改变状态的代码都将失效）
2. 以下代码会让任务到达reject状态
- 调用reject
- 代码执行报错
- 抛出错误
3. 得到一个promise对象后  后续处理( .then() 和 .catch() 一定是异步函数,放在微队列中执行) 而 promise对象本身是立即执行的(同步代码)
4. **Promise没有消除回调，只是让回调变得可控**


## promise的串联
当后续的Promise需要用到之前的Promise的处理结果需要用到串联
注意点:Promise对象中无论then方法还是catch方法，它们都具有返回值，返回的是一个全新的Promise对象   返回值就是全新的Promise.then的参数值
1. 如果当前的Promise是未决的，得到的新的Promise是挂起状态
2. 如果当前的Promise是已决的，会影响后续处理函数，并且将后续处理结果(返回值)作为resolved状态数据，应用到新的Promise中；如果后续处理函数发生错误，则把返回值作为rejected状态数据 应用到新的Promise中
3. 后续的Promise一定会等到前面的Promise有了后续处理结果后，才会变成已决状态



## Promise的其他API 静态成员(构造函数成员)

1. Promise.all([p1,p2,p3]) 里面的参数是数组 数组中是promise对象 执行队列 
```js
这个方法返回一个新的Promise对象，该Promise对象在只有当参数中所有的Promise都成功的时候才会触发，一旦有任何一个失败则触发该promise的失败 这个新的promise对象在触发成功状态以后，会把一个包含参数中所有Promise返回值的数组作为成功回调的返回值，顺序跟参数中的保持一致，如果失败，会把第一个触发失败的promise对象的错误信息作为他的失败信息
常用来处理多个promise对象的状态集合
```

2. Promise.race([p1,p2])
```js
当参数中任意一个子promise失败或者成功后，父promise马上也会用此promise的成功返回值或失败详情作为参数调用父promise绑定相应的句柄，斌返回该promis对象
```

3. Promise.resolve(1)  
  - 直接返回一个resolve状态的Promise  参数就是数据
  - 如果直接传递参数为一个Promise对象pro1  则Promise.resolve(pro1) === pro1

4. Promise.reject(1)   
  - 直接返回一个reject状态的Promise 参数就是数据


## async await
- async 目的是简化在函数的返回之中对promise的创建

async 用于修饰函数(无论是函数字面量还是函数表达式)，
放置在函数最开始的位置，被修饰的函数一定返回一个promise对象
```js
async function test(){
  console.log(1)
  return 2
}
// 等效于
function test(){
    return new Promise((resolve,reject)=>{
        console.log(1)
        resolve(2)
    })
}
```
- await  等待
await 关键字必须出现在 async 函数中

如果await 修饰的不是Promise  则会使用Promise.resolve包装后按规则运行
await 捕捉不到错误的情况
如果有错误情况 可以用try catch 捕捉





