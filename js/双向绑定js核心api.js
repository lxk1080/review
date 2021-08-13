let obj1 = {}
// 没有继承的属性
let descriptor = Object.create(null)
// 默认没有 enumerable，没有 configurable，没有 writable
descriptor.value = 'static'
Object.defineProperty(obj1, 'key', descriptor)
console.log('obj1:', obj1) // 结果: {} ，因为没有 enumerable，默认为 false，value 默认为 undefined

// 显式
let obj2 = {}
Object.defineProperty(obj2, 'key', {
  configurable: true,
  enumerable: true,
  value: 'dynic',
  writable: true
})
console.log('obj2:', obj2)

// 循环使用同一对象（貌似单例模式）
function withValue(value) {
  let d = withValue.d || (
    withValue.d = {
      configurable: false,
      enumerable: true,
      value: null,
      writable: false
    }
  )
  d.value = value
  return d
}
let obj3 = {}
Object.defineProperty(obj3, 'key', withValue('change1'))
let obj4 = {}
Object.defineProperty(obj4, 'key', withValue('change2'))
console.log('obj3:', obj3, 'obj4:', obj4)

// 使用get、set
let obj5 = {}
let aValue;
Object.defineProperty(obj5, 'a', {
  get: function () {
    return aValue
  },
  set: function (value) {
    aValue = value
  },
  configurable: true,
  enumerable: false
})
obj5.a = 10
console.log('obj5:', obj5, 'obj5.a:', obj5.a, 'aValue:', aValue)

// 属性特性必须设置一些特定的值
// 对于数据属性描述符，configurable, enumerable 和 writable 特性必须全部设置为 true
// 对于访问器属性描述符，configurable 必须设置为 true，enumerable 必须设置为 false
