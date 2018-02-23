{
  // 数据结构的横向对比，增，查，改，删
  let map = new Map()
  let arr = []

  // 增
  map.set('t', 1)
  arr.push({t: 1})
  console.log(map, arr)

  // 查
  console.log(map.has('t'))
  console.log(arr.find(item => item.t))

  // 改
  map.set('t', 2)
  arr.forEach(item => item.t ? item.t = 2 : '')
  console.log(map, arr)

  // 删
  map.delete('t')
  let index = arr.findIndex(item => item.t)
  arr.splice(index, 1)
  console.log(map, arr)
}

{
  let set = new Set()
  let arr = []
  let o = {t: 1}

  // 增
  set.add(o)
  arr.push(o)
  console.log(set, arr)

  // 查
  console.log(set.has(o))
  console.log(arr.find(item => item.t))

  // 改
  set.forEach(item => item.t ? item.t = 2 : '')
  arr.forEach(item => item.t ? item.t = 2 : '')
  console.log(set, arr)

  // 删
  set.delete(o)
  let index = arr.findIndex(item => item.t)
  arr.splice(index, 1)
  console.log(set, arr)
}

{
  let item = {t: 1}
  let map = new Map()
  let set = new Set()
  let obj = {}

  // 增
  map.set('t', 1)
  set.add(item)
  obj['t'] = 1
  console.log(map ,set, obj)

  // 查
  console.log(map.has('t'))
  console.log(set.has(item))
  console.log('t' in obj)

  // 改
  map.set('t', 2)
  item.t = 2
  obj['t'] = 2
  console.log(map ,set, obj)

  // 删
  map.delete('t')
  set.delete(item)
  delete obj['t']
  console.log(map ,set, obj)
}

// 能使用map不使用数组
// 数据唯一性set
// 尽量少的使用obj和arr