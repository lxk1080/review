/**
 * let和const遇{}为块级作用域
 */
// if(true) {
//   let x = 1;
// }
// console.log(x);

/**
 * 引用地址为常量
 */
// const arr = []
// arr.push('apple')
// console.log(arr)

/**
 * 对象解构
 */
// let obj = {
//   name: 'guerdan',
//   age: 522,
//   grade: 99
// }
// // 简写
// let {name, age, grade} = obj
// // 重命名
// let {name: first, age: second, grade: third} = obj
// console.log(name, age, grade)
// console.log(first, second, third)

/**
 * 数组展开运算符（展开运算符可用于复制数组、对象，复制实例化的对象时，只能复制对象的属性）
 */
// let arr1 = [1, 2, 3]
// let arr2 = [4, 5, 6]
// let arr3 = [...arr1, ...arr2]
// console.log(arr3)

/**
 * 对象展开运算符（和Object.assign()方法相似）
 */
// let obj1 = {name: 'job', age: 456};
// let obj2 = {grade: '88', rank: 147};
// let obj3 = { ...obj1, ...obj2 };
// console.log(obj3);

/**
 * 对象的合并
 */
// let obj1 = {name: 'job', age: 456}
// let obj2 = {grade: '88', rank: 147}
// let obj3 = Object.assign({}, obj1, obj2)
// console.log(obj3)

/**
 * 剩余运算符用于解构
 */
// let arr = [1, 2, 3, 4, 5]
// let [r1, r2, ...newArr] = arr
// console.log(newArr)
// let obj = {name: 'dange', age: '123', grade: '456', rank: '789'}
// let {name, age, ...newObj} = obj
// console.log(newObj)

/**
 * 剩余运算符运用于函数（不定参数）
 */
// function exec(...arr) {
//   let res = arr.reduce(function( prev , cur , index , array){
//     return prev + cur
//   })
//   return res
// }
// console.log(exec(1, 2, 3, 4, 5))

/**
 * 模板字符串
 */
// let food = 'apple'
// console.log(`this food is ${food} and milk`)

/**
 * 关于导入导出
 */
// 1.当用export default people导出时，就用 import people 导入（不带大括号）
// 2.一个文件里，有且只能有一个export default。但可以有多个export。
// 3.当用export name 时，就用import { name }导入（记得带上大括号）
// 4.当一个文件里，既有一个export default people, 又有多个export name 或者 export age时，导入就用 import people, { name, age }
// 5.当一个文件里出现n多个 export 导出很多模块，导入时除了一个一个导入，也可以用import * as example

/**
 * Promise
 */
// then: 对应resolve的回调
// catch: 1. 对应reject的回调
//        2. 在执行resolve的回调（也就是then中的第一个参数）时出错，会进到catch方法中，程序执行不会中断
// function runAsync(){
//   return new Promise(function(resolve, reject) {
//     setTimeout(function(){
//       let num = 3
//       if (num < 5 ) {
//         resolve('可以的')
//       } else {
//         reject('不可以')
//       }
//       console.log('执行完成')
//     }, 1000)
//   })
// }
// runAsync().then((data) => {
//   console.log(data)
//   console.log(qwer) // 此处的qwer未定义，执行到这一行的时候会进入catch
// }).catch((err) => {
//   console.log(err)
// })

/**
 * 一个Promise的面试题（结果：2 3 5 4 1）
 */
// setTimeout(function() {
//   console.log(1)
// }, 0);
// new Promise(function executor(resolve) {
//   console.log(2);
//   for( var i=0 ; i<10000 ; i++ ) {
//     i == 9999 && resolve();
//   }
//   console.log(3);
// }).then(function() {
//   console.log(4);
// });
// console.log(5);

/**
 * 字符串的一些新的方法
 */
// const str = 'qwer1234asd'
// console.log(str.startsWith('qwer'))
// console.log(str.endsWith('asd'))
// console.log(str.includes('1234'))
// console.log(str.repeat(3))

/**
 * 默认的参数
 */
// function add(x, y = 5) {
//   return x + y
// }
// console.log(add(5))
// console.log(add(4, 6))

/**
 * 方法命名
 */
// let data = {
//   getName:  'getName',
//   setName: 'setName'
// }
// let dog = {
//   [data.getName]() {
//     return this.name
//   },
//   [data.setName](name) {
//     this.name = name
//   }
// }
// dog.setName('nice dog')
// let name = dog.getName()
// console.log(name)

/**
 * ES5数组去重方法
 */
// function unip(arr) {
//   function toObject(arr) {
//     var obj = {}
//     for (var i = 0, len = arr.length; i < len; i++) {
//       obj[arr[i]] = true
//     }
//     return obj
//   }
//   function toArray(obj) {
//     var arr = []
//     for (var i in obj) {
//       if (obj.hasOwnProperty(i)) {
//         //  注意这里对象的key是字符串
//         arr.push(parseInt(i))
//       }
//     }
//     return arr
//   }
//   return toArray(toObject(arr))
// }
// var arr = [1, 2, 3, 4, 5, 1, 2, 3, 5]
// console.log(unip(arr))

