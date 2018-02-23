{
  let a1 = Symbol('a1')
  let a2 = Symbol('a1')
  console.log(a1 === a2) // false
  let a3 = Symbol.for('a3')
  let a4 = Symbol.for('a3')
  console.log(a3 === a4) // true
}

{
  let a1 = Symbol('a1')
  let obj = {
    [a1]: '123',
    a1: '456',
  }
  console.log(obj)

  console.log(Object.keys(obj))
  console.log(Object.getOwnPropertySymbols(obj))
  console.log(Reflect.ownKeys(obj))
}