/**
 * 主要是三步
 * 1、新建一个新的对象，继承 func.prototype，也就是继承成员方法
 * 2、执行构造函数，并将 this 上下文指定为 obj，也就是继承成员变量
 * 3、如果构造函数执行后返回了一个对象，则最终返回这个对象，否则返回新建的这个对象
 * 提示：class 语法糖里面 constructor 的本质其实就是这里的 func 函数
 * @param func
 * @param args
 */
const newInstance = (func: Function, ...args: any[]) => {
  const obj = Object.create(func.prototype)
  const instance = func.apply(obj, args)
  if (typeof instance === 'object') {
    return instance
  } else {
    return obj
  }
}

/**
 * 单元测试
 */

function AAA (size: number) {
  this.name = 'a'
  this.size = size
}
AAA.prototype = {
  write() {
    console.log('aaa')
  }
}

const a = newInstance(AAA, 10)
console.log(a.name)
console.log(a.size)
a.write()
