/**
 * 实现思路主要是维护一个任务队列，一个任务执行完，通过 next() 方法执行下一个任务
 *  - 不过要注意，eat、sleep 方法并没有真正执行对应的动作，只是将函数加入队列，要执行的话，需要通过 exec 方法触发
 */
class LazyMan {
  name: string
  private tasks: Function[] = []

  constructor(name: string) {
    this.name = name
  }

  private next() {
    const task = this.tasks.shift()
    if (task) task()
  }

  exec() {
    this.next()
  }

  eat(food: string) {
    const task = () => {
      console.log(`${this.name} eat ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  sleep(second: number) {
    const task = () => {
      console.log(`开始睡觉 ${second}s`)
      setTimeout(() => {
        console.log(`睡醒了`)
        this.next()
      }, second * 1000)
    }
    this.tasks.push(task)
    return this
  }
}

/**
 * 测试代码
 */

const xiaoming = new LazyMan('xiaoming')
xiaoming.eat('苹果').eat('香蕉').sleep(2).eat('西瓜').exec()
console.log(123123)
console.log(456456)
setTimeout(() => {
  xiaoming.eat('芒果').eat('栗子').exec()
}, 3000)