/**
 * 使用set进行数组去重
 */
// let arr = [1, 2, 3, 4, 5, 2, 4, 3, 1, 2]
// let set = new Set(arr)
// arr = [...set]
// console.log(arr)

/**
 * 函数的名字
 */
// function res() {
//   return 123
// }
// console.log(res.name)

/**
 * 对比两个值是否相等
 */
// console.log(NaN == NaN) // false
// console.log(Object.is(NaN, NaN)) // true
// console.log(-0 == +0) // true
// console.log(Object.is(-0, +0)) // false

/**
 * 设置对象的原型
 */
// let cat = {
//   getFood() {
//     return 'fish'
//   }
// }
// let dog = {
//   getFood() {
//     return 'bone'
//   }
// }
//
// // ES5的写法
// // 创建一个对象，使用cat原型
// let animal = Object.create(cat)
// console.log(animal.getFood())
// console.log(Object.getPrototypeOf(animal) === cat)
// // 修改对象的原型
// animal = Object.setPrototypeOf(animal, dog)
// console.log(animal.getFood())
// console.log(Object.getPrototypeOf(animal) === dog)
//
// // ES6的写法
// animal = {
//   __proto__: cat
// }
// console.log(animal.getFood())
// animal.__proto__ = dog
// console.log(animal.getFood())

/**
 * 关于 class
 * set、get、static、extends
 */
// class Animal {
//   constructor(name, birthday) {
//     this.name = name;
//     this.birthday = birthday;
//   }
//
//   toString() {
//     return `name: ${this.name}, birthday: ${this.birthday}`
//   }
// }
// class Dog extends Animal{
//   constructor({name, birthday, age}) {
//     super(name, birthday);
//     this.age = age;
//   }
//
//   static eat() {
//     console.log('dogs will eat...')
//   }
//
//   get prop() {
//     return this.color
//   }
//   set prop(color) {
//     this.color = color
//   }
//
//   toString() {
//     return `${super.toString()}, age: ${this.age}`
//   }
// }
// instance
// let dog = new Dog({name: 'dahuang', birthday: '2015-01-12', age: 3});
// console.log(dog.toString());
//
// static
// Dog.eat();
//
// get、set
// dog.prop = 'red';
// console.log(dog.prop);

/**
 * 关于 set
 * 属性: size
 * 方法: add、delete、has、clear
 * 遍历: keys()、values()、entries()、foreach()
 */
// let set = new Set([1, 2, 3, 4])
//
// // set转数组1
// let array1 = [...set]
// // set转数组2
// let array2 = Array.from(set)
//
// // 遍历1
// set.forEach((item) => {
//   console.log(item)
// })
// // 遍历2
// for (let item of set) {
//   console.log(item)
// }
//
// // 间接的使用数组的方法（set转数组再转set）
// set = new Set([...set].map(item => item * 2)) // 2 4 6 8
// // 数组新增方法，后面的回调函数类似于map函数
// set = new Set(Array.from(set, item => item * 2)) // 4 8 12 16
//
// // 数组去重
// let arr = [1, 2, 3, 4, 2, 3, 1, 5]
// arr = [...new Set(arr)]
// console.log(arr)
//
// // 两个数组的并集
// let arr1 = [1, 2, 3]
// let arr2 = [3, 4, 5]
// set = new Set([...arr1, ...arr2])
// console.log(set)
//
// // 两个数组的交集（利用set的has方法）
// set = new Set(arr1.filter(item => new Set(arr2).has(item)))
// console.log(set)
//
// // arr1相对于arr2的差集
// set = new Set(arr1.filter(item => !new Set(arr2).has(item)))
// console.log(set)

/**
 * 关于 map
 * 属性: size
 * 方法: set、get、delete、has、clear
 * 遍历: keys()、values()、entries()、foreach()
 */
// let map = new Map([
//   ['name', 'haber'],
//   ['title', 'author']
// ])
//
// map转数组
// let keyArr = [...map.keys()]
// let valArr = [...map.values()]
// let arr = [...map]
// console.log(keyArr)
// console.log(valArr)
// console.log(arr)
//
// // 二维数组转一维数组
// let res = []
// arr.forEach(item => {
//   res = [...res, ...item]
// })
// console.log(res)
//
// // 遍历1
// map.forEach((value, key) => {
//   console.log(`${key} -- ${value}`)
// })
// // 遍历2
// for (let [key, value] of map) {
//   console.log(`${key} -- ${value}`)
// }
//
// // map 可以用任何类型的值作为键，json对象的键只能是字符串
// let obj = {}
// let func = function () {}
// map.set(obj, '对象')
// map.set(func, '函数')
// console.log(map.get(obj))
// console.log(map.get(func))