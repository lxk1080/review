{
  let list = new Set()
  list.add(5)
  list.add(7)

  console.log(list.size) // 2
}

{
  let list = new Set([1, 2, 3, 4, 5, 4, 3, 2, 1])
  console.log(list)

  let arr = [...list] || Array.from(list)
  console.log(arr)
}

{
  let arr = ['add', 'delete', 'clear', 'has']
  let list = new Set(arr)

  console.log(list.has('has'))
  console.log(list.delete('has'))
  list.clear()
}

{
  let arr = ['aaa', 'bbb', 'ccc', 'ddd']
  let list = new Set(arr)

  for (let key of list.keys()) {
    console.log(key)
  }
  for (let value of list.values()) {
    console.log(value)
  }
  for (let [key, value] of list.entries()) {
    console.log([key, value])
  }

  list.forEach((item) => {
    console.log(item)
  })
}

// weakSet
// 元素只能是对象
// 弱引用（不会与垃圾回收挂钩）
// 没有 size属性，clear方法，不能遍历
{
  let weakList = new WeakSet()
  let o1 = {name: 'o1'}
  let o2 = {name: 'o2'}

  weakList.add(o1)
  weakList.add(o2)
  // weakList.add(2) // error

  console.log(weakList)
}

// map映射
{
  let map = new Map()
  let arr = [1, 2, 3]

  map.set('a', 1)
  map.set('b', 2)
  map.set(arr, 3)

  console.log(map)
  console.log(map.get(arr))
}

{
  let map = new Map([['a', 1], ['b', 2]])
  console.log(map)
  console.log(map.size)
  console.log(map.delete('a'))
  map.clear()
}

// weakMap
// 键值必须是对象（其他与weakSet相同）
{
  let weakmap = new WeakMap()
  let o1 = {name: 'o1'}

  weakmap.set(o1, 1)
  console.log(weakmap.get(o1))
}