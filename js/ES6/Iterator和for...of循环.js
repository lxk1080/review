{
  let arr = ['hello', 'world', 'haha']
  let map = arr[Symbol.iterator]()
  console.log(map.next())
  console.log(map.next())
  console.log(map.next())
  console.log(map.next())
}

{
  let obj = {
    arrOne: [1, 2, 3],
    arrTwo: [4, 5, 6],
    [Symbol.iterator]() {
      let arr = this.arrOne.concat(this.arrTwo)
      let len = arr.length
      let index = 0
      return {
        next() {
          if (index < len) {
            return {
              value: arr[index++],
              done: false // 表示未迭代完成
            }
          } else {
            return {
              done: true
            }
          }
        }
      }
    }
  }

  for (let item of obj) {
    console.log(item)
  }
}