/**
 * 说明：使用发布订阅模式模拟事件实现
 * 新建一个 MyEvents 类，实现接口：on、emit、off、once
 *  - 关于 once 的实现：
 *    - 把 callback 包装一层，执行完 off 掉。并且通过 link 把包装函数和 callback 联系起来，以便于可以直接使用 off
 */

class MyEvents {
  private readonly _events: { [key: string]: Function[] }

  constructor() {
    // 纯净的对象，没有原型链
    this._events = Object.create(null)
  }

  on(event: string, callback: Function) {
    if (!this._events[event]) {
      this._events[event] = [callback]
    } else {
      this._events[event].push(callback)
    }
  }

  emit(event: string, ...args: any[]) {
    const cbs = this._events[event]
    if (cbs && cbs.length) {
      // 这里用箭头函数，是为了让 this 指向实例对象
      // 用 function 的话，是匿名函数，this 是 undefined
      cbs.forEach((cb: Function) => {
        cb.call(this, ...args)
      })
    }
  }

  off(event: string, fn?: Function) {
    // 不传 fn 则解绑全部
    if (!fn) {
      this._events[event] = []
    } else {
      const cbs = this._events[event]
      if (cbs) {
        // @ts-ignore
        this._events[event] = cbs.filter((cb: Function) => cb !== fn && cb.link !== fn)
      }
    }
  }

  once(event: string, callback:Function) {
    const foo = (...args: any[]) => {
      callback.call(this, ...args)
      this.off(event, foo)
    }
    // 建立联系，解绑的时候通过 .link 属性匹配到 foo
    foo.link = callback
    this.on(event, foo)
  }
}

/**
 * 单元测试
 *  - 只绑定了一个事件监听，一个执行完被 off 掉，一个是 once（同样执行完被 off，自动的），最后两个事件的 list 都为空
 */

const emitter = new MyEvents()

const fn = function (...args: any[]) {
  console.log('args,this ==>', args, this)
}

// on and off
emitter.on('event_1', fn)
emitter.emit('event_1', 1, 1, 1)
emitter.off('event_1', fn)
emitter.emit('event_1', 2, 2, 2)

// once
emitter.once('event_2', fn)
emitter.emit('event_2', 3, 3, 3)
emitter.emit('event_2', 4, 4, 4)

// end
console.log('end ==>', emitter)

/**
 * 追问，额外的问题，如何解决发布订阅模式中的循环问题？
 *  - 如果有人不小心写了如下代码，造成循环引用，该如何改造防止内存泄漏？
 *    1、可以使用递归层级的限制
 *    2、采用状态机机制
 */

// 循环引用的代码
// const A = () => { e.emit('y') }
// const B = () => { e.emit('x') }
// e.on('x', A)
// e.on('y', B)
// e.emit('x')

// 1、递归层级限制
// eventEmitter.emit = function(eventName) {
//   if (this.currentLevel >= this.maxLevel) { // 递归层级超过限制，则中断执行
//     return
//   }
//   this.currentLevel++
//   const callbacks = this.events[eventName] || []
//   callbacks.forEach(callback => callback()) // 如果这里发生了递归嵌套使用，那么永远也不会走到下一句
//   this.currentLevel--
// }

// 2、采用状态机机制
// const stateMachine = {
//   states: {
//     A: 'idle',
//     B: 'idle',
//   },
//   transition: function(entity, newState) {
//     this.states[entity] = newState
//   },
//   canHandle: function(entity) {
//     return this.states[entity] === 'idle'
//   }
// }
// eventEmitter.emit = function(eventName) {
//   const callbacks = this.events[eventName] || []
//   callbacks.forEach(callback => {
//     const entityName = callback.name
//     if (stateMachine.canHandle(entityName)) {
//       stateMachine.transition(entityName, 'processing') // 改变事件的状态为处理中，那么下次再触发将不会执行到这
//       callback() // 这里如果发生了循环引用，那么永远也不会走到下一句，事件永远处于处理中的状态
//       stateMachine.transition(entityName, 'idle')
//     }
//   })
// }
