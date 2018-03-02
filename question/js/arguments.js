/*
  arguments是数组吗？若不是，如何变为数组？
  答案: 不是，变为数组有如下若干种方法，第一种slice效率最高
*/

function test() {
  let arr1 = Array.prototype.slice.apply(arguments)
  let arr2 = Array.prototype.concat.apply([], arguments)
  let arr3 = Array.apply([], arguments)

  let arr4 = []
  for (var i = 0; i < arguments.length; i++) {
    arr4.push(arguments[i])
  }

  let arr5 = Array.from(arguments)
  let arr6 = [...arguments]

  console.log(arr6 instanceof Array)
  console.log(arr6)
}

test(1, 2, 3)
