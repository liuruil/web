// 将类的形式转化为构造函数的形式
"use strict";
function Test(name) {
  if (!(this instanceof Test)) {
    throw new TypeError(
      "Class constructor Test cannot be invoked without 'new'"
    );
  }
  this.name = name;
}

Object.defineProperty(Test.prototype, "say", {
  value() {
    if (!(this instanceof Test)) {
      throw new TypeError("a.say is not a constructor");
    }
    console.log(1);
  },
  enumerable: false, //默认就是false
});

// 1. 类的所有代码均在严格模式下执行
// 2. 类的所有方法都是不可枚举的
// 3. 类的所有方法都无法当成构造函数使用
// 4. 类的构造器必须使用 new 调用
class Test {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(1);
  }
}
