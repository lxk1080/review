
// 注意：需要放到浏览器环境运行，node环境执行结果有可能不同

// 提示 1：函数本身的执行还是同步的，并不是异步
// 提示 2：await 下面的代码，都可以看作是异步回调 callback 里的内容
// 提示 3：初始化 Promise，传入的函数会被立刻执行
// 提示 4：微任务在宏任务之前执行

// 据说是头条的面试题
async function async1() {
  console.log('async1 start');
  await async2();

  // await 后面的都作为回调内容，微任务-1
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');


// 下面是解析过程
// async function async1() {
//   console.log('async1 start'); // 2
//   await async2();
//
//   // await 后面的都作为回调内容，微任务-1
//   console.log('async1 end'); // 6
// }
//
// async function async2() {
//   console.log('async2'); // 3
// }
//
// console.log('script start'); // 1
//
// setTimeout(() => { // 宏任务-1
//   console.log('setTimeout'); // 8
// }, 0);
//
// async1();
//
// // 初始化 Promise 时，传入的函数会立刻被执行
// new Promise((resolve) => {
//   console.log('promise1'); // 4
//   resolve();
// }).then(() => { // 回调内容，微任务-2
//   console.log('promise2'); // 7
// });
//
// console.log('script end'); // 5


