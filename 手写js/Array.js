/**
 * 手写flat
 * @param {*} depth 拍扁的层数 默认为 1
 * @returns 新的数组
 */
Array.prototype.flat = function (depth = 1) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    this[i] &&
      (depth <= 0 || !Array.isArray(this[i])
        ? result.push(this[i])
        : result.push(
            ...this[i].flat(depth === "Infinity" ? "Infinity" : depth - 1)
          ));
  }
  return result;
};
