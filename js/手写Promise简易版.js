
// 只是简单的写下基本实现，没能实现 then 函数链式调用

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(executor) {
  var _this = this;
  this.state = PENDING; // 状态
  this.value = undefined; // 成功结果
  this.reason = undefined; // 失败原因

  this.onFulfilled = [];// 成功的回调
  this.onRejected = []; // 失败的回调

  function resolve(value) {
    if(_this.state === PENDING){
      _this.state = FULFILLED
      _this.value = value
      _this.onFulfilled.forEach(fn => fn(value))
    }
  }
  function reject(reason) {
    if(_this.state === PENDING){
      _this.state = REJECTED
      _this.reason = reason
      _this.onRejected.forEach(fn => fn(reason))
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if(this.state === FULFILLED){
    typeof onFulfilled === 'function' && onFulfilled(this.value)
  }
  if(this.state === REJECTED){
    typeof onRejected === 'function' && onRejected(this.reason)
  }
  if(this.state === PENDING){
    typeof onFulfilled === 'function' && this.onFulfilled.push(onFulfilled)
    typeof onRejected === 'function' && this.onRejected.push(onRejected)
  }
};



// 以下是测试 -----------------------------------------------------------------------------------------------------------

const mp = new MyPromise((resolve, reject) => {
  setTimeout(function() {
    resolve(100)
  }, 2000)
})

mp.then((data) => {
  console.log(data)
})

// 附加 ----------------------------------------------------------------------------------------------------------------

class Test {
  constructor(fn) {
    this.fn = fn;
    this.status = 1;

    this.init();
  }

  init() {
    this.fn(this.resolve.bind(this)) // 使用 ES6 类的方式要注意：传递 resolve 的时候要 bind 指定作用域
  }

  resolve() {
    this.status = 2;
  }
}
