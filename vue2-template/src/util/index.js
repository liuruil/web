import { isEqual } from 'underscore';
import { v4 as uuidv4 } from 'uuid';

export const compareObjIsEqual = isEqual;

/**
 * @description: obj2混合obj1
 * @param {*} obj1
 * @param {*} obj2
 * @return {*} 新的对象
 */
export function mixinObj(obj1, obj2) {
    // const newObj = {}
    // for (const prop in obj2) {
    //     newObj[prop] = obj2[prop]
    // }
    // for (const prop in obj1) {
    //     if (!(prop in newObj)) {
    //         newObj[prop] = obj1[prop]
    //     }
    // }
    // return newObj
    return Object.assign({}, obj1, obj2);
}

/**
 * @description: 克隆
 * @param {*} obj 克隆的原始对象
 * @param {*Boolean} deep 是否是深度克隆
 * @return {*} 克隆后的对象
 */
export function clone(obj, deep) {
    // 先判断是不是数组
    if (Array.isArray(obj)) {
        if (deep) {
            // 如果深度克隆 递归数组
            const newArr = [];
            for (let index = 0; index < obj.length; index++) {
                newArr[index] = clone(obj[index], deep);
            }
            return newArr;
        }
        return [...obj];
    } else if (typeof obj === 'object') {
        const newObj = {};
        for (const prop in obj) {
            // 如果深度克隆 递归对象
            newObj[prop] = deep ? clone(obj[prop], deep) : obj[prop];
        }
        return newObj;
    }
    // 原始类型和函数直接返回
    return obj;
}

/**
 * @description: 函数防抖(高阶函数:函数的返回值是函数)
 * @param {*} callback 回调函数
 * @param {*} time 延迟时间
 * @return {*} 函数
 */
export function debounce(callback, time) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        const _args = arguments;
        timer = setTimeout(() => {
            callback.apply(null, _args);
        }, time);
    };
}


/**
 * @description: 函数节流
 * @param {*} callback 回调函数
 * @param {*} time 间隔时间
 * @param {*} immediately 是否立即执行
 * @return {*} 函数
 */
export function throttle(callback, time, immediately = true) {
    if (immediately) {
        let timer;
        return function () {
            console.log(this);
            if (!timer || (Date.now() - timer) >= time) {
                callback.apply(this, arguments);
                timer = Date.now();
            }
        };
    } else {
        let timer;
        return function () {
            if (timer) {
                return;
            }
            const _argus = arguments;
            timer = setTimeout(() => {
                callback.apply(null, _argus);
                timer = null;
            }, time);
        };
    }
}

/**
 * 根据id找到数组中的value为id的对象
 * @param {Number} id 
 * @param {Array} arr 
 * @param {String} childName 默认值是children
 * @returns null 或者 object
 */
export function getItemByArray(id, arr, childName = 'children', prop = 'id') {
    if (!arr) return null;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === id) {
            return arr[i];
        }
        const result = getItemByArray(id, arr[i][childName]);
        if (!result) {
            continue;
        }
        return result;
    }
    return null;
}


/**
 * @获取唯一的值
 */
export function getOnlyData() {
    return uuidv4();
}

/**
 * 
 * @param {Number} duration 延迟时间
 */
export function delay(duration = 500) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}



