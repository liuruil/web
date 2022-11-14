var arr = [
    'apple',
    'strawberry',
    'banana',
    'pear',
    'apple',
    'orange',
    'orange',
    'strawberry'
];

const index = arr.findIndex(
    (item, index) => {
        return item === 'apple'
    }
)
console.log(index)

console.log(arr.indexOf('apple'))




const newArr = arr.filter(function (item, index) {
    return arr.indexOf('apple') === index
})

// console.log(newArr)