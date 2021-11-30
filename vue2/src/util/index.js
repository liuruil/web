/**
 * @description:函数防抖
 * @param {*}
 * @return {*}
 */
export const debounce = function () {
  const fn = Array.prototype.shift.call(arguments)
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...arguments)
    }, 300)
  }
}
