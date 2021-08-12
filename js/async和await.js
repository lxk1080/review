
// async/await 和 Promise 的关系：

// 执行 async 函数，返回的是 Promise 对象
// await 相当于 Promise 的 then，处理不了 catch
// try...catch 可捕获异常，代替了 Promise 的 catch


// 测试一（async函数的返回值是什么？）
async function fn1() {
  // return 100; // 相当于 return Promise.resolve(100)，async 会自动封装成 Promise 对象
  return Promise.resolve(200);
}

const res1 = fn1();

console.log('res1', res1); // Promise 对象

res1.then((data1) => {
  console.log('data1', data1); // 200
});


// 测试二（await后面可以写Promise对象）
!(async function () {
  const p1 = Promise.resolve(300);
  const data2 = await p1; // await 相当于 Promise 的 then，返回数据 data，如上 res1.then
  console.log('data2', data2);
})();


// 测试三（await后面可以直接写数据）
!(async function () {
  const data3 = await 400; // 和 async 同理，相当于 await Promise.resolve(400)
  console.log('data3', data3);
})();


// 测试四（await后面可以写async函数，本质也是Promise对象）
!(async function () {
  const data4 = await fn1();
  console.log('data4', data4);
})();


// 测试五（如何使用try...catch）
!(async function () {
  const p5 = Promise.reject('err5');
  try {
    const data5 = await p5;
    console.log('data5', data5);
  } catch (err) {
    console.log('err5', err);
  }
})();


// 测试六（不使用try...catch，如果报错，直接停止运行, await相当于Promise的then，then是由resolved状态触发，对于rejected状态无法处理）
!(async function () {
  const p6 = Promise.reject('err6');
  const data6 = await p6;
  console.log('data6', data6);
})();


