Function.prototype.myCall = function (ctx, ...args) {
  // 为了兼容传递 null,或者undefined的情况，此时 ctx 是 全局对象
  ctx = ctx == null || ctx === undefined ? globalThis : Object(ctx);
  const key = Symbol("temp");
  Object.defineProperty(ctx, key, {
    enumerable: false, //为了打印的时候不被枚举
    value: this,
  });
  const result = ctx[key](...args);
  return result;
};
