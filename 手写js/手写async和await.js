// 1. 实现 async await 的转换

// async function demo1() {
//   const data1 = await Promise.resolve(1);
//   const data2 = await Promise.resolve(2);
//   const data3 = await Promise.resolve(3);
//   return data1 + data2 + data3;
// }
// const result = demo1();
// result.then(console.log);

function delay(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

function* demo2() {
  const data1 = yield delay(1000);
  const data2 = yield delay(3000);
  const data3 = yield delay(5000);
  return data1 + data2 + data3;
}

function asyncGenerator(generator) {
  function handleValue(gen, resolve, result) {
    if (result.done) {
      return resolve(result.value);
    }
    Promise.resolve(result.value).then((res) => {
      const result = gen.next(res);
      handleValue(gen, resolve, result);
    });
  }
  return function () {
    //得到生成器
    const gen = generator();

    return new Promise((resolve) => {
      const result = gen.next();
      handleValue(gen, resolve, result);
    });
  };
}

const asyncFunc = asyncGenerator(demo2); //模拟 demo1
var result = asyncFunc();
result.then(console.log);
