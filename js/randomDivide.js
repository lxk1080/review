function randomDivide(total, nums) {
  let rest = total;
  const result = Array.apply(null, {length: nums}) // [undefined, undefined, ...]
    .map((n, i) => nums - i) // 如果nums = 10， 则得到 [10, 9, 8, 7, ...]
    .map(n => {
      // 这里最小分到1
      const v = 1 + Math.floor(Math.random() * (rest / n * 2 - 1));
      rest -= v;
      return v;
    });
  // 把剩余的都给最后一个
  result[nums - 1] += rest;
  return result.toString()
}

console.log(randomDivide(10, 10))
console.log(randomDivide(100, 10))

// =========================关于call/apply的第一个参数=========================
function fn() {
  console.log(this)
}
// 数字
fn.call(1) // this --> 1，this.__proto__ = Number.prototype
// 字符串
fn.call('a') // this --> 'a'，this.__proto__ = String.prototype
// 布尔
fn.call(true) // this --> true，this.__proto__ = Boolean.prototype
// 对象
fn.call({'name': 'obj'}) // this --> {'name': 'obj'}，this.__proto__ === Object.prototype

// apply方法从es5开始第二个参数支持array-like的object（类数组对象），所有array-like都有length属性
// 这里估计做了一个隐式的转换：[].slice.call({length: 5})
// call/apply第一个参数为null/undefined时，this指向浏览器window对象，其他环境时指向global对象
const arr = Array.apply(null, {length: 5})
console.log(arr) // [ undefined, undefined, undefined, undefined, undefined ]