/**
 * @desc 处理小数计算精度问题
 *  - 这里并没有使用传递小数精度作为参数的方式，因为实际应用中，我们也不知道究竟要余几位
 *  - 这里只写了加法和乘法，但是原理的话大都相似
 *    - 首先要先取到两个数字的小数位数，然后通过取最大或加法等组合方式，得到小数精度（要考虑下整数的情况）
 *    - 使用 toFixed 这个 API 传入小数精度，它自带有四舍五入的功能，例如：(0.299999).toFixed(1) === 0.3
 *    - 使用 parseFloat 去掉小数位后面无效的 0
 */

// 加法
function preciseAdd(num1, num2) {
  const str1 = String(num1)
  const str2 = String(num2)
  const precision1 = str1.includes('.') ? str1.length - str1.indexOf('.') - 1 : 0
  const precision2 = str2.includes('.') ? str2.length - str2.indexOf('.') - 1 : 0
  const precision = Math.max(precision1, precision2)

  const result = num1 + num2
  return parseFloat(result.toFixed(precision))
}

// 乘法
function preciseMultiply(num1, num2) {
  const str1 = String(num1)
  const str2 = String(num2)
  const precision1 = str1.includes('.') ? str1.length - str1.indexOf('.') - 1 : 0
  const precision2 = str2.includes('.') ? str2.length - str2.indexOf('.') - 1 : 0
  const precision = precision1 + precision2

  const result = num1 * num2
  return parseFloat(result.toFixed(precision))
}

/**
 * 测试代码
 */

console.log(preciseAdd(0.1, 0.2))
console.log(preciseAdd(1, 0.2))
console.log(preciseAdd(0.1, 0.02))
console.log(preciseAdd(0.05, 0.05))
console.log(preciseAdd(0.28, 0.01))
console.log(preciseAdd(1, 2))

console.log(preciseMultiply(0.1, 0.2))
console.log(preciseMultiply(1, 0.2))
console.log(preciseMultiply(0.1, 0.02))
console.log(preciseMultiply(0.28, 0.01))
console.log(preciseMultiply(1, 2))
