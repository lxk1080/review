
// 记住以下七句话，万变不离其宗

// Promise 函数本身是立即执行的，它不是异步的，它只是用来处理异步代码
// Promise 三种状态，pendding、resolved、rejected
// resolved 状态触发 then
// rejected 状态触发 catch
// then 和 catch 正常情况下返回 resolved 状态，遇到报错则返回 rejected 状态（很重要！），然后再由这个状态决定触发 then 或者 catch
// 当 then 里面 return 一个普通的字符串或数字时，下一个 then 中接收的就是这个字符串或数字，没有 return 的话，则是 undefined
// 当 then 里面 return 一个 Promise 时，下一个 then 或 catch 就会变成这个 Promise 的 then 和 catch，然后规则同上

// 测试一
// Promise.resolve().then(() => {
//   console.log(1);
// }).catch(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// });

// 测试二
// Promise.resolve().then(() => {
//   console.log(1);
//   throw new Error('error1');
// }).catch(() => {
//   console.log(2);
// }).then(() => {
//   console.log(3);
// });

// 测试三
// Promise.resolve().then(() => {
//   console.log(1);
//   throw new Error('error2');
// }).catch(() => {
//   console.log(2);
// }).catch(() => {
//   console.log(3);
// });

// 测试四

const p = new Promise((resolve) => {
  console.log('start');
  setTimeout(() => {
    resolve(789);
  }, 300);
});

Promise.resolve(123).then((data) => {
  console.log(data); // 123
}).then((data) => {
  console.log(data); // undefined
  return 456;
}).then((data) => {
  console.log(data); // 456
  return p;
}).then((data) => {
  console.log(data); // 789
  return Promise.resolve(1000);
}).then((data) => {
  console.log(data); // 1000
  return Promise.reject('end');
}).then((data) => {
  console.log('success:', data); // 不走这句
}).catch((err) => {
  console.log('err:', err); // end
  return '...';
}).then((data) => {
  console.log(data); // ...
});
