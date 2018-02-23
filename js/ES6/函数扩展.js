{
  function test(x, y = 'world') {
    console.log('默认值', x, y)
  }
  test('hello')
  test('hello', 'lxk')
}

{
  let x = 'test'
  function test(x, y = x) {
    console.log('作用域', x, y)
  }
  test('kill') // kill kill
  function test2(z, y = x) {
    console.log('作用域', z, y)
  }
  test2('kill') // kill test
}

{
  // rest参数
  function test(...args) {
    for (let v of args) {
      console.log(v)
    }
  }
  test(1, 2, 3, 4)
}

{
  // 伪调用（提升性能的）
  function tail(x) {
    console.log(x)
  }
  function fx(x) {
    return tail(x)
  }
  fx(123)
}