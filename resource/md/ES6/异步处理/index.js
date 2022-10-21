// function a() {
//     // setTimeout(res => {
//     //     console.log(b.data)
//     // }, 3000)
//     console.log(b.data)
// }
// try {
//     a()
// } catch (error) {
//     console.log(error, 133)
// }

// const p1 = new Promise((resolve, reject) => {
//     resolve({
//         then(cb, err) {
//             err(1)
//         }
//     })
// }).then(res => {
//     console.log(res)
// }, err => {
//     console.log('afasf')
// })


// polyfill安全的guard检查
// if (!Promise.wrap) {
// }

Promise.wrap = function (fn) {
    return function () {
        var args = [].slice.call(arguments);
        return new Promise(function (resolve, reject) {
            fn.apply(
                null,
                args.concat(function (err, v) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(v);
                    }
                })
            );
        });
    };
};

