// @ts-nocheck
/**
 * 其实就是返回一个函数，里面用 apply 做执行，一般来说就写这个就可以了！
 *  - 至于怎么手写 apply 和 call 方法，可以看下一个章节
 * @param context
 * @param args
 */
Function.prototype.customBind = function (context: any, ...args: any[]) {
  const self = this
  return function (...nextArgs: any[]) {
    return self.apply(context, [...args, ...nextArgs])
  }
}

/**
 * 单元测试
 */

function fn(a: number, b: number, c: number) {
  console.log(typeof this, this, a, b, c)
}

const obj = { x: 1 }

// 以下正常运行，可以发现，当上下文为数字 5 的时候，打出来的 this 是引用类型的 Number 5，说明 apply 其内部做了转化
const fn1 = fn.customBind(obj, 10)
fn1(20, 30)
const fn11 = fn.customBind(5, 10, 20, 30)
fn11()
