{
  // 输入一些参数生成一个数组
  let a = 1
  let b = 2
  let c = 3
  let arr = Array.of(a, b, c, 4, 5, 6)
  console.log(arr) // [1, 2, 3, 4, 5, 6]

  console.log(Array.of()) // []
}

{
  // 把伪数组转换为真正的数组（例如dom节点集合）
  let p = document.querySelectorAll('p')
  let arr = Array.from(p)
  arr.forEach((item) => {
    console.log(item.textContent)
  })

  // 有着map函数的作用
  console.log(Array.from([1, 2, 3], (item) => item * 2))

  // 将set集合转化为数组
  console.log(Array.from(new Set([1, 2, 3, 4, 5])))
}

{
  // 替换数组的所有元素为某一个值
  console.log([1, 2, 3].fill('a'))
  // 左闭右开（索引 2 开始，索引 3 之前）
  console.log([1, 2, 3, 4].fill('a', 2, 3))
}

// 新的API
{
  for (let index of [1, 'c', 'ks'].keys()) {
    console.log('keys', index)
  }
  // 需要 polyfill 包
  // for (let index of [1, 'c', 'ks'].values()) {
  //   console.log('values', index)
  // }
  for (let [index,value] of [1, 'c', 'ks'].entries()) {
    console.log('entries', index +'-'+ value)
  }
}

{
  // 例如下面的例子
  // 从索引 0 位置开始替换，替换内容索引为 2 <= index < 4
  // 所以 value 为 [3, 4]
  // 元素 1 被 3 替换，元素 2 被 4 替换
  console.log([1, 2, 3, 4, 5].copyWithin(0, 2, 4)) // [3, 4, 3, 4, 5]
}

{
  // 找一个值，结果返回找到的第一个
  console.log([1, 2, 3, 4, 5, 6].find((item) => item > 3)) // 4
  // 找一个索引，结果返回找到的第一个
  console.log([1, 2, 3, 4, 5, 6].findIndex((item) => item > 3)) // 3
}

{
  // 判断数组是否包含某个元素
  console.log([1, 2, NaN].includes(1)) // true
  console.log([1, 2, NaN].includes(NaN)) // true
}