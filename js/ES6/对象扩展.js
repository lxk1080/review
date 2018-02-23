{
  // 简洁表示
  let a = 1
  let b = 2
  let o = {
    a, b,
    hello() {
      return 'hello'
    }
  }
  console.log(o.a, o.b, o.hello())
}

{
  // 属性表达式
  let a = 'b'
  let o = {
    [a]: 'c'
  }
  console.log(o.b)
  console.log(o[a])
  console.log(o['b'])
}

// 新增API
{
  // 比较两个数据是否相等
  console.log('字符串', Object.is('abc', 'abc'), 'abc' === 'abc') // true
  console.log('数组', Object.is([], []), [] === []) // false(数组是引用类型，地址不相同)

  // 拷贝（浅拷贝）
  console.log(Object.assign({a: '1'}, {b: '2'}))

  let test = {name: 'qwer', value: '1234'}
  for (let [key, value] of Object.entries(test)) {
    console.log([key, value])
  }
}

{
  // 对象扩展，es7提案，需要 stage-2
  let {a, b, ...c} = {a: '1', b: '2', c: '3', d: '4'}
  console.log(a, b, c)

  let d = {...c, ...{name: 'qwer'}}
  console.log(d)
}
