
// 记住以下四句话，万变不离其宗

// Promise 三种状态，pendding、resolved、rejected
// resolved 状态触发 then
// rejected 状态触发 catch
// then 和 catch 正常情况下返回 resolved 状态，遇到报错则返回 rejected 状态（很重要！），然后再由这个状态决定触发 then 或者 catch。

// 测试一
Promise.resolve().then(() => {
  console.log(1);
}).catch(() => {
  console.log(2);
}).then(() => {
  console.log(3);
});

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


