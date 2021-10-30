/**
 * @description: obj2混合obj1
 * @param {*} obj1
 * @param {*} obj2
 * @return {*} 新的对象
 */
function mixinObj(obj1, obj2) {
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
    return Object.assign({}, obj1, obj2)
}

/**
 * @description: 克隆
 * @param {*} obj 克隆的原始对象
 * @param {*Boolean} deep 是否是深度克隆
 * @return {*} 克隆后的对象
 */
function clone(obj, deep) {
    // 先判断是不是数组
    if (Array.isArray(obj)) {
        if (deep) {
            // 如果深度克隆 递归数组
            const newArr = []
            for (let index = 0; index < obj.length; index++) {
                newArr[index] = clone(obj[index], deep)
            }
            return newArr
        }
        return [...obj]
    } else if (typeof obj === 'object') {
        const newObj = {}
        for (const prop in obj) {
            // 如果深度克隆 递归对象
            newObj[prop] = deep ? clone(obj[prop], deep) : obj[prop]
        }
        return newObj
    }
    // 原始类型和函数直接返回
    return obj
}
