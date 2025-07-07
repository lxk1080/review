/**
 * 注意：此方式不可用！
 * 以下使用闭包的写法有问题，不可用，由于 existArgs 闭包只有一个，所以在返回的函数多次使用时，
 * 闭包 existArgs 不会复原，只要有一次执行成功，existArgs 的长度就已经达到了原函数参数的长度，
 * 那你可能说，我执行成功后，将 existArgs 恢复成空数组不就行了吗？
 * 其实也不行，如果有多个地方同时使用，用一组数据还是行不通，
 * 正确的写法是使用下面的方式，返回一个新函数的方式，
 * 因为每次返回一个新函数，所以无论哪里使用，都互不干扰
 * @param fn
 */
export function curryErr(fn: Function) {
  let existArgs = []
  return function currtFn(...args: any[]) {
    existArgs = [...existArgs, ...args]
    if (existArgs.length >= fn.length) {
      return fn.apply(this, existArgs)
    } else {
      return currtFn
    }
  }
}

/**
 * 函数柯里化，分步传入参数、逐步调用（有需要用这个！）
 *  - 其实就是不断累积参数的过程，参数没达到原函数参数的长度就返回函数继续累积参数，一旦达到了原函数参数长度，就可以执行了
 * @param fn
 */
export function curry(fn: Function) {
  return function currtFn(...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(null, args)
    } else {
      return (...newArgs: any[]) => {
        return currtFn.apply(null, [...args, ...newArgs])
      }
    }
  }
}

/**
 * 测试代码
 */

function add(a: number, b: number, c: number): number {
  return a + b + c
}

// 此方法有问题，第二次调用时会报错，因为长度已经到了，直接执行，并不会再返回函数
// const curryAddErr = curryErr(add)
// console.log(curryAddErr(10)(20)(30)) // 60
// console.log(curryAddErr(10, 20)(30)) // 执行 curryAdd2(10, 20) 时，长度已经到了，直接执行，不会再返回函数，所以在执行后面 (30) 时，报错 is not a function

const curryAdd = curry(add)
console.log(curryAdd(10)(20)(30))
console.log(curryAdd(10, 20)(30))
console.log(curryAdd(10, 20, 30))
