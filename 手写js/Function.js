/**
 * 手写bind函数
 * @param {*} oThis this指向的对象
 * @returns 新的函数
 */
Function.prototype.bind = function (oThis) {
  if (typeof this !== "function") {
    // 与 ECMAScript 5 最接近的
    // 内部 IsCallable 函数
    throw new TypeError(
      "Function.prototype.bind - what is trying " +
        "to be bound is not callable"
    );
  }
  var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function () {},
    fBound = function () {
      console.log(this, oThis);
      return fToBind.apply(
        this instanceof fNOP && oThis ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

/**
 * 手写 call
 * @param {*} ctx 绑定的对象
 * @param  {...any} args 传递的参数
 * @returns
 */
Function.prototype.call = function (ctx, ...args) {
  // 为了兼容传递 null,或者undefined的情况，此时 ctx 是 全局对象
  ctx = ctx == null || ctx === undefined ? globalThis : Object(ctx);
  const key = Symbol("temp");
  Object.defineProperty(ctx, key, {
    enumerable: false, //为了打印的时候不被枚举
    value: this,
  });
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

/**
 * 柯里化函数
 * @param {*} fn
 * 它将一个接收多参数的函数转化为接收部分参数的函数。
 * 柯里化后的函数只传递部分参数来调用，并返回一个新的函数 去处理剩余的参数，是逐步传参的过程
 * @returns
 */
function curry(fn) {
  // 拿到剩余的参数数组
  const argus = [].slice.call(arguments, 1);
  const size = fn.length; //得到函数执行需要的参数
  return function () {
    const _argus = [].slice.call(arguments);
    const allArgus = [...argus, ..._argus];
    if (allArgus.length >= size) {
      //满足条件了
      return fn.apply(null, allArgus);
    } else {
      return curry.apply(null, [fn, ...allArgus]);
    }
  };
}
