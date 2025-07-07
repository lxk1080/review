// @ts-nocheck
/**
 * 其实就是在要绑定的上下文上挂载这个方法，然后执行这个方法，这时此方法的 this 就指向这个上下文了
 *  - 注意几个点
 *    - 当上下文为 null 或 undefined 时，this 为 window 对象，我们可以使用 globalThis 指代，在浏览器为 window，在 nodejs 中为 global 对象
 *    - 当上下文不为引用类型时，也就是值类型的时候，需要做层转换，转成引用类型
 *    - 添加 key 可以使用 symbol，以免造成属性覆盖，用完之后及时销毁
 */
Function.prototype.customCall = function (context: any, ...args: any[]) {
  if (context == null) context = globalThis
  if (typeof context !== 'object') context = new Object(context)
  const fnKey = Symbol()
  context[fnKey] = this
  const res = context[fnKey](...args)
  delete context[fnKey]
  return res
}

// 实现 apply 除了参数是数组，其它不变
Function.prototype.customApply = function (context: any, args: any[] = []) {
  if (context == null) context = globalThis
  if (typeof context !== 'object') context = new Object(context)
  const fnKey = Symbol()
  context[fnKey] = this
  const res = context[fnKey](...args)
  delete context[fnKey]
  return res
}

/**
 * 单元测试
 */

function fn(a: number, b: number, c: number) {
  console.log(typeof this, this, a, b, c)
}

const obj = { x: 1 }

// customCall 打印的时候我们发现，symbol 这个 key 还在，其实是打印显示问题，实际上已经被删除了
fn.customCall(obj, 10, 20, 30)
fn.customCall(5, 10, 20, 30)

// customApply
fn.customApply(obj, [10, 20, 30])
fn.customApply(5, [10, 20, 30])
