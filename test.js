const pro = new Promise((resolve, reject) => {
    reject(1)
}).then(res => {
    console.log(res)
}, err => {
    return new Promise((resolve, reject) =>{
        console.log('哈哈哈')
        resolve(1111)
    })
})

setTimeout(() => {
    console.log(pro)
}, 1000);