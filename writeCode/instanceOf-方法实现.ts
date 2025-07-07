/**
 * 原理就是顺着原型链一层一层往上找
 *  - 注意：null 和 undefined 不是任何对象的实例，另外，基本值类型，字面量形式，也不是其 Number、String、Boolean 的实例
 *  - instanceOf 只适用于引用类型
 * @param a
 * @param b
 */
const myInstanceOf = (a: any, b: any) => {
  // 在双等下，undefined 也等于 null
  if (a == null) return false
  const type = typeof a
  if (type !== 'object' && type !== 'function') {
    return false
  }
  let p = a
  while(p) {
    if (p === b.prototype) {
      return true
    }
    p = p.__proto__
  }
  return false
}

/**
 * 测试代码
 */

console.log(myInstanceOf([], Array)) // true
console.log(myInstanceOf({}, Object)) // true
console.log(myInstanceOf(()=>{}, Function)) // true
console.log(myInstanceOf(null, Object)) // false
console.log(myInstanceOf(123, Number)) // false
console.log(myInstanceOf('abc', String)) // false
console.log(myInstanceOf(true, Boolean)) // false
