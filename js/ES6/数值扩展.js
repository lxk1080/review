{
  // 二进制表示
  console.log(0b0111110111) // 503
  // 八进制表示
  console.log(0o767) // 503
}

{
  // 判断一个数是否有限
  console.log(Number.isFinite(10)) //true
  console.log(Number.isFinite(10/0)) // false
  console.log(Number.isFinite(NaN)) // false

  // 判断一个数是否NaN
  console.log(Number.isNaN(NaN)) // true
  console.log(Number.isNaN(10)) // false
}

{
  // 判断一个数是不是一个整数
  console.log(Number.isInteger(10)) // true
  console.log(Number.isInteger(10.0)) //true
  console.log(Number.isInteger(10.1)) // false
  console.log(Number.isInteger('a')) // false
}

{
  // 判断一个数是否在-2的53次方和2的53次方之间
  console.log(Number.MAX_SAFE_INTEGER) // 上限
  console.log(Number.MIN_SAFE_INTEGER) // 下限
  console.log(Number.isSafeInteger(10)) // true
  console.log(Number.isSafeInteger(9007199254740991 + 1)) // false
  console.log(Number.isSafeInteger('a')) // false
}

{
  // 返回一个小数的整数部分
  console.log(Math.trunc(5.1)) // 5
  console.log(Math.trunc(5.9)) // 5
}

{
  // 判断一个数是正数、负数还是0
  console.log(Math.sign(-5)) // -1
  console.log(Math.sign(0)) // 0
  console.log(Math.sign(5)) // 1
  console.log(Math.sign('a')) // NaN
}

{
  // 得到一个数的立方根
  console.log(Math.cbrt(27))
  console.log(Math.cbrt(-1))
}
