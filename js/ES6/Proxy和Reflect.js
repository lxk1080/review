{
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  }

  let monitor = new Proxy(obj, {
    // 拦截对象的读取
    get(target, key) {
      return target[key].replace('2017', '2018')
    },
    // 拦截对象的设置属性
    set(target, key, value) {
      if (key === 'name') {
        return target[key] = value
      } else {
        return target[key]
      }
    },
    // 拦截key in object操作
    has(target, key) {
      if (key === 'name') {
        return target[key]
      } else {
        return false
      }
    },
    deleteProperty(target, key) {
      if (key.includes('_')) {
        delete target[key]
        return true
      } else {
        return target[key]
      }
    },
    // 拦截Object.keys, Object.getOwnPropertySymbols, Object.getOwnPropertyNames
    ownKeys(target) {
      return Object.keys(target).filter(item => item != 'time')
    }
  })

  console.log(monitor.time) // 2018-03-11

  monitor.time = 2010
  console.log(monitor.time) // 2018-03-11

  monitor.name = 'com'
  console.log(monitor.name) // com

  console.log('name' in monitor, 'time' in monitor) // true false

  delete monitor.time
  console.log(monitor)

  delete monitor._r
  console.log(monitor)

  console.log(Object.keys(monitor))
}

// Reflect
{
  let obj = {
    time: '2017-03-11',
    name: 'net',
    _r: 123
  }

  console.log(Reflect.get(obj, 'time'))
  console.log(Reflect.has(obj, 'name'))
  Reflect.set(obj, 'name', 'com')
  console.log(obj.name)
}

// 创建对象时验证
{
  function validator(target, validators) {
    function set(target, key, value, proxy) {
      if (target.hasOwnProperty(key)) {
        let flag = validators[key](value)
        if (flag) {
          if (first) return
          return Reflect.set(target, key, value, proxy)
        } else {
          throw new Error(`不能设置 ${key} 为 ${value}`)
        }
      } else {
        throw new Error(`${key} 不存在的键`)
      }
    }
    // 创建时的验证
    let first = true
    let keys = Object.keys(target)
    keys.forEach((key) => {
      set(target, key, target[key])
    })
    first = false
    // 修改时的验证
    return new Proxy(target, {
      set
    })
  }

  // 验证规则
  const personValidators = {
    name(val) {
      return typeof val === 'string'
    },
    age(val) {
      return typeof val === 'number' && val > 18
    }
  }

  class Person {
    constructor({name, age}) {
      this.name = name
      this.age = age
      return validator(this, personValidators)
    }
  }

  let person = new Person({name: 'lxk', age: 23})
  // let person2 = new Person({name: 123, age: 23}) //error
  person.name = 'qwer'
  console.log(person)
  // person.age = 16 // error
}