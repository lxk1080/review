// 一般递归
function factorial(n) {
  if (n === 0) {
    return 1
  }
  return n * factorial(n - 1)
}
console.log(factorial(4));

// 尾递归
function factorial2(n, total = 1) {
  if (n === 0) {
    return total
  }
  return factorial2(n - 1, n * total)
}

console.log(factorial2(4));