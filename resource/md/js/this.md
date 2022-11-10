# this 的优先级



##  call、apply与bind的区别

```
call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。
```

##  **call apply的区别**

```
他们俩之间的差别在于参数的区别，call和apply的第一个参数都是要改变上下文的对象，而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。
```

## 基本逻辑

> 判断 this
>
> 根据优先级来判断函数在某个调用位置应用的是哪条规则。
>
> 1. 函数是否在 new 中调用(new 绑定
>    - 如果是的话 this 绑定的是新创建的对象。 var bar = new foo()
> 2. 函数是否通过 call、apply (显式绑定)或者硬绑定调用?
>    - 如果是的话，this 绑定的是指定的对象。
> 3. 函数是否在某个上下文对象中调用(隐式绑定)?
>    - 如果是的话，this 绑定的是那个上下文对象。
> 4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。

**对于正常的函数调用来说，理解了这些知识你就可以明白 this 的绑定原理了**。

## 特殊情况

###  null 或者 undefined 

>非严格模式下，null 或者 undefined 作为 this 的绑定对象传入 call、apply 或者 bind,这些值 在调用时会被忽略，实际应用的是默认绑定规则

```javascript
// 把数组“展开”成参数 foo.apply( null, [2, 3] ); // a:2, b:3
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// 使用 bind(..) 进行柯里化
var bar = foo.bind(null, 2);
bar(3); // a:2, b:3
```

> 1. 如果函数并不关心 this 的话，仍然需要传入一个占位值 null 可能是一个不错的选择。
> 2. 在 ES6 中，可以用 ... 操作符代替 apply(..) 来“展 开”数组，foo(...[1,2]) 和 foo(1,2) 是一样的，这样可以避免不必要的 this 绑定。

**可惜，在 ES6 中没有柯里化的相关语法，因此还是需要使用 bind(..)**

### 更安全的this

> 如果某个函数确实使用了 this（比如第三方库中的一个函数），那默认绑定规则会把 this 绑定到全局对象（在浏览 器中这个对象是 window），这将导致不可预计的后果（比如修改全局对象）。

```javascript
// 更安全的this
// 把 this 绑定到这个对象不会对你的程序 产生任何副作用。
// 就像网络（以及军队）一样，我们可以创建一个“DMZ”（demilitarized zone，
// 非军事区）对象

function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}
// 我们的 DMZ 空对象
var ø = Object.create(null); // 把数组展开成参数
foo.apply(ø, [2, 3]); // a:2, b:3
// 使用 bind(..) 进行柯里化
var bar = foo.bind(ø, 2);
bar(3); // a:2, b:3
```

**使用变量名 ø 不仅让函数变得更加“安全”，而且可以提高代码的可读性，因为 ø 表示 “我希望 this 是空”，这比 null 的含义更清楚。不过再说一遍，你可以用任何喜欢的名字 来命名 DMZ 对象。**

###  间接引用

```javascript
function foo() {
  console.log(this.a);
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2

// 赋值表达式 p.foo = o.foo 的返回值是目标函数的引用，
// 因此调用位置是 foo() 而不是 p.foo() 或者 o.foo()。
// 根据我们之前说过的，这里会应用默认绑定。
```

**对于默认绑定来说，决定 this 绑定对象的并不是调用位置是否处于严格模式，而是 函数体是否处于严格模式。如果函数体处于严格模式，this 会被绑定到 undefined，否则 this 会被绑定到全局对象。**

###  软绑定

> 硬绑定这种方式可以把 this 强制绑定到指定的对象（除了使用 new 时），防止函数调用应用默认绑定规则。问题在于，硬绑定会大大降低函数的灵活性，使 用硬绑定之后就无法使用隐式绑定或者显式绑定来修改 this。

```javascript
// 如果可以给默认绑定指定一个全局对象和 undefined 以外的值，
// 那就可以实现和硬绑定相 同的效果，
// 同时保留隐式绑定或者显式绑定修改 this 的能力。
Function.prototype.softBind = function (obj) {
  var fn = this; // 捕获所有 curried 参数
  var curried = [].slice.call(arguments, 1);
  var bound = function () {
    return fn.apply(
      !this || this === (window || global) ? obj : this,
      curried.concat.apply(curried, arguments)
    );
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
};

// 它会对指定的函 数进行封装，首先检查调用时的 this，
// 如果 this 绑定到全局对象或者 undefined，那就把 指定的默认对象 obj 绑定到 this，
// 否则不会修改 this

function foo() {
  console.log("name: " + this.name);
}
var obj = { name: "obj" },
  obj2 = { name: "obj2" },
  obj3 = { name: "obj3" };
var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！
fooOBJ.call(obj3); // name: obj3 <---- 看！
setTimeout(obj2.foo, 10); // name: obj <---- 应用了软绑定
```
