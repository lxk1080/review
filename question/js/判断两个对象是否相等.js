obj = {
    a: 1,
    b: 2
}
obj2 = {
    a: 1,
    b: 2
}
obj3 = {
    a: 2,
    b: 3
}

console.log(JSON.stringify(obj) == JSON.stringify(obj2)) // true
console.log(JSON.stringify(obj) == JSON.stringify(obj3)) // false