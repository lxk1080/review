// console.log(null == undefined) // true
// console.log(null === undefined) // false
// console.log(typeof(new Object()) == typeof(null)) // true
// console.log(new Number('1') == 1) // true
// console.log(new Number('1') === 1) // false
// console.log(new Object('1') == 1) // true
// console.log(new Object('1') === 1) // false
// console.log(new Boolean() == false) // true
// console.log(new Boolean() === false) // false

console.log([] == false) // true
console.log({} == false) // false
console.log([] == 0) // true
console.log([] == []) // false

/*
 当两个值都是对象 (引用值) 时, 比较的是两个引用值在内存中引用地址是否相同)
 [], {} 单独为true
 [], {} 两者自身不相等，互相不相等
 [] == false 为 true
 {} == false 为 false
*/