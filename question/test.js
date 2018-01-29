console.log(null == undefined) // true
console.log(null === undefined) // false
console.log(typeof(new Object()) == typeof(null)) // true
console.log(new Number('1') == 1) // true
console.log(new Number('1') === 1) // false
console.log(new Object('1') == 1) // true
console.log(new Object('1') === 1) // false
console.log(new Boolean() == false) // true
console.log(new Boolean() === true) // false